// ============================================
// SCRIPT.JS - AI LEARNING APP (GROQ VERSION)
// ============================================

// KONFIGURASI - GANTI DENGAN URL APPS SCRIPT ANDA!
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwgPI77eCMyYehimbSfthRw-Yu1L8nozXbUXwlM-82cBCKfxELtN0tPdS8r8j3sQqFZZw/exec';

// State global
let currentSoal = [];
let jawabanUser = [];
let timerInterval;
let startTime;
let totalSoal = 0;
let chartInstance;

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

// ========== EVENT LISTENERS ==========
btnGenerate.addEventListener('click', generateSoal);
btnCekSemua.addEventListener('click', cekSemuaJawaban);
btnSelesai.addEventListener('click', selesaiLatihan);
btnExportPDF.addEventListener('click', exportPDF);

document.addEventListener('DOMContentLoaded', function() {
    ambilLogProgress();
    setupDropdownDinamis();
    
    // Set max jumlah soal
    if (jumlahInput) {
        jumlahInput.max = 30;
        jumlahInput.min = 1;
        jumlahInput.value = 5;
    }
});

// ========== FUNGSI UTAMA ==========

/**
 * Generate soal dari API
 */
async function generateSoal() {
    // Validasi input
    if (!validateInput()) return;

    // Disable button
    btnGenerate.disabled = true;
    btnGenerate.innerHTML = '<span class="spinner"></span> Menyiapkan soal...';

    try {
        const params = new URLSearchParams({
            action: 'generateSoal',
            kelas: kelasSelect.value,
            mapel: mapelSelect.value,
            jenis: jenisSelect.value,
            jumlah: jumlahInput.value
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
            
            // Notifikasi
            if (data.source === 'cache') {
                showNotification('📚 Soal diambil dari bank soal', 'info');
            } else {
                showNotification('🤖 Soal digenerate dengan AI', 'success');
            }
            
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

/**
 * Validasi input user
 */
function validateInput() {
    if (!kelasSelect.value) {
        showNotification('Pilih kelas terlebih dahulu!', 'error');
        return false;
    }
    
    if (!namaUserInput.value.trim()) {
        showNotification('Isi nama kamu!', 'error');
        namaUserInput.focus();
        return false;
    }
    
    const jumlah = parseInt(jumlahInput.value);
    if (isNaN(jumlah) || jumlah < 1 || jumlah > 30) {
        showNotification('Jumlah soal harus antara 1-30!', 'error');
        return false;
    }
    
    return true;
}

/**
 * Handle error dari API
 */
function handleError(data) {
    if (data.error) {
        if (data.error.includes('429')) {
            showNotification('⚠️ Server sibuk. Tunggu 1-2 menit lalu coba lagi.', 'warning');
        } else if (data.error.includes('API Key')) {
            showNotification('🔑 Konfigurasi API bermasalah. Hubungi admin.', 'error');
        } else {
            showNotification('Error: ' + data.error, 'error');
        }
    } else {
        showNotification('Terjadi kesalahan tak dikenal', 'error');
    }
}

/**
 * Tampilkan soal ke HTML
 */
function tampilkanSoal() {
    let html = '';
    
    for (let i = 0; i < currentSoal.length; i++) {
        const soal = currentSoal[i];
        const pilihan = soal.pilihan || ['A. Pilihan A', 'B. Pilihan B', 'C. Pilihan C', 'D. Pilihan D'];
        
        html += '<div class="soal-item" id="soal-' + i + '" data-idx="' + i + '">';
        html += '<div class="soal-nomor">Soal ' + (i + 1) + ' / ' + totalSoal + '</div>';
        html += '<p class="soal-pertanyaan">' + (soal.pertanyaan || 'Pertanyaan tidak tersedia') + '</p>';
        html += '<div class="pilihan-container">';
        
        for (let j = 0; j < pilihan.length; j++) {
            const option = String.fromCharCode(65 + j); // A, B, C, D
            const pilId = 'pil-' + i + '-' + option;
            html += '<div class="pilihan-item">';
            html += '<input type="radio" name="soal-' + i + '" id="' + pilId + '" value="' + option + '" onchange="pilihJawaban(' + i + ', \'' + option + '\')">';
            html += '<label for="' + pilId + '">' + pilihan[j] + '</label>';
            html += '</div>';
        }
        
        html += '</div>';
        html += '<div class="jawaban-section" id="jawaban-' + i + '" style="display: none;"></div>';
        html += '</div>';
    }
    
    soalContainer.innerHTML = html;
    updateProgress();
}

/**
 * Fungsi global untuk menangkap pilihan jawaban
 */
window.pilihJawaban = function(idx, option) {
    jawabanUser[idx] = option;
    
    // Tandai soal yang sudah dijawab
    var soalItem = document.getElementById('soal-' + idx);
    if (soalItem) {
        soalItem.classList.add('sudah-dijawab');
    }
    
    updateProgress();
};

/**
 * Update progress bar
 */
function updateProgress() {
    var terjawab = 0;
    for (var i = 0; i < jawabanUser.length; i++) {
        if (jawabanUser[i] !== null) terjawab++;
    }
    
    var progress = totalSoal > 0 ? (terjawab / totalSoal) * 100 : 0;
    
    var progressContainer = document.getElementById('progress-bar-container');
    
    if (!progressContainer) {
        var header = document.querySelector('.soal-header');
        progressContainer = document.createElement('div');
        progressContainer.id = 'progress-bar-container';
        progressContainer.className = 'progress-bar-container';
        progressContainer.innerHTML = '<div class="progress-info">' +
            '<span>Progress Pengerjaan</span>' +
            '<span id="progress-text">' + terjawab + '/' + totalSoal + '</span>' +
            '</div>' +
            '<div class="progress-bar-bg">' +
            '<div class="progress-bar-fill" id="progress-bar-fill" style="width: ' + progress + '%">' + progress.toFixed(0) + '%</div>' +
            '</div>';
        header.appendChild(progressContainer);
    } else {
        var fill = document.getElementById('progress-bar-fill');
        var text = document.getElementById('progress-text');
        if (fill) {
            fill.style.width = progress + '%';
            fill.textContent = progress.toFixed(0) + '%';
        }
        if (text) text.textContent = terjawab + '/' + totalSoal;
    }
}

/**
 * Mulai timer
 */
function mulaiTimer() {
    startTime = Date.now();
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(function() {
        var elapsed = Math.floor((Date.now() - startTime) / 1000);
        var menit = String(Math.floor(elapsed / 60)).padStart(2, '0');
        var detik = String(elapsed % 60).padStart(2, '0');
        timerDisplay.innerText = menit + ':' + detik;
    }, 1000);
}

/**
 * Cek semua jawaban
 */
function cekSemuaJawaban() {
    var skor = 0;
    var semuaTerjawab = true;
    
    for (var i = 0; i < currentSoal.length; i++) {
        var soal = currentSoal[i];
        var jawabanDiv = document.getElementById('jawaban-' + i);
        var userJawab = jawabanUser[i];
        var benar = soal.jawaban_benar || 'A';
        var solusi = soal.solusi || 'Solusi tidak tersedia.';
        
        var feedback = '';
        var statusClass = '';
        
        if (!userJawab) {
            semuaTerjawab = false;
            feedback = '<div class="feedback-icon">⏳</div>' +
                '<div class="feedback-content">' +
                '<span class="belum-dijawab">Belum dijawab</span><br>' +
                '<strong>Jawaban benar:</strong> ' + benar + '<br>' +
                '<strong>Pembahasan:</strong> ' + solusi +
                '</div>';
            statusClass = 'feedback-belum';
        } else if (userJawab === benar) {
            feedback = '<div class="feedback-icon">✅</div>' +
                '<div class="feedback-content">' +
                '<span class="benar">Jawaban Anda benar!</span><br>' +
                '<strong>Pembahasan:</strong> ' + solusi +
                '</div>';
            statusClass = 'feedback-benar';
            skor++;
        } else {
            feedback = '<div class="feedback-icon">❌</div>' +
                '<div class="feedback-content">' +
                '<span class="salah">Jawaban Anda salah</span><br>' +
                '<strong>Jawaban Anda:</strong> ' + userJawab + '<br>' +
                '<strong>Jawaban benar:</strong> ' + benar + '<br>' +
                '<strong>Pembahasan:</strong> ' + solusi +
                '</div>';
            statusClass = 'feedback-salah';
        }
        
        if (jawabanDiv) {
            jawabanDiv.innerHTML = feedback;
            jawabanDiv.className = 'jawaban-section ' + statusClass;
            jawabanDiv.style.display = 'flex';
        }
    }
    
    if (semuaTerjawab) {
        showNotification('✅ Skor sementara: ' + skor + '/' + totalSoal, 'success');
    } else {
        showNotification('📊 Skor sementara: ' + skor + '/' + totalSoal + ' (ada yang belum dijawab)', 'warning');
    }
    
    return skor;
}

/**
 * Selesai latihan - simpan skor
 */
async function selesaiLatihan() {
    if (!confirm('Selesaikan latihan dan simpan skor ke riwayat?')) return;
    
    var skor = cekSemuaJawaban();
    var nama = namaUserInput.value.trim() || 'Anonim';
    var kategori = kelasSelect.value + '-' + mapelSelect.value + '-' + jenisSelect.value;
    
    showNotification('Menyimpan skor...', 'info');
    
    try {
        var params = new URLSearchParams({
            action: 'simpanLog',
            nama_user: nama,
            skor: skor,
            total_soal: totalSoal,
            kategori: kategori
        });
        
        var response = await fetch(APPS_SCRIPT_URL + '?' + params.toString());
        var data = await response.json();
        
        if (data.success) {
            showNotification('✅ Skor ' + skor + '/' + totalSoal + ' tersimpan!', 'success');
            ambilLogProgress(); // Refresh chart
        } else {
            showNotification('Skor tersimpan lokal, tapi gagal sync', 'warning');
        }
    } catch (error) {
        showNotification('Gagal menyimpan skor', 'error');
    } finally {
        clearInterval(timerInterval);
    }
}

/**
 * Export ke PDF
 */
function exportPDF() {
    if (!currentSoal || currentSoal.length === 0) {
        showNotification('Tidak ada soal untuk diekspor', 'error');
        return;
    }
    
    showNotification('Menyiapkan PDF...', 'info');
    
    var { jsPDF } = window.jspdf;
    var doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('Lembar Soal Latihan', 105, 20, { align: 'center' });
    
    // Info
    doc.setFontSize(11);
    doc.setTextColor(52, 73, 94);
    doc.text('Nama: ' + (namaUserInput.value || '______________'), 20, 35);
    doc.text('Kelas: ' + kelasSelect.value + ' | Mapel: ' + mapelSelect.value + ' | Jenis: ' + jenisSelect.value, 20, 42);
    doc.text('Tanggal: ' + new Date().toLocaleDateString('id-ID'), 20, 49);
    doc.text('Jumlah Soal: ' + totalSoal, 20, 56);
    
    var y = 70;
    var lineHeight = 7;
    var pageHeight = 280;
    
    for (var i = 0; i < currentSoal.length; i++) {
        var soal = currentSoal[i];
        
        if (y > pageHeight) {
            doc.addPage();
            y = 20;
        }
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        
        var soalText = (i + 1) + '. ' + (soal.pertanyaan || 'Pertanyaan tidak tersedia');
        var splitPertanyaan = doc.splitTextToSize(soalText, 170);
        doc.text(splitPertanyaan, 20, y);
        y += (splitPertanyaan.length * lineHeight);
        
        doc.setFont(undefined, 'normal');
        
        var pilihan = soal.pilihan || [];
        for (var j = 0; j < pilihan.length; j++) {
            var splitPil = doc.splitTextToSize('   ' + pilihan[j], 165);
            doc.text(splitPil, 25, y);
            y += (splitPil.length * lineHeight);
        }
        
        y += lineHeight * 2;
    }
    
    var fileName = 'soal-' + kelasSelect.value + '-' + mapelSelect.value + '-' + Date.now() + '.pdf';
    doc.save(fileName);
    
    showNotification('✅ PDF berhasil diunduh!', 'success');
}

/**
 * Ambil log progress
 */
async function ambilLogProgress() {
    try {
        var response = await fetch(APPS_SCRIPT_URL + '?action=ambilLog');
        var data = await response.json();
        
        if (data.success && data.log && data.log.length > 0) {
            tampilkanChart(data.log);
        } else {
            tampilkanChartKosong();
        }
    } catch (error) {
        console.error('Gagal ambil log:', error);
        tampilkanChartKosong();
    }
}

/**
 * Tampilkan chart progress
 */
function tampilkanChart(log) {
    var ctx = document.getElementById('progressChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    
    // Kelompokkan data per kategori
    var kategoriMap = {};
    for (var i = 0; i < log.length; i++) {
        var item = log[i];
        var kategori = item.kategori || 'Umum';
        if (!kategoriMap[kategori]) {
            kategoriMap[kategori] = { totalSkor: 0, count: 0 };
        }
        kategoriMap[kategori].totalSkor += parseInt(item.skor) || 0;
        kategoriMap[kategori].count += 1;
    }
    
    var labels = Object.keys(kategoriMap);
    var dataRata = [];
    for (var j = 0; j < labels.length; j++) {
        var l = labels[j];
        var avg = (kategoriMap[l].totalSkor / kategoriMap[l].count).toFixed(1);
        dataRata.push(parseFloat(avg));
    }
    
    var colors = [
        '#4299e1', '#48bb78', '#ed8936', '#9f7aea',
        '#f56565', '#667eea', '#38b2ac', '#fc8181'
    ];
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Rata-rata Skor (%)',
                data: dataRata,
                backgroundColor: colors.slice(0, labels.length),
                borderRadius: 8,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    title: {
                        display: true,
                        text: 'Skor (%)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '📊 Progress Belajar per Kategori',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Rata-rata skor: ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Tampilkan chart kosong
 */
function tampilkanChartKosong() {
    var ctx = document.getElementById('progressChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Belum ada data'],
            datasets: [{
                label: 'Rata-rata Skor',
                data: [0],
                backgroundColor: '#cbd5e0'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '📊 Belum ada riwayat pengerjaan',
                    font: {
                        size: 14
                    }
                }
            }
        }
    });
}

/**
 * Setup dropdown dinamis
 */
function setupDropdownDinamis() {
    kelasSelect.addEventListener('change', function() {
        var kelas = parseInt(this.value);
        
        if (kelas >= 1 && kelas <= 6) {
            // SD
            mapelSelect.innerHTML = 
                '<option value="Matematika">Matematika</option>' +
                '<option value="IPA">IPA</option>' +
                '<option value="Bahasa Indonesia">Bahasa Indonesia</option>';
        } else if (kelas >= 7 && kelas <= 9) {
            // SMP
            mapelSelect.innerHTML = 
                '<option value="Matematika">Matematika</option>' +
                '<option value="Fisika">Fisika</option>' +
                '<option value="Biologi">Biologi</option>' +
                '<option value="Kimia">Kimia</option>' +
                '<option value="Bahasa Inggris">Bahasa Inggris</option>';
        } else if (kelas >= 10 && kelas <= 12) {
            // SMA
            mapelSelect.innerHTML = 
                '<option value="Matematika">Matematika</option>' +
                '<option value="Fisika">Fisika</option>' +
                '<option value="Kimia">Kimia</option>' +
                '<option value="Biologi">Biologi</option>' +
                '<option value="Ekonomi">Ekonomi</option>' +
                '<option value="Sejarah">Sejarah</option>' +
                '<option value="Geografi">Geografi</option>';
        }
    });
}

/**
 * Show notification
 */
function showNotification(message, type) {
    if (type === undefined) type = 'info';
    
    var existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();
    
    var notif = document.createElement('div');
    notif.className = 'notification notification-' + type;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(function() {
        if (notif.parentNode) {
            notif.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(function() {
                if (notif.parentNode) notif.remove();
            }, 300);
        }
    }, 3000);
}