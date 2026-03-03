// ============================================
// GOOGLE APPS SCRIPT - AI LEARNING APP (GROQ)
// Versi Stabil - Perbaikan Parameter Undefined
// ============================================

const SPREADSHEET_ID = '1BO9c3IJV6qp8UupFvE6V67sQ-gUMnNZb5zTKIB_loT0'; // GANTI DENGAN ID SPREADSHEET ANDA!
const SHEET_CACHE = 'SoalCache';
const SHEET_LOG = 'LogAktivitas';
const SHEET_CONFIG = 'Config';

// ========== HANDLER UTAMA ==========
function doGet(e) {
  return handleRequest(e.parameter);
}

function doPost(e) {
  // Jika POST dengan JSON
  let params;
  try {
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else {
      params = e.parameter || {};
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Invalid JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return handleRequest(params);
}

function handleRequest(params) {
  const action = params.action;
  let result = {};
  
  try {
    if (action === 'generateSoal') {
      result = generateSoal(params);
    } else if (action === 'simpanLog') {
      result = simpanLog(params);
    } else if (action === 'ambilLog') {
      result = ambilLog();
    } else {
      throw new Error('Aksi tidak dikenal');
    }
  } catch (err) {
    result = { success: false, error: err.toString() };
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========== GENERATE SOAL DENGAN GROQ ==========
function generateSoal(params) {
  const { kelas, mapel, jenis, jumlah, materi, semester, nama, tingkatKesulitan } = params;
  
  // Validasi: pastikan tidak ada nilai undefined atau string 'undefined'
  if (!kelas || kelas === 'undefined' || !mapel || mapel === 'undefined' || !jenis || jenis === 'undefined') {
    return { success: false, error: 'Parameter tidak lengkap: kelas, mapel, atau jenis tidak valid' };
  }
  
  const jumlahInt = parseInt(jumlah) || 5;
  if (jumlahInt < 1 || jumlahInt > 30) {
    jumlahInt = 5; // fallback
  }
  
  // 1. CEK CACHE (gunakan kunci yang unik - tambahkan tingkatKesulitan)
  const cacheKey = `${kelas}-${mapel}-${jenis}-${jumlahInt}-${materi || ''}-${semester || ''}-${tingkatKesulitan || 'Sedang'}`;
  const cacheResult = cekCache(cacheKey);
  if (cacheResult) {
    return { success: true, source: 'cache', soal: cacheResult };
  }
  
  // 2. PANGGIL GROQ API
  return panggilGroq(kelas, mapel, jenis, jumlahInt, materi, semester, tingkatKesulitan, cacheKey);
}

function cekCache(key) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_CACHE);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const keyIdx = headers.indexOf('cache_key');
    const soalIdx = headers.indexOf('soal_json');
    
    if (keyIdx === -1 || soalIdx === -1) return null;
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][keyIdx] === key) {
        return JSON.parse(data[i][soalIdx]);
      }
    }
  } catch (e) {
    console.log('Error baca cache:', e);
  }
  return null;
}

function simpanKeCache(key, kelas, mapel, jenis, jumlahInt, materi, semester, tingkatKesulitan, soalArray) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_CACHE);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['cache_key', 'kelas', 'mapel', 'jenis', 'jumlah', 'materi', 'semester', 'tingkat_kesulitan', 'soal_json', 'timestamp']);
    }
    sheet.appendRow([
      key,
      kelas,
      mapel,
      jenis,
      jumlahInt,
      materi || '',
      semester || '',
      tingkatKesulitan || 'Sedang',
      JSON.stringify(soalArray),
      new Date()
    ]);
  } catch (e) {
    console.log('Error simpan cache:', e);
  }
}

function panggilGroq(kelas, mapel, jenis, jumlahInt, materi, semester, tingkatKesulitan, cacheKey, retryCount = 0) {
  const MAX_RETRY = 5;
  const apiKey = getApiKey();
  
  if (!apiKey) {
    // Jika tidak ada API key, langsung return dummy
    const dummySoal = generateDummySoal(kelas, mapel, jenis, jumlahInt, materi, semester);
    return { success: true, source: 'dummy', model: 'fallback', soal: dummySoal };
  }
  
  const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  
  // DAFTAR MODEL VALID
  const VALID_MODELS = {
    'UTAMA': 'llama-3.3-70b-versatile',
    'LLAMA4_SCOUT': 'meta-llama/llama-4-scout-17b-16e-instruct',
    'LLAMA4_MAVERICK': 'meta-llama/llama-4-maverick-17b-128e-instruct',
    'CEPAT': 'llama-3.1-8b-instant'
  };
  
  // Pilih model berdasarkan jenis ujian
  let model;
  if (jenis === 'OSN') {
    model = VALID_MODELS.LLAMA4_MAVERICK;
  } else if (jenis === 'TKA') {
    model = VALID_MODELS.LLAMA4_SCOUT;
  } else {
    model = VALID_MODELS.UTAMA;
  }
  
  // Tentukan tingkat kesulitan
  let tingkatKesulitanDesc = '';
  const userTingkat = tingkatKesulitan || 'Sedang';
  
  if (userTingkat === 'Mudah') {
    tingkatKesulitanDesc = 'mudah (membantu pemahaman dasar)';
  } else if (userTingkat === 'Sedang') {
    tingkatKesulitanDesc = 'sedang (menguji pemahaman konsep)';
  } else if (userTingkat === 'Sulit') {
    tingkatKesulitanDesc = 'sulit (menantang dan membutuhkan analisis)';
  } else if (userTingkat === 'Sangat Sulit') {
    tingkatKesulitanDesc = 'sangat sulit (tingkat kompetisi/olimpiade)';
  } else {
    tingkatKesulitanDesc = 'bervariasi sesuai jenis ujian';
  }
  
  // Override untuk OSN dan TKA (selalu lebih sulit)
  if (jenis === 'OSN') {
    tingkatKesulitanDesc = 'sangat sulit (tingkat Olimpiade), membutuhkan analisis mendalam dan strategi khusus';
  } else if (jenis === 'TKA') {
    tingkatKesulitanDesc = 'sulit (setara UTBK/SNBT), menguji pemahaman konsep mendalam dan penalaran cepat';
  }
  
  // Informasi materi/semester
  let materiInfo = '';
  if (materi) {
    materiInfo = `Materi spesifik: ${materi}.`;
  }
  if (semester) {
    materiInfo += ` Cakupan materi Semester ${semester}.`;
  }
  
  // Distribusi kesulitan
  let distribusi = '';
  if (jenis === 'Harian') {
    distribusi = '30% mudah, 40% sedang, 30% sulit.';
  } else if (jenis === 'UAS') {
    distribusi = '20% mudah, 40% sedang, 40% sulit.';
  } else {
    distribusi = 'didominasi sulit dan sangat sulit.';
  }
  
  // Contoh soal untuk membantu AI fokus pada mapel
  let contohSoal = '';
  if (mapel === 'Matematika') {
    contohSoal = 'Contoh: "Jika x + 5 = 10, maka nilai x adalah?" dengan pilihan A. 3, B. 4, C. 5, D. 6.';
  } else if (mapel === 'Fisika') {
    contohSoal = 'Contoh: "Sebuah benda bermassa 2 kg jatuh bebas dari ketinggian 10 m. Energi kinetik saat menyentuh tanah adalah?"';
  } else if (mapel === 'Kimia') {
    contohSoal = 'Contoh: "Unsur yang memiliki nomor atom 6 adalah?"';
  } else if (mapel === 'Biologi') {
    contohSoal = 'Contoh: "Organ yang berfungsi menyaring darah adalah?"';
  } else if (mapel === 'Bahasa Indonesia') {
    contohSoal = 'Contoh: "Kata baku dari "ijin" adalah?"';
  } else if (mapel === 'Bahasa Inggris') {
    contohSoal = 'Contoh: "The opposite of "big" is?"';
  } else if (mapel === 'Ekonomi') {
    contohSoal = 'Contoh: "Kebutuhan manusia yang tidak terbatas menghadapi sumber daya yang langka disebut?"';
  } else if (mapel === 'Sejarah') {
    contohSoal = 'Contoh: "Proklamasi kemerdekaan Indonesia terjadi pada tahun?"';
  } else if (mapel === 'Geografi') {
    contohSoal = 'Contoh: "Lapisan bumi yang paling tipis adalah?"';
  } else if (mapel === 'IPS') {
    contohSoal = 'Contoh: "Kegiatan ekonomi yang menghasilkan barang disebut?"';
  }
  
  const prompt = `Buatkan ${jumlahInt} soal pilihan ganda mata pelajaran **${mapel}** untuk siswa kelas ${kelas} (Kurikulum Merdeka).

Tingkat kesulitan: ${tingkatKesulitanDesc}
Jenis ujian: ${jenis}
${materiInfo}
Distribusi kesulitan: ${distribusi}

${contohSoal}

**PENTING:** Soal harus benar-benar tentang **${mapel}**, bukan tentang Kurikulum Merdeka itu sendiri. Soal harus sesuai dengan materi ${mapel} untuk kelas ${kelas} dan tingkat kesulitan yang diminta.

Persyaratan soal:
- Setiap soal memiliki 4 pilihan jawaban (A, B, C, D)
- Sertakan kunci jawaban dan pembahasan lengkap
- Untuk OSN/TKA, soal harus menantang dan menguji pemahaman konsep
- Hindari soal yang terlalu umum atau tidak relevan dengan ${mapel}

Format JSON yang VALID (hanya array JSON, tanpa teks lain):
[
  {
    "pertanyaan": "teks pertanyaan",
    "pilihan": ["A. pilihan 1", "B. pilihan 2", "C. pilihan 3", "D. pilihan 4"],
    "jawaban_benar": "A",
    "solusi": "penjelasan langkah-langkah"
  }
]`;

  const payload = {
    model: model,
    messages: [
      {
        role: "system",
        content: "Anda adalah asisten pembuat soal pendidikan yang ahli. Selalu merespons dalam format JSON yang valid."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 4000,
    top_p: 0.9
  };
  
  const options = {
    method: 'POST',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  try {
    const response = UrlFetchApp.fetch(GROQ_API_URL, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    console.log('GROQ Response Code:', responseCode, 'Retry Count:', retryCount);
    
    if (responseCode === 400) {
      console.log('Error 400 dengan model:', model);
      // Coba model cadangan
      let backupModel = VALID_MODELS.UTAMA;
      const backupPayload = JSON.parse(JSON.stringify(payload));
      backupPayload.model = backupModel;
      const backupOptions = JSON.parse(JSON.stringify(options));
      backupOptions.payload = JSON.stringify(backupPayload);
      const backupResponse = UrlFetchApp.fetch(GROQ_API_URL, backupOptions);
      if (backupResponse.getResponseCode() === 200) {
        return processGroqResponse(backupResponse.getContentText(), kelas, mapel, jenis, jumlahInt, materi, semester, cacheKey, backupModel);
      }
      // Jika gagal, return dummy
      const dummySoal = generateDummySoal(kelas, mapel, jenis, jumlahInt, materi, semester);
      return { success: true, source: 'dummy', model: 'fallback', soal: dummySoal };
    }
    
    if (responseCode === 429 || responseCode === 503) {
      // 🔹 IMPROVED RATE LIMIT HANDLING (RPM/TPM)
      if (retryCount < MAX_RETRY) {
        // Exponential backoff dengan random jitter: 2^n * 1000 + random(0-1000)
        const baseDelay = Math.pow(2, retryCount) * 1000;
        const jitter = Math.random() * 1000;
        const waitTime = baseDelay + jitter;
        console.log(`⏳ Rate limit (${responseCode}). Tunggu ${waitTime}ms sebelum retry ${retryCount + 1}/${MAX_RETRY}`);
        Utilities.sleep(waitTime);
        return panggilGroq(kelas, mapel, jenis, jumlahInt, materi, semester, tingkatKesulitan, cacheKey, retryCount + 1);
      } else {
        // Kembalikan dummy setelah retry habis
        console.log(`❌ Max retry ${MAX_RETRY} tercapai. Menggunakan soal dummy.`);
        const dummySoal = generateDummySoal(kelas, mapel, jenis, jumlahInt, materi, semester);
        return { success: true, source: 'dummy', model: 'fallback', soal: dummySoal };
      }
    }
    
    if (responseCode !== 200) {
      // Jika error lain, return dummy
      console.log(`Error ${responseCode}: ${responseText}`);
      const dummySoal = generateDummySoal(kelas, mapel, jenis, jumlahInt, materi, semester);
      return { success: true, source: 'dummy', model: 'fallback', soal: dummySoal };
    }
    
    return processGroqResponse(responseText, kelas, mapel, jenis, jumlahInt, materi, semester, tingkatKesulitan, cacheKey, model);
    
  } catch (e) {
    console.log('Error panggil GROQ:', e);
    const dummySoal = generateDummySoal(kelas, mapel, jenis, jumlahInt, materi, semester);
    return { success: true, source: 'dummy', model: 'fallback', soal: dummySoal };
  }
}

function processGroqResponse(responseText, kelas, mapel, jenis, jumlahInt, materi, semester, tingkatKesulitan, cacheKey, model) {
  try {
    const json = JSON.parse(responseText);
    
    if (json.choices && json.choices[0]?.message?.content) {
      let textResponse = json.choices[0].message.content;
      textResponse = textResponse.replace(/```json\n?|```\n?/g, '').trim();
      
      const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        textResponse = jsonMatch[0];
      }
      
      const soalArray = JSON.parse(textResponse);
      if (!Array.isArray(soalArray) || soalArray.length === 0) {
        throw new Error('Respons bukan array');
      }
      
      const validSoal = soalArray.map((soal, idx) => ({
        pertanyaan: soal.pertanyaan || `Soal ${idx+1} ${mapel} kelas ${kelas}`,
        pilihan: Array.isArray(soal.pilihan) && soal.pilihan.length === 4
          ? soal.pilihan
          : ['A. Pilihan A', 'B. Pilihan B', 'C. Pilihan C', 'D. Pilihan D'],
        jawaban_benar: soal.jawaban_benar || 'A',
        solusi: soal.solusi || 'Pembahasan: ' + (soal.jawaban_benar ? 'Jawaban ' + soal.jawaban_benar + ' benar.' : '')
      }));
      
      simpanKeCache(cacheKey, kelas, mapel, jenis, jumlahInt, materi, semester, tingkatKesulitan, validSoal);
      return { success: true, source: 'ai', model: model, soal: validSoal };
    } else {
      throw new Error('Struktur respons tidak sesuai');
    }
  } catch (e) {
    console.log('Parse error, menggunakan dummy soal', e);
    const dummySoal = generateDummySoal(kelas, mapel, jenis, jumlahInt, materi, semester);
    return { success: true, source: 'dummy', model: 'fallback', soal: dummySoal };
  }
}

function generateDummySoal(kelas, mapel, jenis, jumlahInt, materi, semester) {
  const dummy = [];
  // Pastikan nilai tidak undefined atau string 'undefined'
  const safeKelas = (kelas && kelas !== 'undefined') ? kelas : '?';
  const safeMapel = (mapel && mapel !== 'undefined') ? mapel : '?';
  const safeJenis = (jenis && jenis !== 'undefined') ? jenis : '?';
  const safeMateri = materi && materi !== 'undefined' ? `Materi: ${materi}` : '';
  const safeSemester = semester && semester !== 'undefined' ? `Semester ${semester}` : '';
  
  for (let i = 1; i <= jumlahInt; i++) {
    dummy.push({
      pertanyaan: `[${safeJenis}] Soal ${safeMapel} kelas ${safeKelas} nomor ${i}. ${safeMateri} ${safeSemester}`.trim(),
      pilihan: ['A. Pilihan A', 'B. Pilihan B', 'C. Pilihan C', 'D. Pilihan D'],
      jawaban_benar: String.fromCharCode(64 + (i % 4 + 1)),
      solusi: `Pembahasan soal ${i}. Langkah-langkah penyelesaian.`
    });
  }
  return dummy;
}

// ========== FUNGSI API KEY ==========
function getApiKey() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_CONFIG);
    const data = sheet.getDataRange().getValues();
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] && data[i][0].toString().toLowerCase() === 'groq_api_key') {
        return data[i][1];
      }
    }
  } catch (e) {}
  return null;
}

function testGroqConnection() {
  const apiKey = getApiKey();
  if (!apiKey) return '❌ API Key tidak ditemukan';
  const url = 'https://api.groq.com/openai/v1/models';
  const options = {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + apiKey },
    muteHttpExceptions: true
  };
  try {
    const res = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(res.getContentText());
    return `✅ Koneksi berhasil! Tersedia ${json.data.length} model.`;
  } catch (e) {
    return '❌ Gagal: ' + e.toString();
  }
}

// ========== LOG AKTIVITAS ==========
function simpanLog(params) {
  const { nama_user, skor, total_soal, kelas, mapel, jenis, jumlah, materi, semester, soal_json } = params;
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_LOG);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['nama_user', 'skor', 'total_soal', 'kelas', 'mapel', 'jenis', 'jumlah', 'materi', 'semester', 'soal_json', 'tanggal']);
    }
    sheet.appendRow([
      nama_user || 'Anonim',
      parseInt(skor) || 0,
      parseInt(total_soal) || 0,
      kelas || '',
      mapel || '',
      jenis || '',
      parseInt(jumlah) || 0,
      materi || '',
      semester || '',
      soal_json || '',
      new Date()
    ]);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

function ambilLog() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_LOG);
    if (sheet.getLastRow() <= 1) return { success: true, log: [] };
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = row[idx]; });
      rows.push(obj);
    }
    return { success: true, log: rows };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

// ========== SETUP SHEET ==========
function setupSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet;
  if (!ss.getSheetByName(SHEET_CACHE)) {
    sheet = ss.insertSheet(SHEET_CACHE);
    sheet.appendRow(['cache_key', 'kelas', 'mapel', 'jenis', 'jumlah', 'materi', 'semester', 'soal_json', 'timestamp']);
  }
  if (!ss.getSheetByName(SHEET_LOG)) {
    sheet = ss.insertSheet(SHEET_LOG);
    sheet.appendRow(['nama_user', 'skor', 'total_soal', 'kelas', 'mapel', 'jenis', 'jumlah', 'materi', 'semester', 'soal_json', 'tanggal']);
  }
  if (!ss.getSheetByName(SHEET_CONFIG)) {
    sheet = ss.insertSheet(SHEET_CONFIG);
    sheet.appendRow(['key', 'value']);
    sheet.appendRow(['groq_api_key', 'MASUKKAN_API_KEY_ANDA_DISINI']);
  }
  return 'Setup selesai!';
}