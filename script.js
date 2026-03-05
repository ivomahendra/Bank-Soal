// ============================================
// SCRIPT.JS - AI LEARNING APP (KURIKULUM MERDEKA)
// Versi Stabil - Perbaikan Riwayat, Hapus DB, Multi API Key
// ============================================

// KONFIGURASI - GANTI DENGAN URL APPS SCRIPT ANDA!
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwgPI77eCMyYehimbSfthRw-Yu1L8nozXbUXwlM-82cBCKfxELtN0tPdS8r8j3sQqFZZw/exec';

// ========== DATA KURIKULUM MERDEKA ==========
const mapelByJenjang = {
    'SD': ['Matematika', 'IPA', 'Bahasa Indonesia', 'Bahasa Inggris'],
    'SMP': ['Matematika', 'IPA', 'IPS', 'Bahasa Indonesia', 'Bahasa Inggris'],
    'SMA': ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Ekonomi', 'Sejarah', 'Geografi', 'Bahasa Indonesia', 'Bahasa Inggris']
};

const mapelByOSNLevel = {
    'SD': ['Matematika', 'Ilmu Pengetahuan Alam (IPA)'],
    'SMP': ['Matematika', 'Ilmu Pengetahuan Alam (IPA)', 'Ilmu Pengetahuan Sosial (IPS)'],
    'SMA': ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Informatika/Komputer', 'Astronomi', 'Ekonomi', 'Kebumian', 'Geografi']
};

const materiKurikulumMerdeka = {
    'SD-Matematika': {
        '1': ['Bilangan 1-10', 'Penjumlahan dan Pengurangan', 'Mengukur Panjang', 'Mengenal Waktu'],
        '2': ['Bilangan 1-100', 'Perkalian', 'Pembagian', 'Uang', 'Geometri Dasar'],
        '3': ['Bilangan Cacah', 'Pecahan Sederhana', 'Bangun Datar', 'Keliling dan Luas'],
        '4': ['Faktor dan Kelipatan', 'Pecahan', 'Desimal', 'Bangun Ruang Sederhana'],
        '5': ['Operasi Hitung Pecahan', 'Kecepatan dan Debit', 'Volume Bangun Ruang', 'Koordinat'],
        '6': ['Bilangan Bulat', 'Rasio', 'Lingkaran', 'Statistika Dasar']
    },
    'SD-IPA': {
        '1': ['Tubuhku', 'Hewan di Sekitarku', 'Tumbuhan di Sekitarku', 'Benda di Sekitarku'],
        '2': ['Hewan dan Tumbuhan', 'Siklus Hidup', 'Cuaca', 'Energi'],
        '3': ['Cahaya dan Bunyi', 'Gaya dan Gerak', 'Rantai Makanan', 'Pelestarian Lingkungan'],
        '4': ['Bagian Tubuh Tumbuhan', 'Perkembangbiakan Hewan', 'Sumber Energi', 'Perubahan Lingkungan'],
        '5': ['Sistem Pernapasan', 'Sistem Pencernaan', 'Sistem Peredaran Darah', 'Gaya Magnet'],
        '6': ['Sistem Tata Surya', 'Perkembangbiakan Tumbuhan', 'Listrik', 'Perubahan Fisika dan Kimia']
    },
    'SD-Bahasa Indonesia': {
        '1': ['Membaca Permulaan', 'Menulis Permulaan', 'Kosakata Baru', 'Puisi Sederhana'],
        '2': ['Membaca Cerita', 'Menulis Kalimat', 'Dongeng', 'Percakapan'],
        '3': ['Ide Pokok', 'Kata Depan', 'Surat', 'Pengumuman'],
        '4': ['Kalimat Efektif', 'Paragraf', 'Cerita Rakyat', 'Iklan'],
        '5': ['Teks Eksplanasi', 'Teks Prosedur', 'Teks Deskripsi', 'Puisi'],
        '6': ['Teks Pidato', 'Teks Berita', 'Teks Eksposisi', 'Karya Ilmiah Sederhana']
    },
    'SD-Bahasa Inggris': {
        '1': ['Greetings', 'Alphabet', 'Numbers 1-10', 'Colors'],
        '2': ['Family', 'Parts of Body', 'Daily Activities', 'Food'],
        '3': ['Time', 'Days and Months', 'Hobbies', 'Animals'],
        '4': ['Adjectives', 'Simple Present', 'Prepositions', 'Weather'],
        '5': ['Simple Past', 'Asking Direction', 'Shopping', 'Holiday'],
        '6': ['Future Plan', 'Descriptive Text', 'Procedure Text', 'Narrative Text']
    },
    'SMP-Matematika': {
        '7': ['Bilangan Bulat', 'Himpunan', 'Aljabar', 'Persamaan Linear', 'Perbandingan', 'Aritmetika Sosial', 'Garis dan Sudut', 'Segiempat dan Segitiga', 'Penyajian Data'],
        '8': ['Pola Bilangan', 'Koordinat Kartesius', 'Relasi dan Fungsi', 'Persamaan Garis Lurus', 'SPLDV', 'Teorema Pythagoras', 'Lingkaran', 'Bangun Ruang Sisi Datar', 'Statistika'],
        '9': ['Perpangkatan', 'Bentuk Akar', 'Persamaan Kuadrat', 'Transformasi', 'Kekongruenan', 'Kesebangunan', 'Bangun Ruang Sisi Lengkung', 'Peluang']
    },
    'SMP-IPA': {
        '7': ['Objek IPA', 'Klasifikasi Makhluk Hidup', 'Klasifikasi Materi', 'Suhu dan Kalor', 'Energi', 'Tata Surya'],
        '8': ['Gerak Benda', 'Pesawat Sederhana', 'Struktur Tumbuhan', 'Sistem Pencernaan', 'Zat Aditif', 'Getaran dan Gelombang'],
        '9': ['Sistem Reproduksi', 'Sistem Koordinasi', 'Perkembangbiakan', 'Listrik Statis', 'Listrik Dinamis', 'Kemagnetan']
    },
    'SMP-IPS': {
        '7': ['Ruang dan Interaksi', 'Kehidupan Masa Praaksara', 'Kegiatan Ekonomi', 'Lembaga Sosial'],
        '8': ['Kondisi Geografis Indonesia', 'Mobilitas Sosial', 'Perdagangan Antarnegara', 'Kolonialisme'],
        '9': ['Globalisasi', 'Pasar Bebas', 'Ketergantungan Antarruang', 'Perubahan Sosial']
    },
    'SMP-Bahasa Indonesia': {
        '7': ['Teks Deskripsi', 'Teks Narasi', 'Teks Prosedur', 'Teks Laporan', 'Puisi Rakyat', 'Fabel'],
        '8': ['Teks Eksposisi', 'Teks Persuasi', 'Drama', 'Iklan', 'Slogan', 'Poster'],
        '9': ['Teks Tanggapan', 'Teks Diskusi', 'Cerita Inspiratif', 'Karya Ilmiah', 'Resensi']
    },
    'SMP-Bahasa Inggris': {
        '7': ['Greetings & Introductions', 'Descriptive Text', 'Procedure Text', 'Recount Text'],
        '8': ['Narrative Text', 'Simple Present vs Past', 'Comparison', 'Invitation'],
        '9': ['Passive Voice', 'Report Text', 'Present Perfect', 'Song Lyrics']
    },
    'SMA-Matematika': {
        '10': ['Eksponen', 'Logaritma', 'Nilai Mutlak', 'SPLDV', 'SPtLDV', 'Matriks', 'Barisan dan Deret', 'Trigonometri', 'Fungsi Kuadrat'],
        '11': ['Program Linear', 'Matriks', 'Transformasi', 'Induksi Matematika', 'Turunan', 'Integral', 'Lingkaran', 'Statistika'],
        '12': ['Dimensi Tiga', 'Limit', 'Turunan', 'Integral', 'Peluang', 'Distribusi Normal']
    },
    'SMA-Fisika': {
        '10': ['Hakikat Fisika', 'Vektor', 'Gerak Lurus', 'Gerak Parabola', 'Gerak Melingkar', 'Hukum Newton', 'Gravitasi', 'Usaha dan Energi', 'Momentum'],
        '11': ['Dinamika Rotasi', 'Elastisitas', 'Fluida Statis', 'Fluida Dinamis', 'Suhu dan Kalor', 'Teori Kinetik Gas', 'Termodinamika'],
        '12': ['Gelombang', 'Bunyi', 'Cahaya', 'Listrik Statis', 'Listrik Dinamis', 'Medan Magnet', 'Induksi Elektromagnetik', 'Fisika Modern']
    },
    'SMA-Kimia': {
        '10': ['Hakikat Kimia', 'Perkembangan Model Atom', 'SPU', 'Ikatan Kimia', 'Stoikiometri', 'Larutan Elektrolit', 'Redoks'],
        '11': ['Hidrokarbon', 'Termokimia', 'Laju Reaksi', 'Kesetimbangan', 'Larutan Asam Basa', 'Larutan Penyangga', 'Hidrolisis'],
        '12': ['Sifat Koligatif', 'Redoks dan Elektrokimia', 'Unsur Golongan Utama', 'Unsur Transisi', 'Kimia Organik', 'Benzena']
    },
    'SMA-Biologi': {
        '10': ['Keanekaragaman Hayati', 'Virus', 'Bakteri', 'Ekosistem'],
        '11': ['Sel', 'Jaringan Tumbuhan', 'Jaringan Hewan', 'Sistem Gerak', 'Sistem Peredaran Darah'],
        '12': ['Genetika', 'Evolusi', 'Bioteknologi', 'Metabolisme']
    },
    'SMA-Ekonomi': {
        '10': ['Konsep Ekonomi', 'Masalah Ekonomi', 'Pelaku Ekonomi', 'Harga Pasar'],
        '11': ['Pendapatan Nasional', 'Inflasi', 'Kebijakan Moneter', 'APBN'],
        '12': ['Akuntansi', 'Laporan Keuangan', 'Koperasi', 'Manajemen']
    },
    'SMA-Sejarah': {
        '10': ['Konsep Sejarah', 'Penelitian Sejarah', 'Kehidupan Awal', 'Kerajaan Hindu-Buddha'],
        '11': ['Kerajaan Islam', 'Kolonialisme', 'Pergerakan Nasional', 'Proklamasi'],
        '12': ['Orde Lama', 'Orde Baru', 'Reformasi', 'Sejarah Dunia']
    },
    'SMA-Geografi': {
        '10': ['Konsep Geografi', 'Peta', 'Jarak dan Skala', 'Litosfer'],
        '11': ['Atmosfer', 'Hidrosfer', 'Biosfer', 'Antroposfer'],
        '12': ['Wilayah', 'Perwilayahan', 'Desa Kota', 'SIG']
    },
    'SMA-Bahasa Indonesia': {
        '10': ['Teks LHO', 'Teks Eksposisi', 'Teks Anekdot', 'Teks Negosiasi', 'Debat'],
        '11': ['Teks Prosedur', 'Teks Ceramah', 'Cerpen', 'Karya Ilmiah', 'Resensi'],
        '12': ['Surat Lamaran', 'Artikel', 'Novel', 'Kritik Sastra']
    },
    'SMA-Bahasa Inggris': {
        '10': ['Descriptive Text', 'Recount Text', 'Narrative Text', 'Procedure Text'],
        '11': ['Explanation Text', 'Discussion Text', 'Review Text', 'Song'],
        '12': ['News Item', 'Report Text', 'Analytical Exposition', 'Hortatory Exposition']
    }
};

// ========== STATE GLOBAL ==========
let currentSoal = [];
let jawabanUser = [];
let timerInterval;
let startTime;
let totalSoal = 0;
let allLogs = [];

// Elemen DOM
const btnGenerate = document.getElementById('btnGenerate');
const soalSection = document.getElementById('soalSection');
const soalContainer = document.getElementById('soalContainer');
const btnCekSemua = document.getElementById('btnCekSemua');
const btnSelesai = document.getElementById('btnSelesai');
const btnExportPDF = document.getElementById('btnExportPDF');
const timerDisplay = document.getElementById('timerDisplay');
const namaUserInput = document.getElementById('namaUser');
const kelasSelect = document.getElementById('kelas');
const mapelSelect = document.getElementById('mapel');
const jenisSelect = document.getElementById('jenis');
const jumlahInput = document.getElementById('jumlah');
const tingkatKesulitanSelect = document.getElementById('tingkatKesulitan');
const materiSelect = document.getElementById('materi');
const semesterSelect = document.getElementById('semester');
const materiGroup = document.getElementById('materi-group');
const semesterGroup = document.getElementById('semester-group');
const historyList = document.getElementById('historyList');
const filterNama = document.getElementById('filterNama');
const filterKelas = document.getElementById('filterKelas');
const btnApplyFilter = document.getElementById('btnApplyFilter');
const btnResetFilter = document.getElementById('btnResetFilter');

// ========== FUNGSI DROPDOWN DINAMIS ==========
function updateKelasOptions() {
    const jenis = jenisSelect.value;
    if (!jenis) {
        kelasSelect.innerHTML = '<option value="">-- Pilih Jenis Ujian Dahulu --</option>';
        return;
    }
    
    let options = [];
    if (jenis === 'OSN') {
        options = [
            { value: '1', label: 'SD - Kelas 1' },
            { value: '2', label: 'SD - Kelas 2' },
            { value: '3', label: 'SD - Kelas 3' },
            { value: '4', label: 'SD - Kelas 4' },
            { value: '5', label: 'SD - Kelas 5' },
            { value: '6', label: 'SD - Kelas 6' },
            { value: '7', label: 'SMP - Kelas 7' },
            { value: '8', label: 'SMP - Kelas 8' },
            { value: '9', label: 'SMP - Kelas 9' },
            { value: '10', label: 'SMA - Kelas 10' },
            { value: '11', label: 'SMA - Kelas 11' },
            { value: '12', label: 'SMA - Kelas 12' }
        ];
    } else {
        options = [
            { value: '1', label: '1 SD' },
            { value: '2', label: '2 SD' },
            { value: '3', label: '3 SD' },
            { value: '4', label: '4 SD' },
            { value: '5', label: '5 SD' },
            { value: '6', label: '6 SD' },
            { value: '7', label: '7 SMP' },
            { value: '8', label: '8 SMP' },
            { value: '9', label: '9 SMP' },
            { value: '10', label: '10 SMA' },
            { value: '11', label: '11 SMA' },
            { value: '12', label: '12 SMA' }
        ];
    }
    
    kelasSelect.innerHTML = '<option value="">-- Pilih Kelas --</option>';
    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        kelasSelect.appendChild(option);
    });
}

function updateMapelOptions() {
    const kelas = kelasSelect.value;
    const jenis = jenisSelect.value;
    
    if (!kelas) {
        mapelSelect.innerHTML = '<option value="">-- Pilih Kelas Dahulu --</option>';
        return;
    }
    
    const kelasNum = parseInt(kelas);
    let jenjang = '';
    if (kelasNum <= 6) jenjang = 'SD';
    else if (kelasNum <= 9) jenjang = 'SMP';
    else jenjang = 'SMA';
    
    let mapelList = [];
    if (jenis === 'OSN') {
        mapelList = mapelByOSNLevel[jenjang] || [];
    } else {
        mapelList = mapelByJenjang[jenjang] || [];
    }
    
    mapelSelect.innerHTML = '';
    if (mapelList.length === 0) {
        mapelSelect.innerHTML = '<option value="">-- Mapel tidak tersedia --</option>';
        return;
    }
    mapelList.forEach(m => {
        const option = document.createElement('option');
        option.value = m;
        option.textContent = m;
        mapelSelect.appendChild(option);
    });
    if (!mapelSelect.value && mapelList.length > 0) {
        mapelSelect.value = mapelList[0];
    }
    updateMateriOptions();
}

function updateMateriOptions() {
    const kelas = kelasSelect.value;
    const mapel = mapelSelect.value;
    const jenis = jenisSelect.value;
    
    materiSelect.innerHTML = '<option value="">-- Pilih Materi --</option>';
    
    if (jenis === 'Harian' && kelas && mapel) {
        materiGroup.style.display = 'block';
        const kelasNum = parseInt(kelas);
        let jenjang = '';
        if (kelasNum <= 6) jenjang = 'SD';
        else if (kelasNum <= 9) jenjang = 'SMP';
        else jenjang = 'SMA';
        
        const key = jenjang + '-' + mapel;
        let materiList = [];
        if (materiKurikulumMerdeka[key] && materiKurikulumMerdeka[key][kelas]) {
            materiList = materiKurikulumMerdeka[key][kelas];
        }
        if (materiList.length === 0) {
            materiList = ['Umum', 'Materi 1', 'Materi 2', 'Materi 3'];
        }
        materiList.forEach(m => {
            const option = document.createElement('option');
            option.value = m;
            option.textContent = m;
            materiSelect.appendChild(option);
        });
    } else {
        materiGroup.style.display = 'none';
        materiSelect.value = '';
    }
}

function toggleSemesterOptions() {
    semesterGroup.style.display = jenisSelect.value === 'UAS' ? 'block' : 'none';
}

// ========== EVENT LISTENERS ==========
btnGenerate.addEventListener('click', async () => {
    await generateSoal();
});

btnCekSemua.addEventListener('click', () => {
    cekSemuaJawaban();
});

btnSelesai.addEventListener('click', async () => {
    await selesaiLatihan();
});

btnExportPDF.addEventListener('click', () => {
    exportPDF();
});

jenisSelect.addEventListener('change', () => {
    updateKelasOptions();
    updateMateriOptions();
    toggleSemesterOptions();
});

kelasSelect.addEventListener('change', () => {
    updateMapelOptions();
    toggleSemesterOptions();
});

mapelSelect.addEventListener('change', updateMateriOptions);

btnApplyFilter.addEventListener('click', applyFilter);
btnResetFilter.addEventListener('click', resetFilter);

document.addEventListener('DOMContentLoaded', async () => {
    jumlahInput.max = 30;
    jumlahInput.min = 1;
    jumlahInput.value = 3;
    updateKelasOptions();
    await loadHistory();
    await syncPendingData(allLogs);
});

// ========== LOAD HISTORY ==========
async function loadHistory() {
    try {
        const params = new URLSearchParams({ action: 'ambilLog' });
        const response = await fetch(APPS_SCRIPT_URL + '?' + params.toString());
        const data = await response.json();
        if (data.success) {
            allLogs = data.log || [];
            // Isi filter kelas dengan opsi unik dari logs
            const kelasSet = new Set(allLogs.map(item => item.kelas).filter(k => k));
            filterKelas.innerHTML = '<option value="">Semua Kelas</option>';
            [...kelasSet].sort().forEach(k => {
                const opt = document.createElement('option');
                opt.value = k;
                opt.textContent = k;
                filterKelas.appendChild(opt);
            });
            renderHistory(allLogs);
        } else {
            showNotification('Gagal memuat riwayat', 'error');
        }
    } catch (e) {
        showNotification('Gagal terhubung ke server', 'error');
    }
}

// ========== RENDER HISTORY ==========
function renderHistory(logs) {
    logs.sort((a,b) => new Date(b.tanggal) - new Date(a.tanggal));
    if (logs.length === 0) {
        historyList.innerHTML = '<p class="loading">Tidak ada riwayat yang cocok.</p>';
        return;
    }
    let html = '';
    logs.forEach((item) => {
        const tgl = new Date(item.tanggal).toLocaleString('id-ID');
        const persen = Math.round((item.skor / item.total_soal) * 100) || 0;
        html += `
        <div class="history-item" data-id="${item.id || ''}">
            <div class="history-info">
                <p><strong>${item.nama_user}</strong> - ${tgl}</p>
                <p>${item.kelas} | ${item.mapel} | ${item.jenis} ${item.materi ? '| '+item.materi : ''} ${item.semester ? '| Semester '+item.semester : ''}</p>
                <p>Skor: ${item.skor}/${item.total_soal} (${persen}%)</p>
            </div>
            <div class="history-actions">
                <button class="btn-redo" onclick="redoAttempt('${item.id}')">🔄 Kerjakan Ulang</button>
                <button class="btn-print" onclick="printHistory('${item.id}')">🖨️ Cetak Hasil</button>
                <button class="btn-delete" onclick="deleteHistoryItem('${item.id}')">🗑️ Hapus</button>
            </div>
        </div>
        `;
    });
    historyList.innerHTML = html;
    window.filteredLogs = logs;
}

// ========== FILTER ==========
function applyFilter() {
    const namaFilter = filterNama.value.trim().toLowerCase();
    const kelasFilter = filterKelas.value;
    let filtered = allLogs;
    if (namaFilter) {
        filtered = filtered.filter(item => item.nama_user.toLowerCase().includes(namaFilter));
    }
    if (kelasFilter) {
        filtered = filtered.filter(item => item.kelas == kelasFilter);
    }
    renderHistory(filtered);
}

function resetFilter() {
    filterNama.value = '';
    filterKelas.value = '';
    renderHistory(allLogs);
}

// ========== DELETE HISTORY ITEM ==========
window.deleteHistoryItem = async function(id) {
    if (!confirm('Hapus item ini dari riwayat secara permanen?')) return;
    
    try {
        const params = new URLSearchParams({
            action: 'hapusLog',
            id: id
        });
        const response = await fetch(APPS_SCRIPT_URL + '?' + params.toString());
        const data = await response.json();
        if (data.success) {
            // Hapus dari allLogs
            allLogs = allLogs.filter(item => item.id != id);
            renderHistory(allLogs);
            showNotification('Item berhasil dihapus', 'success');
        } else {
            showNotification('Gagal menghapus: ' + data.error, 'error');
        }
    } catch (e) {
        showNotification('Gagal terhubung ke server', 'error');
    }
};

// ========== REDO ATTEMPT ==========
window.redoAttempt = async function(id) {
    const item = allLogs.find(item => item.id == id);
    if (!item) return;
    
    if (item.soal_json) {
        try {
            let soalBaru = JSON.parse(item.soal_json);
            soalBaru = shuffleArray(soalBaru);
            currentSoal = soalBaru;
            totalSoal = currentSoal.length;
            jawabanUser = new Array(totalSoal).fill(null);
            tampilkanSoal();
            mulaiTimer();
            soalSection.style.display = 'block';
            namaUserInput.value = item.nama_user;
            kelasSelect.value = item.kelas;
            updateMapelOptions();
            mapelSelect.value = item.mapel;
            jenisSelect.value = item.jenis;
            jumlahInput.value = item.jumlah;
            if (item.materi && materiSelect) materiSelect.value = item.materi;
            if (item.semester && semesterSelect) semesterSelect.value = item.semester;
            tingkatKesulitanSelect.value = item.tingkatKesulitan || 'Sedang';
            showNotification('✅ Soal dimuat & diacak!', 'info');
        } catch (e) {
            showNotification('Gagal memuat soal', 'error');
        }
    } else {
        generateSoal({
            kelas: item.kelas,
            mapel: item.mapel,
            jenis: item.jenis,
            jumlah: item.jumlah,
            materi: item.materi,
            semester: item.semester,
            nama_user: item.nama_user,
            tingkatKesulitan: item.tingkatKesulitan || 'Sedang'
        });
    }
};

// ========== PRINT HISTORY ==========
window.printHistory = async function(id) {
    const item = allLogs.find(item => item.id == id);
    if (!item || !item.soal_json) {
        showNotification('Data soal tidak tersedia', 'error');
        return;
    }
    try {
        const soal = JSON.parse(item.soal_json);
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(20); doc.text('Hasil Pengerjaan', 105, 20, { align: 'center' });
        doc.setFontSize(11);
        doc.text('Nama: ' + item.nama_user, 20, 35);
        doc.text(`Kelas: ${item.kelas} | Mapel: ${item.mapel} | Jenis: ${item.jenis}`, 20, 42);
        doc.text('Tanggal: ' + new Date(item.tanggal).toLocaleDateString('id-ID'), 20, 49);
        const persen = Math.round((item.skor / item.total_soal) * 100) || 0;
        doc.text(`Skor: ${item.skor}/${item.total_soal} (${persen}%)`, 20, 56);
        let y = 70, lineH = 7;
        soal.forEach((s, i) => {
            if (y > 280) { doc.addPage(); y = 20; }
            doc.setFont(undefined, 'bold');
            let q = (i+1) + '. ' + (s.pertanyaan || '').replace(/\$/g,'');
            const qL = doc.splitTextToSize(q, 170);
            doc.text(qL, 20, y);
            y += qL.length * lineH;
            doc.setFont(undefined, 'normal');
            if (s.pilihan) {
                s.pilihan.forEach(p => {
                    const pl = '   ' + p.replace(/\$/g,'');
                    const pL = doc.splitTextToSize(pl, 165);
                    doc.text(pL, 25, y);
                    y += pL.length * lineH;
                });
            }
            doc.text('Jawaban benar: ' + (s.jawaban_benar || 'A'), 25, y);
            y += lineH;
            doc.text('Pembahasan: ' + (s.solusi || '').replace(/\$/g,''), 25, y);
            y += lineH * 2;
        });
        doc.save('hasil-'+item.nama_user+'-'+Date.now()+'.pdf');
        showNotification('PDF hasil siap', 'success');
    } catch (e) {
        showNotification('Gagal membuat PDF', 'error');
    }
};

// ========== VALIDASI ==========
function validateAllFields() {
    if (!kelasSelect.value) {
        showNotification('❌ Kelas belum dipilih!', 'error');
        kelasSelect.focus();
        return false;
    }
    if (!mapelSelect.value) {
        showNotification('❌ Mata Pelajaran belum dipilih!', 'error');
        mapelSelect.focus();
        return false;
    }
    if (!jenisSelect.value) {
        showNotification('❌ Jenis Ujian belum dipilih!', 'error');
        jenisSelect.focus();
        return false;
    }
    if (!namaUserInput.value.trim()) {
        showNotification('❌ Nama belum diisi!', 'error');
        namaUserInput.focus();
        return false;
    }
    const jumlah = parseInt(jumlahInput.value);
    if (isNaN(jumlah) || jumlah < 1 || jumlah > 30) {
        showNotification('❌ Jumlah soal harus antara 1-30!', 'error');
        jumlahInput.focus();
        return false;
    }
    if (jenisSelect.value === 'Harian' && !materiSelect.value) {
        showNotification('❌ Materi untuk Ulangan Harian belum dipilih!', 'error');
        materiSelect.focus();
        return false;
    }
    if (jenisSelect.value === 'UAS' && !semesterSelect.value) {
        showNotification('❌ Semester untuk UAS belum dipilih!', 'error');
        semesterSelect.focus();
        return false;
    }
    return true;
}

// ========== GENERATE SOAL ==========
async function generateSoal(historyParams = null) {
    let kelas, mapel, jenis, jumlah, materi, semester, nama, tingkatKesulitan;
    
    if (historyParams) {
        kelas = historyParams.kelas;
        mapel = historyParams.mapel;
        jenis = historyParams.jenis;
        jumlah = historyParams.jumlah;
        materi = historyParams.materi || '';
        semester = historyParams.semester || '';
        nama = historyParams.nama_user;
        tingkatKesulitan = historyParams.tingkatKesulitan || 'Sedang';
        kelasSelect.value = kelas;
        updateMapelOptions();
        mapelSelect.value = mapel;
        jenisSelect.value = jenis;
        jumlahInput.value = jumlah;
        tingkatKesulitanSelect.value = tingkatKesulitan;
        if (materiSelect) materiSelect.value = materi;
        if (semesterSelect) semesterSelect.value = semester;
        namaUserInput.value = nama;
    } else {
        if (!validateAllFields()) return;
        kelas = kelasSelect.value;
        mapel = mapelSelect.value;
        jenis = jenisSelect.value;
        jumlah = jumlahInput.value;
        materi = materiSelect.value || '';
        semester = semesterSelect.value || '';
        nama = namaUserInput.value.trim();
        tingkatKesulitan = tingkatKesulitanSelect.value || 'Sedang';
    }

    if (!kelas || kelas === 'undefined' || !mapel || mapel === 'undefined' || !jenis || jenis === 'undefined' || !nama) {
        showNotification('Data tidak lengkap atau tidak valid!', 'error');
        return;
    }

    btnGenerate.disabled = true;
    btnGenerate.innerHTML = '<span class="spinner"></span> Menyiapkan soal...';

    try {
        const params = new URLSearchParams({
            action: 'generateSoal',
            kelas: kelas,
            mapel: mapel,
            jenis: jenis,
            jumlah: jumlah,
            materi: materi || '',
            semester: semester || '',
            nama: nama,
            tingkatKesulitan: tingkatKesulitan
        });

        const response = await fetch(APPS_SCRIPT_URL + '?' + params.toString());
        const data = await response.json();
        
        if (data.success) {
            currentSoal = data.soal;
            totalSoal = currentSoal.length;
            jawabanUser = new Array(totalSoal).fill(null);
            tampilkanSoal();
            mulaiTimer();
            soalSection.style.display = 'block';
            let msg = '🤖 Soal digenerate dengan AI';
            if (materi) msg += ' - Materi: ' + materi;
            if (semester) msg += ' - Semester ' + semester;
            msg += ` - Tingkat: ${tingkatKesulitan}`;
            showNotification(msg, 'success');
            soalSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            handleError(data);
        }
    } catch (error) {
        showNotification('Gagal terhubung ke server', 'error');
        console.error(error);
    } finally {
        btnGenerate.disabled = false;
        btnGenerate.innerHTML = '🎯 Mulai Latihan';
    }
}

function handleError(data) {
    if (data.error) {
        if (data.error.includes('429')) showNotification('⚠️ Server sibuk. Tunggu 1-2 menit.', 'warning');
        else if (data.error.includes('API Key')) showNotification('🔑 Konfigurasi API bermasalah.', 'error');
        else showNotification('Error: ' + data.error, 'error');
    } else showNotification('Terjadi kesalahan tak dikenal', 'error');
}

// ========== FUNGSI CLEAN LATEX ==========
function cleanLatex(text) {
    if (!text) return text;
    const typos = [
        ['memilikiikakar', 'memiliki akar'],
        ['makanilai', 'maka nilai'],
        ['bilangangrafen', 'bilangan real'],
        ['positi f', 'positif'],
        ['tidaksamadenganom', 'tidak sama dengan nol'],
        ['nilainiminum', 'nilai minimum'],
        ['persamaankuadrat', 'persamaan kuadrat'],
        ['berikutin', 'berikut ini'],
        ['denganom', 'dengan nol'],
        ['grafikfungsi', 'grafik fungsi'],
        ['tentukanlah', 'tentukan'],
        ['berapakah', 'berapa'],
    ];
    typos.forEach(t => { text = text.replace(new RegExp(t[0], 'g'), t[1]); });
    
    text = text.replace(/([a-zA-Z0-9])\s*\{\s*\\?\\?\\?wedge\s*(\d+)\s*\}/g, '$1^$2');
    text = text.replace(/\\\^(\d+)/g, '^$1');
    text = text.replace(/([a-zA-Z0-9])\s*\^\s*\{\s*(\d+)\s*\}/g, '$1^$2');
    
    text = text.replace(/([a-zA-Z0-9])\s*\\?_(\d+)/g, '$1_$2');
    text = text.replace(/\\_(\d+)/g, '_$1');
    
    text = text.replace(/\\?\\?\\?frac/g, '\\frac');
    text = text.replace(/frac\{/g, '\\frac{');
    text = text.replace(/\\frac\s*{([^}]*)}\s*{([^}]*)}/g, '\\frac{$1}{$2}');
    
    text = text.replace(/\\?\\?\\?cdot\s+cdot/g, '\\cdot');
    text = text.replace(/\\?\\?\\?cdot/g, '\\cdot');
    
    text = text.replace(/\\\\/g, '\\');
    
    text = text.replace(/\{\s+/g, '{');
    text = text.replace(/\s+\}/g, '}');
    
    ['sin','cos','tan','log','ln','sqrt'].forEach(f => {
        text = text.replace(new RegExp('\\\\?\\\\?\\\\?'+f, 'g'), '\\'+f);
    });
    
    text = text.replace(/\s*\+\s*/g, ' + ');
    text = text.replace(/\s*\-\s*/g, ' - ');
    text = text.replace(/\s*\=\s*/g, ' = ');
    
    const hasLatex = /\\[a-zA-Z]+|[\^_]|\{[0-9]+\}|\\frac|\\cdot|\\sqrt/.test(text);
    if (hasLatex && !text.includes('$') && !text.includes('\\(')) {
        text = '$' + text + '$';
    }
    
    let open = (text.match(/\{/g) || []).length;
    let close = (text.match(/\}/g) || []).length;
    while (open > close) { text += '}'; close++; }
    
    return text;
}

function tampilkanSoal() {
    let html = '';
    for (let i = 0; i < currentSoal.length; i++) {
        const soal = currentSoal[i];
        const pilihan = soal.pilihan || ['A. Pilihan A', 'B. Pilihan B', 'C. Pilihan C', 'D. Pilihan D'];
        let pertanyaan = cleanLatex(soal.pertanyaan || 'Pertanyaan tidak tersedia'); 
        
        html += '<div class="soal-item" id="soal-' + i + '">';
        html += '<div class="soal-nomor">Soal ' + (i+1) + '/' + totalSoal + '</div>';
        html += '<div class="soal-pertanyaan math-content">' + pertanyaan + '</div>';
        html += '<div class="pilihan-container">';
        
        for (let j = 0; j < pilihan.length; j++) {
            const opt = String.fromCharCode(65 + j);
            const pilId = `pil-${i}-${opt}`;
            let teks = cleanLatex(pilihan[j]);
            html += `<div class="pilihan-item">`;
            html += `<input type="radio" name="soal-${i}" id="${pilId}" value="${opt}" onchange="pilihJawaban(${i}, '${opt}')">`;
            html += `<label for="${pilId}" class="math-content">${teks}</label>`;
            html += '</div>';
        }
        html += '</div>';
        html += `<div class="jawaban-section" id="jawaban-${i}" style="display: none;"></div>`;
        html += '</div>';
    }
    soalContainer.innerHTML = html;
    if (window.MathJax) MathJax.typesetPromise();
    updateProgress();
}

window.pilihJawaban = function(idx, opt) {
    jawabanUser[idx] = opt;
    document.getElementById('soal-'+idx).classList.add('sudah-dijawab');
    updateProgress();
};

function updateProgress() {
    const terjawab = jawabanUser.filter(j => j !== null).length;
    const progress = totalSoal ? (terjawab / totalSoal) * 100 : 0;
    let progDiv = document.getElementById('progress-bar-container');
    if (!progDiv) {
        const header = document.querySelector('.soal-header');
        progDiv = document.createElement('div');
        progDiv.id = 'progress-bar-container';
        progDiv.className = 'progress-bar-container';
        progDiv.innerHTML = '<div class="progress-info"><span>Progress</span><span id="progress-text">0/0</span></div>' +
            '<div class="progress-bar-bg"><div class="progress-bar-fill" id="progress-bar-fill">0%</div></div>';
        header.appendChild(progDiv);
    }
    document.getElementById('progress-bar-fill').style.width = progress + '%';
    document.getElementById('progress-bar-fill').textContent = progress.toFixed(0) + '%';
    document.getElementById('progress-text').textContent = terjawab + '/' + totalSoal;
}

function mulaiTimer() {
    startTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const menit = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const detik = String(elapsed % 60).padStart(2, '0');
        timerDisplay.innerText = menit + ':' + detik;
    }, 1000);
}

function cekSemuaJawaban() {
    let skor = 0, semuaTerjawab = true;
    for (let i = 0; i < currentSoal.length; i++) {
        const soal = currentSoal[i];
        const div = document.getElementById('jawaban-'+i);
        const user = jawabanUser[i];
        const benar = soal.jawaban_benar || 'A';
        let solusi = cleanLatex(soal.solusi || 'Solusi tidak tersedia.');
        let feedback, cls;
        
        if (!user) {
            semuaTerjawab = false;
            feedback = `<div class="feedback-icon">⏳</div><div class="feedback-content"><span class="belum-dijawab">Belum dijawab</span><br><strong>Jawaban benar:</strong> ${benar}<br><strong>Pembahasan:</strong> ${solusi}</div>`;
            cls = 'feedback-belum';
        } else if (user === benar) {
            feedback = `<div class="feedback-icon">✅</div><div class="feedback-content"><span class="benar">Benar!</span><br><strong>Pembahasan:</strong> ${solusi}</div>`;
            cls = 'feedback-benar';
            skor++;
        } else {
            feedback = `<div class="feedback-icon">❌</div><div class="feedback-content"><span class="salah">Salah</span><br><strong>Jawaban Anda:</strong> ${user}<br><strong>Jawaban benar:</strong> ${benar}<br><strong>Pembahasan:</strong> ${solusi}</div>`;
            cls = 'feedback-salah';
        }
        div.innerHTML = feedback;
        div.className = 'jawaban-section ' + cls;
        div.style.display = 'flex';
    }
    if (window.MathJax) MathJax.typesetPromise();
    showNotification(`Skor sementara: ${skor}/${totalSoal}`, semuaTerjawab ? 'success' : 'warning');
    return { skor, semuaTerjawab };
}

// ========== SELESAI LATIHAN ==========
async function selesaiLatihan() {
    if (!confirm('Selesai dan simpan skor ke riwayat?')) return;
    const { skor, semuaTerjawab } = cekSemuaJawaban();
    const salah = totalSoal - skor;
    alert(`✅ Latihan selesai!\n\nBenar: ${skor}\nSalah: ${salah}\nTotal Soal: ${totalSoal}\n\nSkor akan disimpan.`);
    
    const nama = namaUserInput.value.trim() || 'Anonim';
    
    // Buat ID unik
    const id = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    
    const hasil = {
        id: id,
        nama_user: nama,
        skor: skor,
        total_soal: totalSoal,
        kelas: kelasSelect.value,
        mapel: mapelSelect.value,
        jenis: jenisSelect.value,
        jumlah: jumlahInput.value,
        tingkatKesulitan: tingkatKesulitanSelect.value || 'Sedang',
        materi: materiSelect.value || '',
        semester: semesterSelect.value || '',
        soal_json: currentSoal,
        jawaban_user: jawabanUser,
        waktu_pengerjaan: timerDisplay.innerText,
        tanggal: new Date().toISOString()
    };
    
    // Simpan ke localStorage
    let hasilBackup = [];
    try {
        const existing = localStorage.getItem('bankSoalBackup');
        if (existing) hasilBackup = JSON.parse(existing);
    } catch (e) {
        hasilBackup = [];
    }
    hasilBackup.push(hasil);
    localStorage.setItem('bankSoalBackup', JSON.stringify(hasilBackup));
    showNotification('✅ Backup lokal tersimpan', 'success');
    
    await syncPendingData(allLogs);
    await loadHistory();
    
    clearInterval(timerInterval);
}

// ========== SYNC PENDING DATA ==========
async function syncPendingData(existingLogs = []) {
    let pending = [];
    try {
        const existing = localStorage.getItem('bankSoalBackup');
        if (existing) pending = JSON.parse(existing);
    } catch (e) {
        return;
    }
    if (pending.length === 0) return;

    const existingIds = new Set(existingLogs.map(log => log.id).filter(id => id));
    const pendingToSend = pending.filter(item => !existingIds.has(item.id));

    if (pendingToSend.length === 0) {
        localStorage.removeItem('bankSoalBackup');
        return;
    }

    showNotification(`Mengirim ${pendingToSend.length} data pending ke server...`, 'info');

    for (let i = pendingToSend.length - 1; i >= 0; i--) {
        const item = pendingToSend[i];
        try {
            const params = new URLSearchParams({
                action: 'simpanLog',
                id: item.id,
                nama_user: item.nama_user,
                skor: item.skor,
                total_soal: item.total_soal,
                kelas: item.kelas,
                mapel: item.mapel,
                jenis: item.jenis,
                jumlah: item.jumlah,
                tingkatKesulitan: item.tingkatKesulitan || '',
                materi: item.materi || '',
                semester: item.semester || '',
                soal_json: JSON.stringify(item.soal_json),
                waktu_pengerjaan: item.waktu_pengerjaan || ''
            });
            const response = await fetch(APPS_SCRIPT_URL + '?' + params.toString());
            const data = await response.json();
            if (data.success) {
                pending = pending.filter(p => p.id !== item.id);
            } else {
                console.log('Gagal sync item:', data);
            }
        } catch (e) {
            console.log('Error sync item:', e);
        }
    }

    localStorage.setItem('bankSoalBackup', JSON.stringify(pending));
    if (pending.length === 0) {
        showNotification('Semua data pending berhasil dikirim!', 'success');
    } else {
        showNotification(`${pending.length} data masih pending.`, 'warning');
    }
}

// ========== EXPORT PDF ==========
function exportPDF() {
    if (!currentSoal.length) { showNotification('Tidak ada soal', 'error'); return; }
    showNotification('Menyiapkan PDF...', 'info');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(20); doc.text('Lembar Soal Latihan', 105, 20, { align: 'center' });
    doc.setFontSize(11);
    doc.text('Nama: ' + (namaUserInput.value || '_________'), 20, 35);
    doc.text(`Kelas: ${kelasSelect.value} | Mapel: ${mapelSelect.value} | Jenis: ${jenisSelect.value}`, 20, 42);
    doc.text('Tanggal: ' + new Date().toLocaleDateString('id-ID'), 20, 49);
    if (materiSelect.value) doc.text('Materi: ' + materiSelect.value, 20, 56);
    let y = 70, lineH = 7;
    for (let i = 0; i < currentSoal.length; i++) {
        if (y > 280) { doc.addPage(); y = 20; }
        const s = currentSoal[i];
        let q = (i+1) + '. ' + (s.pertanyaan || '').replace(/\$/g,'');
        const qLines = doc.splitTextToSize(q, 170);
        doc.text(qLines, 20, y);
        y += qLines.length * lineH;
        (s.pilihan || []).forEach(p => {
            const pl = '   ' + p.replace(/\$/g,'');
            const pLines = doc.splitTextToSize(pl, 165);
            doc.text(pLines, 25, y);
            y += pLines.length * lineH;
        });
        y += lineH*2;
    }
    doc.save('soal-'+Date.now()+'.pdf');
    showNotification('PDF siap', 'success');
}

// ========== UTILITY ==========
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function showNotification(msg, type = 'info') {
    const old = document.querySelector('.notification');
    if (old) old.remove();
    const n = document.createElement('div');
    n.className = `notification notification-${type}`;
    n.textContent = msg;
    document.body.appendChild(n);
    setTimeout(() => {
        if (n.parentNode) {
            n.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => n.remove(), 300);
        }
    }, 3000);
}