// ============================================
// SCRIPT.JS - AI LEARNING APP (KURIKULUM MERDEKA)
// Versi Stabil - Backup lokal dengan kadaluarsa 1 jam
// ============================================

// KONFIGURASI - GANTI DENGAN URL APPS SCRIPT ANDA!
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUdIyXf5czqwnZjGK1Ech1lWtx-7QyR90FJE3GqpBgb3_MyPLO3a3p5mMX-xYPLNZBiA/exec';

// ========== DATA DROPDOWN UNTUK HARIAN & UAS (PER KELAS) ==========
const dropdownData = {
  "1": {
    "nama": "Kelas 1 SD",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Aku Cinta Allah", "Mengenal Malaikat", "Akhlak Terpuji", "Bersuci"],
        "semester2": ["Shalat", "Kisah Nabi", "Hidup Bersih", "Doa Sehari-hari"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Aku dan Temanku", "Aturan di Rumah", "Lambang Negara"],
        "semester2": ["Hak dan Kewajiban", "Gotong Royong", "Sikap Tolong Menolong"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Mengenal Huruf", "Membaca Suku Kata", "Menulis Kata", "Kosakata sehari-hari"],
        "semester2": ["Kalimat Sederhana", "Cerita Bergambar", "Membaca Nyaring", "Puisi Anak"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Bilangan 1-10", "Membandingkan Banyak Benda", "Penjumlahan Sederhana", "Pengurangan Sederhana"],
        "semester2": ["Bangun Datar", "Pola Bilangan", "Mengukur Panjang", "Waktu"]
      },
      {
        "nama": "Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)",
        "semester1": ["Gerak Dasar Lokomotor", "Gerak Dasar Non-lokomotor", "Permainan Sederhana"],
        "semester2": ["Kebersihan Diri", "Makanan Sehat", "Aktivitas Air"]
      },
      {
        "nama": "Seni dan Budaya (Musik/Rupa/Teater/Tari)",
        "semester1": ["Menggambar Bebas", "Mewarnai", "Menyanyi Lagu Anak"],
        "semester2": ["Gerak Tari Sederhana", "Bermain Peran", "Membuat Kolase"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Bahasa Daerah", "Permainan Tradisional"],
        "semester2": ["Kesenian Daerah", "Makanan Tradisional"]
      },
      {
        "nama": "Bahasa Inggris (pilihan)",
        "semester1": ["Greetings", "Alphabet", "Numbers 1-10"],
        "semester2": ["Colors", "My Family", "My Body"]
      }
    ]
  },
  "2": {
    "nama": "Kelas 2 SD",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Asmaul Husna", "Hidup Bersih", "Sikap Jujur", "Hormat kepada Orang Tua"],
        "semester2": ["Puasa", "Kisah Nabi", "Akhlak Mulia", "Berdoa"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Aturan di Sekolah", "Musyawarah", "Keberagaman"],
        "semester2": ["Sikap Tolong Menolong", "Cinta Tanah Air", "Hak dan Kewajiban"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Membaca Nyaring", "Menulis Kalimat", "Kata Benda dan Kata Sifat", "Ungkapan"],
        "semester2": ["Cerita Rakyat", "Puisi Anak", "Membaca Pemahaman", "Menulis Paragraf"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Bilangan 11-50", "Nilai Tempat", "Penjumlahan Bersusun", "Pengurangan Bersusun"],
        "semester2": ["Jam dan Waktu", "Bangun Ruang Sederhana", "Perkalian Dasar", "Pembagian Dasar"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Gerak Dasar Manipulatif", "Senam Lantai Sederhana", "Aktivitas Air"],
        "semester2": ["Kebugaran Jasmani", "Hidup Sehat", "Permainan Bola Sederhana"]
      },
      {
        "nama": "Seni dan Budaya",
        "semester1": ["Menggambar Imajinatif", "Membuat Kolase", "Menyanyi dengan Alat Musik Sederhana"],
        "semester2": ["Tari Kreasi", "Drama Sederhana", "Menggambar Perspektif"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Bahasa Daerah", "Upacara Adat"],
        "semester2": ["Kerajinan Tangan Lokal", "Permainan Tradisional"]
      },
      {
        "nama": "Bahasa Inggris (pilihan)",
        "semester1": ["My Body", "My School", "Toys"],
        "semester2": ["Fruits", "Animals", "Daily Activities"]
      }
    ]
  },
  "3": {
    "nama": "Kelas 3 SD",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Kitab Suci", "Ibadah Harian", "Akhlak Mulia", "Berdoa"],
        "semester2": ["Kisah Teladan", "Hari Besar Keagamaan", "Toleransi", "Zakat"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Makna Pancasila", "Simbol-simbol Negara", "Kerja Sama"],
        "semester2": ["Hak dan Kewajiban di Masyarakat", "Bhineka Tunggal Ika", "Cinta Produk Indonesia"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Membaca Pemahaman", "Menulis Paragraf", "Kata Depan", "Sinonim Antonim"],
        "semester2": ["Cerita Fabel", "Pantun", "Ide Pokok", "Kata Baku"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Bilangan 51-100", "Perkalian Dasar", "Pembagian Dasar", "Pecahan Sederhana"],
        "semester2": ["Pengukuran Panjang", "Bangun Datar dan Keliling", "Satuan Berat", "Uang"]
      },
      {
        "nama": "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
        "semester1": ["Makhluk Hidup", "Siklus Air", "Wujud Benda", "Gaya dan Gerak"],
        "semester2": ["Lingkungan Sekitar", "Pekerjaan", "Transportasi", "Keragaman Budaya"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Kombinasi Gerak Dasar", "Aktivitas Ritmik", "Renang Gaya Bebas"],
        "semester2": ["Kebugaran", "Pencegahan Penyakit", "Permainan Bola Kecil"]
      },
      {
        "nama": "Seni dan Budaya",
        "semester1": ["Menggambar Perspektif", "Membuat Patung Sederhana", "Membaca Notasi Musik"],
        "semester2": ["Tari Daerah", "Bermain Peran", "Menyanyi Lagu Wajib"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Cerita Rakyat", "Tarian Tradisional"],
        "semester2": ["Makanan Khas", "Bahasa Daerah"]
      },
      {
        "nama": "Bahasa Inggris (pilihan)",
        "semester1": ["Time", "Daily Activities", "Food and Drink"],
        "semester2": ["Clothes", "Weather", "My House"]
      }
    ]
  },
  "4": {
    "nama": "Kelas 4 SD",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Iman kepada Malaikat", "Hidup Sederhana", "Zakat", "Kisah Nabi"],
        "semester2": ["Toleransi", "Akhlak Terpuji", "Ibadah", "Muamalah"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Nilai-nilai Pancasila", "Peraturan Perundangan", "Hak Asasi Manusia"],
        "semester2": ["Demokrasi", "Cinta Produk Indonesia", "Sistem Pemerintahan"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Membaca Intensif", "Menulis Cerita", "Ide Pokok", "Kata Baku"],
        "semester2": ["Surat", "Puisi Bebas", "Fakta dan Opini", "Kalimat Efektif"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Bilangan Cacah Besar", "Faktor dan Kelipatan", "Bilangan Pecahan"],
        "semester2": ["Bangun Datar (Luas)", "Satuan Baku", "Pengolahan Data Sederhana", "Sudut"]
      },
      {
        "nama": "IPAS",
        "semester1": ["Organ Tubuh Manusia", "Perkembangbiakan Tumbuhan", "Materi dan Perubahannya", "Sumber Energi"],
        "semester2": ["Keragaman Suku Bangsa", "Peninggalan Sejarah", "Kegiatan Ekonomi", "Perkembangan Teknologi"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Atletik (Lari, Lompat)", "Senam Lantai", "Renang"],
        "semester2": ["Kebugaran", "Pola Makan Sehat", "Permainan Bola Besar"]
      },
      {
        "nama": "Seni dan Budaya",
        "semester1": ["Menggambar Ekspresi", "Membuat Karya Kerajinan", "Menyanyi Lagu Wajib"],
        "semester2": ["Tari Kreasi", "Teater Tradisional", "Apresiasi Seni"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Aksara Daerah", "Kesenian Daerah"],
        "semester2": ["Permainan Tradisional", "Sejarah Lokal"]
      },
      {
        "nama": "Bahasa Inggris (pilihan)",
        "semester1": ["My House", "Hobbies", "Professions"],
        "semester2": ["Transportation", "Public Places", "Telling Time"]
      }
    ]
  },
  "5": {
    "nama": "Kelas 5 SD",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Iman kepada Kitab", "Akhlak Terpuji", "Sedekah", "Haji"],
        "semester2": ["Menghormati Orang Tua", "Kisah Teladan", "Hidup Sederhana", "Berdoa"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Sistem Pemerintahan", "Lembaga Negara", "Hak dan Kewajiban Warga"],
        "semester2": ["Kebebasan Berpendapat", "Persatuan", "Bhinneka Tunggal Ika"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Membaca Cepat", "Menulis Laporan", "Fakta dan Opini", "Kalimat Efektif"],
        "semester2": ["Iklan", "Prosa", "Membaca Kritis", "Menulis Artikel"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Bilangan Bulat", "Operasi Hitung Campuran", "Pecahan dan Desimal", "Perbandingan"],
        "semester2": ["Bangun Ruang (Volume)", "Koordinat", "Penyajian Data", "Skala"]
      },
      {
        "nama": "IPAS",
        "semester1": ["Sistem Pernapasan", "Ekosistem", "Rantai Makanan", "Perubahan Wujud Benda"],
        "semester2": ["Listrik Sederhana", "Proklamasi Kemerdekaan", "Perekonomian Indonesia", "Globalisasi"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Permainan Bola Besar", "Permainan Bola Kecil", "Aktivitas Senam"],
        "semester2": ["Renang Gaya Punggung", "Kebugaran", "Bahaya Rokok"]
      },
      {
        "nama": "Seni dan Budaya",
        "semester1": ["Menggambar Bentuk", "Membuat Kriya", "Bermain Alat Musik"],
        "semester2": ["Tari Nusantara", "Drama Modern", "Pertunjukan Musik"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Sejarah Lokal", "Kerajinan Khas"],
        "semester2": ["Kuliner Daerah", "Budaya Daerah"]
      },
      {
        "nama": "Bahasa Inggris (pilihan)",
        "semester1": ["Holidays", "Around the Town", "Telling Time"],
        "semester2": ["Descriptions", "Simple Past Tense", "Future Plans"]
      }
    ]
  },
  "6": {
    "nama": "Kelas 6 SD",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Iman kepada Qada dan Qadar", "Kiamat", "Dakwah", "Perilaku Terpuji"],
        "semester2": ["Toleransi Beragama", "Kisah Nabi", "Ibadah", "Muamalah"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Pancasila sebagai Dasar Negara", "Konstitusi", "Hukum"],
        "semester2": ["Hak Asasi Manusia", "Persatuan dan Kesatuan", "Demokrasi"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Membaca Kritis", "Menulis Artikel", "Ringkasan", "Kesimpulan"],
        "semester2": ["Surat Resmi", "Cerita Pendek", "Menulis Cerita", "Puisi"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Bilangan Bulat Negatif", "Operasi Hitung Campuran", "Faktor Persekutuan", "Kelipatan Persekutuan"],
        "semester2": ["Bangun Ruang (Jaring-jaring)", "Statistika", "Peluang", "Pengolahan Data"]
      },
      {
        "nama": "IPAS",
        "semester1": ["Sistem Peredaran Darah", "Perkembangbiakan Manusia", "Tata Surya", "Perubahan Lingkungan"],
        "semester2": ["Perjuangan Mempertahankan Kemerdekaan", "ASEAN", "Modernisasi", "Globalisasi"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Permainan Bola Besar (Lanjutan)", "Atletik", "Senam"],
        "semester2": ["Renang", "Kebugaran", "Pertolongan Pertama"]
      },
      {
        "nama": "Seni dan Budaya",
        "semester1": ["Apresiasi Seni", "Membuat Karya Seni", "Pertunjukan Musik"],
        "semester2": ["Tari Kreatif", "Drama Kolaborasi", "Menggambar Ekspresi"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Budaya Daerah", "Kearifan Lokal"],
        "semester2": ["Pariwisata Daerah", "Adat Istiadat"]
      },
      {
        "nama": "Bahasa Inggris (pilihan)",
        "semester1": ["Narrative Text", "Recount Text", "Invitation"],
        "semester2": ["Passive Voice", "Future Plans", "Simple Past Tense"]
      }
    ]
  },
  "7": {
    "nama": "Kelas 7 SMP",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Iman kepada Allah", "Akhlak", "Ibadah", "Muamalah"],
        "semester2": ["Sejarah Peradaban Islam", "Kisah Nabi", "Hidup Sehat", "Toleransi"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Sejarah Pancasila", "Norma", "Undang-Undang Dasar 1945"],
        "semester2": ["Bhinneka Tunggal Ika", "Negara Kesatuan RI", "Hak dan Kewajiban"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Teks Deskripsi", "Teks Cerita Fantasi", "Teks Prosedur"],
        "semester2": ["Teks Laporan Hasil Observasi", "Puisi Rakyat", "Fabel"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Bilangan Bulat dan Pecahan", "Himpunan", "Aljabar", "Persamaan Linear"],
        "semester2": ["Perbandingan", "Aritmetika Sosial", "Garis dan Sudut", "Segiempat dan Segitiga", "Penyajian Data"]
      },
      {
        "nama": "Ilmu Pengetahuan Alam (IPA)",
        "semester1": ["Besaran dan Pengukuran", "Klasifikasi Makhluk Hidup", "Zat dan Karakteristiknya"],
        "semester2": ["Suhu dan Kalor", "Energi", "Sistem Organisasi Kehidupan", "Ekosistem", "Pencemaran Lingkungan"]
      },
      {
        "nama": "Ilmu Pengetahuan Sosial (IPS)",
        "semester1": ["Ruang dan Interaksi", "Keadaan Alam Indonesia", "Peninggalan Sejarah", "Masa Praaksara"],
        "semester2": ["Kerajaan Hindu-Buddha", "Kerajaan Islam", "Kegiatan Ekonomi", "Permintaan dan Penawaran"]
      },
      {
        "nama": "Bahasa Inggris",
        "semester1": ["Greetings", "Introducing Self", "Telling Time", "Daily Routines"],
        "semester2": ["Descriptions (People, Animals)", "Simple Present Tense", "Pronouns", "Simple Past Tense"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Permainan Bola Besar", "Permainan Bola Kecil", "Atletik", "Senam"],
        "semester2": ["Aktivitas Ritmik", "Renang", "Kebugaran", "Pertumbuhan Remaja"]
      },
      {
        "nama": "Informatika",
        "semester1": ["Berpikir Komputasional", "Teknologi Informasi", "Sistem Komputer"],
        "semester2": ["Jaringan Internet", "Analisis Data", "Algoritma Pemrograman", "Dampak Sosial Informatika"]
      },
      {
        "nama": "Seni dan Prakarya (Musik/Rupa/Teater/Tari/Prakarya)",
        "semester1": ["Seni Rupa: Menggambar", "Seni Musik: Notasi", "Seni Tari: Gerak Dasar"],
        "semester2": ["Seni Teater: Improvisasi", "Prakarya: Kerajinan", "Prakarya: Rekayasa"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Bahasa Daerah", "Adat Istiadat"],
        "semester2": ["Kesenian Daerah", "Keterampilan Lokal"]
      }
    ]
  },
  "8": {
    "nama": "Kelas 8 SMP",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Iman kepada Kitab", "Akhlak", "Ibadah", "Muamalah"],
        "semester2": ["Sejarah Nabi", "Hidup Sehat", "Toleransi", "Akhlak Terpuji"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Ideologi Pancasila", "Konstitusi", "Lembaga Negara"],
        "semester2": ["Demokrasi", "Hak Asasi Manusia", "Persatuan"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Teks Berita", "Teks Iklan", "Teks Eksposisi"],
        "semester2": ["Teks Puisi", "Teks Drama", "Buku Fiksi dan Nonfiksi"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Pola Bilangan", "Koordinat Kartesius", "Relasi dan Fungsi", "Persamaan Garis Lurus"],
        "semester2": ["Sistem Persamaan Linear Dua Variabel", "Teorema Pythagoras", "Lingkaran", "Bangun Ruang Sisi Datar", "Statistika"]
      },
      {
        "nama": "IPA",
        "semester1": ["Gerak Benda", "Pesawat Sederhana", "Struktur dan Fungsi Tumbuhan", "Sistem Pencernaan Manusia"],
        "semester2": ["Zat Aditif dan Adiktif", "Sistem Peredaran Darah", "Tekanan Zat", "Getaran dan Gelombang", "Cahaya dan Alat Optik"]
      },
      {
        "nama": "IPS",
        "semester1": ["Interaksi Keruangan", "Lembaga Sosial", "Keunggulan dan Keterbatasan Antarruang"],
        "semester2": ["Masa Kolonial", "Pergerakan Nasional", "Perdagangan Internasional", "Ketenagakerjaan"]
      },
      {
        "nama": "Bahasa Inggris",
        "semester1": ["Asking and Giving Opinion", "Obligations", "Prohibition", "Recount Text"],
        "semester2": ["Narrative Text", "Simple Past Tense", "Present Continuous Tense", "Degrees of Comparison"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Permainan Bola Besar (Lanjutan)", "Permainan Bola Kecil (Lanjutan)", "Atletik (Lompat Jauh)", "Senam Lantai"],
        "semester2": ["Renang", "Kebugaran", "Pola Hidup Sehat", "Pencegahan Pergaulan Bebas"]
      },
      {
        "nama": "Informatika",
        "semester1": ["Berpikir Komputasional", "Teknologi Informasi", "Sistem Komputer"],
        "semester2": ["Jaringan Komputer", "Analisis Data", "Pemrograman Dasar", "Dampak Sosial"]
      },
      {
        "nama": "Seni dan Prakarya",
        "semester1": ["Seni Rupa: Desain", "Seni Musik: Lagu Daerah", "Seni Tari: Tari Kreasi"],
        "semester2": ["Seni Teater: Naskah", "Prakarya: Budidaya", "Prakarya: Pengolahan"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Bahasa Daerah", "Sejarah Lokal"],
        "semester2": ["Keterampilan Daerah", "Adat Istiadat"]
      }
    ]
  },
  "9": {
    "nama": "Kelas 9 SMP",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Iman kepada Hari Akhir", "Akhlak", "Ibadah", "Muamalah"],
        "semester2": ["Sejarah Peradaban Islam", "Kisah Nabi", "Toleransi", "Hidup Sehat"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Pancasila dalam Praktik", "Hukum dan Peradilan", "Hak dan Kewajiban"],
        "semester2": ["Persatuan", "Ancaman terhadap Negara", "Demokrasi"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Teks Pidato", "Teks Diskusi", "Teks Cerita Inspiratif"],
        "semester2": ["Novel", "Kritik dan Esai", "Karya Ilmiah Sederhana"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Bilangan Berpangkat", "Bentuk Akar", "Persamaan Kuadrat", "Transformasi Geometri"],
        "semester2": ["Kesebangunan dan Kekongruenan", "Bangun Ruang Sisi Lengkung", "Peluang", "Statistika (Lanjutan)"]
      },
      {
        "nama": "IPA",
        "semester1": ["Sistem Reproduksi Manusia", "Sistem Koordinasi", "Listrik Statis", "Listrik Dinamis"],
        "semester2": ["Kemagnetan", "Bioteknologi", "Tanah dan Keberlangsungan Kehidupan", "Teknologi Ramah Lingkungan"]
      },
      {
        "nama": "IPS",
        "semester1": ["Perubahan Sosial", "Globalisasi", "Pasar Bebas"],
        "semester2": ["Masa Kemerdekaan", "Masa Orde Baru", "Masa Reformasi", "Kerjasama Internasional"]
      },
      {
        "nama": "Bahasa Inggris",
        "semester1": ["Present Perfect Tense", "Passive Voice", "Conditional Sentence"],
        "semester2": ["Report Text", "Analytical Exposition", "Song", "Procedure Text"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Permainan Bola Besar (Taktik)", "Permainan Bola Kecil (Taktik)", "Atletik", "Senam"],
        "semester2": ["Renang", "Kebugaran", "Keselamatan di Jalan Raya", "Bahaya Narkoba"]
      },
      {
        "nama": "Informatika",
        "semester1": ["Berpikir Komputasional", "Teknologi Informasi", "Sistem Komputer"],
        "semester2": ["Jaringan", "Analisis Data", "Pemrograman Lanjut", "Dampak Sosial"]
      },
      {
        "nama": "Seni dan Prakarya",
        "semester1": ["Seni Rupa: Pameran", "Seni Musik: Apresiasi", "Seni Tari: Koreografi"],
        "semester2": ["Seni Teater: Pementasan", "Prakarya: Produk Kreatif", "Prakarya: Kerajinan"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Bahasa Daerah", "Adat Istiadat"],
        "semester2": ["Kearifan Lokal", "Sejarah Lokal"]
      }
    ]
  },
  "10": {
    "nama": "Kelas 10 SMA",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti",
        "semester1": ["Iman kepada Allah", "Akhlak", "Ibadah", "Muamalah"],
        "semester2": ["Sejarah Peradaban Islam", "Kisah Nabi", "Toleransi", "Hidup Sehat"]
      },
      {
        "nama": "Pendidikan Pancasila",
        "semester1": ["Pancasila sebagai Ideologi", "Konstitusi", "Hak dan Kewajiban"],
        "semester2": ["Demokrasi", "Negara Hukum", "Persatuan"]
      },
      {
        "nama": "Bahasa Indonesia",
        "semester1": ["Teks Laporan Hasil Observasi", "Teks Eksposisi", "Teks Anekdot"],
        "semester2": ["Teks Cerita Rakyat", "Teks Negosiasi", "Debat", "Biografi", "Puisi", "Cerpen"]
      },
      {
        "nama": "Matematika",
        "semester1": ["Eksponen dan Logaritma", "Nilai Mutlak", "Sistem Persamaan Linear Tiga Variabel"],
        "semester2": ["Fungsi Kuadrat", "Trigonometri (Perbandingan, Identitas)", "Vektor", "Peluang", "Statistika", "Lingkaran"]
      },
      {
        "nama": "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
        "semester1": ["Pengukuran", "Hukum Dasar Kimia", "Energi Terbarukan", "Keanekaragaman Hayati"],
        "semester2": ["Pemanasan Global", "Lapisan Bumi", "Interaksi Sosial", "Lembaga Sosial", "Sejarah Indonesia (Masa Praaksara, Hindu-Buddha, Islam)"]
      },
      {
        "nama": "PJOK",
        "semester1": ["Permainan Bola Besar", "Permainan Bola Kecil", "Atletik", "Senam"],
        "semester2": ["Aktivitas Ritmik", "Renang", "Kebugaran", "Pertolongan Pertama", "Kesehatan Reproduksi"]
      },
      {
        "nama": "Sejarah Indonesia",
        "semester1": ["Masa Praaksara", "Masa Hindu-Buddha", "Masa Kerajaan Islam"],
        "semester2": ["Masa Kolonial", "Pergerakan Nasional", "Proklamasi"]
      },
      {
        "nama": "Bahasa Inggris",
        "semester1": ["Teks Deskriptif", "Teks Prosedur", "Teks Recount"],
        "semester2": ["Narrative Text", "Simple Past vs Present Perfect", "Expressions: Introduction, Congratulation, Compliment"]
      },
      {
        "nama": "Seni dan Prakarya",
        "semester1": ["Seni Rupa: Apresiasi", "Seni Musik: Apresiasi", "Seni Tari: Apresiasi"],
        "semester2": ["Seni Teater: Apresiasi", "Prakarya: Kerajinan", "Prakarya: Rekayasa", "Prakarya: Budidaya", "Prakarya: Pengolahan"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Bahasa Daerah", "Budaya Daerah"],
        "semester2": ["Keterampilan Daerah", "Adat Istiadat"]
      }
    ]
  },
  "11": {
    "nama": "Kelas 11 SMA",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti (Wajib)",
        "semester1": ["Iman kepada Kitab", "Akhlak", "Ibadah", "Muamalah"],
        "semester2": ["Sejarah", "Toleransi", "Hidup Sehat", "Akhlak Terpuji"]
      },
      {
        "nama": "Pendidikan Pancasila (Wajib)",
        "semester1": ["Sistem Pemerintahan", "Lembaga Peradilan", "Hak Asasi"],
        "semester2": ["Wawasan Nusantara", "Ketahanan Nasional", "Persatuan"]
      },
      {
        "nama": "Bahasa Indonesia (Wajib)",
        "semester1": ["Teks Prosedur", "Teks Eksplanasi", "Teks Ceramah"],
        "semester2": ["Karya Ilmiah", "Resensi", "Novel"]
      },
      {
        "nama": "Matematika (Wajib)",
        "semester1": ["Program Linear", "Matriks", "Fungsi Komposisi dan Invers"],
        "semester2": ["Barisan dan Deret", "Limit Fungsi", "Turunan Fungsi", "Integral"]
      },
      {
        "nama": "PJOK (Wajib)",
        "semester1": ["Permainan Bola Besar (Taktik)", "Permainan Bola Kecil (Taktik)", "Atletik", "Senam"],
        "semester2": ["Renang", "Kebugaran", "Gizi", "Pencegahan Narkoba"]
      },
      {
        "nama": "Sejarah Indonesia (Wajib)",
        "semester1": ["Masa Pendudukan Jepang", "Proklamasi", "Perjuangan Mempertahankan Kemerdekaan"],
        "semester2": ["Masa Demokrasi Liberal", "Masa Demokrasi Terpimpin", "Masa Orde Baru", "Masa Reformasi"]
      },
      {
        "nama": "Bahasa Inggris (Wajib)",
        "semester1": ["Teks Eksposisi Analitis", "Teks Diskusi", "Explanation Text"],
        "semester2": ["Passive Voice", "Conditional Sentence", "Relative Clause"]
      },
      {
        "nama": "Matematika Tingkat Lanjut (Pilihan MIPA)",
        "semester1": ["Polinomial", "Matriks Lanjut", "Fungsi Trigonometri"],
        "semester2": ["Limit Trigonometri", "Turunan Trigonometri", "Integral Lanjut", "Statistika Inferensi"]
      },
      {
        "nama": "Fisika (Pilihan MIPA)",
        "semester1": ["Kinematika", "Dinamika", "Usaha dan Energi", "Momentum"],
        "semester2": ["Getaran Harmonis", "Fluida Statis", "Suhu dan Kalor", "Termodinamika", "Gelombang Mekanik"]
      },
      {
        "nama": "Kimia (Pilihan MIPA)",
        "semester1": ["Hukum Dasar Kimia", "Stoikiometri", "Ikatan Kimia", "Termokimia"],
        "semester2": ["Laju Reaksi", "Kesetimbangan Kimia", "Larutan Asam Basa", "Hidrolisis Garam", "Larutan Penyangga"]
      },
      {
        "nama": "Biologi (Pilihan MIPA)",
        "semester1": ["Sel", "Jaringan Tumbuhan", "Jaringan Hewan", "Sistem Gerak"],
        "semester2": ["Sistem Peredaran Darah", "Sistem Pencernaan", "Sistem Pernapasan", "Sistem Ekskresi", "Sistem Koordinasi"]
      },
      {
        "nama": "Informatika (Pilihan MIPA)",
        "semester1": ["Berpikir Komputasional", "Algoritma Pemrograman", "Struktur Data"],
        "semester2": ["Pengembangan Aplikasi", "Dampak Sosial", "Keamanan Siber"]
      },
      {
        "nama": "Ekonomi (Pilihan IPS)",
        "semester1": ["Konsep Dasar Ekonomi", "Permintaan dan Penawaran", "Pasar", "Bank"],
        "semester2": ["Kebijakan Moneter", "Kebijakan Fiskal", "APBN", "Pajak", "Perdagangan Internasional"]
      },
      {
        "nama": "Sosiologi (Pilihan IPS)",
        "semester1": ["Fungsi Sosiologi", "Interaksi Sosial", "Sosialisasi", "Nilai dan Norma"],
        "semester2": ["Perilaku Menyimpang", "Pengendalian Sosial", "Stratifikasi Sosial", "Konflik dan Integrasi"]
      },
      {
        "nama": "Geografi (Pilihan IPS)",
        "semester1": ["Konsep Geografi", "Peta", "Litosfer", "Pedosfer"],
        "semester2": ["Atmosfer", "Hidrosfer", "Biosfer", "Sumber Daya Alam", "Lingkungan Hidup"]
      },
      {
        "nama": "Antropologi (Pilihan IPS)",
        "semester1": ["Konsep Antropologi", "Kebudayaan", "Sistem Religi", "Bahasa"],
        "semester2": ["Kesenian", "Etnografi", "Perubahan Budaya"]
      },
      {
        "nama": "Bahasa dan Sastra Indonesia (Pilihan Bahasa)",
        "semester1": ["Linguistik", "Sastra", "Apresiasi Puisi", "Apresiasi Prosa"],
        "semester2": ["Drama", "Kritik Sastra", "Apresiasi Novel"]
      },
      {
        "nama": "Bahasa Jawa (Pilihan Bahasa)",
        "semester1": ["Aksara Jawa", "Unggah-ungguh", "Teks Cerita"],
        "semester2": ["Wayang", "Tembang", "Paramasastra"]
      },
      {
        "nama": "Bahasa Mandarin (Pilihan Bahasa)",
        "semester1": ["Hanzi", "Tata Bahasa", "Membaca"],
        "semester2": ["Menulis", "Percakapan", "Membaca Teks"]
      },
      {
        "nama": "Bahasa Jepang (Pilihan Bahasa)",
        "semester1": ["Hiragana", "Katakana", "Kanji Dasar"],
        "semester2": ["Tata Bahasa", "Membaca", "Percakapan"]
      },
      {
        "nama": "Bahasa Jerman (Pilihan Bahasa)",
        "semester1": ["Alfabet", "Tata Bahasa Dasar", "Membaca"],
        "semester2": ["Menulis", "Percakapan", "Budaya Jerman"]
      },
      {
        "nama": "Prakarya dan Kewirausahaan (Pilihan Vokasi)",
        "semester1": ["Kerajinan", "Rekayasa", "Budidaya"],
        "semester2": ["Pengolahan", "Perencanaan Usaha", "Pemasaran"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Bahasa Daerah", "Adat Istiadat"],
        "semester2": ["Keterampilan Lokal", "Budaya Daerah"]
      }
    ]
  },
  "12": {
    "nama": "Kelas 12 SMA",
    "mapel": [
      {
        "nama": "Pendidikan Agama dan Budi Pekerti (Wajib)",
        "semester1": ["Iman kepada Qada dan Qadar", "Akhlak", "Ibadah", "Muamalah"],
        "semester2": ["Sejarah Peradaban Islam", "Toleransi", "Hidup Sehat", "Kisah Nabi"]
      },
      {
        "nama": "Pendidikan Pancasila (Wajib)",
        "semester1": ["Dinamika Pancasila", "Hukum Internasional", "Hak Asasi Manusia"],
        "semester2": ["Persatuan", "Ancaman Global", "Wawasan Nusantara"]
      },
      {
        "nama": "Bahasa Indonesia (Wajib)",
        "semester1": ["Surat Lamaran Pekerjaan", "Teks Editorial", "Novel"],
        "semester2": ["Kritik dan Esai", "Karya Tulis Ilmiah", "Resensi"]
      },
      {
        "nama": "Matematika (Wajib)",
        "semester1": ["Statistika Lanjut", "Peluang Lanjut", "Turunan Fungsi Trigonometri"],
        "semester2": ["Aplikasi Turunan", "Integral Lanjut", "Matriks Transformasi"]
      },
      {
        "nama": "PJOK (Wajib)",
        "semester1": ["Permainan Bola Besar (Strategi)", "Permainan Bola Kecil (Strategi)", "Atletik", "Senam"],
        "semester2": ["Renang", "Kebugaran", "Manajemen Kesehatan", "Pencegahan Narkoba"]
      },
      {
        "nama": "Sejarah Indonesia (Wajib)",
        "semester1": ["Perkembangan Politik Masa Reformasi", "Perkembangan Ekonomi"],
        "semester2": ["Perkembangan Sosial Budaya", "Indonesia dalam Perdamaian Dunia"]
      },
      {
        "nama": "Bahasa Inggris (Wajib)",
        "semester1": ["Teks News Item", "Teks Explanation", "Teks Review"],
        "semester2": ["Passive Voice", "Conditional Sentence", "Reported Speech"]
      },
      {
        "nama": "Matematika Tingkat Lanjut (Pilihan MIPA)",
        "semester1": ["Limit Lanjut", "Turunan Lanjut", "Integral Lanjut"],
        "semester2": ["Aplikasi Turunan", "Aplikasi Integral", "Persamaan Diferensial", "Geometri Analitik"]
      },
      {
        "nama": "Fisika (Pilihan MIPA)",
        "semester1": ["Listrik Statis", "Listrik Dinamis", "Medan Magnet", "Induksi Elektromagnetik"],
        "semester2": ["Rangkaian AC", "Fisika Modern", "Radioaktivitas", "Fisika Inti"]
      },
      {
        "nama": "Kimia (Pilihan MIPA)",
        "semester1": ["Kelarutan dan Hasil Kali Kelarutan", "Koloid", "Kimia Unsur", "Senyawa Organik"],
        "semester2": ["Makromolekul", "Elektrokimia", "Korosi", "Kimia Terapan"]
      },
      {
        "nama": "Biologi (Pilihan MIPA)",
        "semester1": ["Metabolisme", "Genetika", "Evolusi", "Bioteknologi"],
        "semester2": ["Mikrobiologi", "Imunologi", "Teknologi DNA", "Biologi Molekuler"]
      },
      {
        "nama": "Informatika (Pilihan MIPA)",
        "semester1": ["Kecerdasan Buatan", "Machine Learning", "Big Data"],
        "semester2": ["Internet of Things", "Keamanan Jaringan", "Pengembangan Aplikasi Lanjut"]
      },
      {
        "nama": "Ekonomi (Pilihan IPS)",
        "semester1": ["Akuntansi Perusahaan Jasa", "Akuntansi Perusahaan Dagang", "Manajemen"],
        "semester2": ["Koperasi", "Perekonomian Terbuka", "Neraca Pembayaran", "Kurs Valas"]
      },
      {
        "nama": "Sosiologi (Pilihan IPS)",
        "semester1": ["Perubahan Sosial", "Lembaga Sosial", "Penelitian Sosial"],
        "semester2": ["Globalisasi", "Masyarakat Multikultural", "Integrasi Sosial"]
      },
      {
        "nama": "Geografi (Pilihan IPS)",
        "semester1": ["Konsep Wilayah", "Perwilayahan", "Pembangunan"],
        "semester2": ["Peta Tematik", "Sistem Informasi Geografis", "Mitigasi Bencana"]
      },
      {
        "nama": "Antropologi (Pilihan IPS)",
        "semester1": ["Antropologi Forensik", "Antropologi Kesehatan", "Antropologi Urban"],
        "semester2": ["Etnisitas", "Dinamika Kebudayaan", "Globalisasi Budaya"]
      },
      {
        "nama": "Bahasa dan Sastra Indonesia (Pilihan Bahasa)",
        "semester1": ["Fonologi", "Morfologi", "Sintaksis"],
        "semester2": ["Semantik", "Sastra Banding", "Kritik Sastra Lanjut"]
      },
      {
        "nama": "Bahasa Jawa (Pilihan Bahasa)",
        "semester1": ["Paramasastra", "Kasusastraan Jawa", "Naskah Kuno"],
        "semester2": ["Upacara Adat", "Filsafat Jawa", "Wayang Kulit"]
      },
      {
        "nama": "Bahasa Mandarin (Pilihan Bahasa)",
        "semester1": ["Hanzi Lanjut", "Tata Bahasa Lanjut", "Membaca Teks Otentik"],
        "semester2": ["Menulis Esai", "Percakapan Formal", "Terjemahan"]
      },
      {
        "nama": "Bahasa Jepang (Pilihan Bahasa)",
        "semester1": ["Kanji Lanjut", "Tata Bahasa Lanjut", "Membaca Teks"],
        "semester2": ["Menulis", "Percakapan Formal", "Budaya Jepang"]
      },
      {
        "nama": "Bahasa Jerman (Pilihan Bahasa)",
        "semester1": ["Tata Bahasa Lanjut", "Membaca Teks", "Menulis Surat"],
        "semester2": ["Percakapan Formal", "Budaya Jerman", "Sastra Jerman"]
      },
      {
        "nama": "Prakarya dan Kewirausahaan (Pilihan Vokasi)",
        "semester1": ["Perencanaan Bisnis", "Produksi Massal", "Manajemen Usaha"],
        "semester2": ["Pemasaran Digital", "Laporan Keuangan", "Evaluasi Usaha"]
      },
      {
        "nama": "Muatan Lokal",
        "semester1": ["Bahasa Daerah", "Budaya Daerah"],
        "semester2": ["Keterampilan Daerah", "Adat Istiadat"]
      }
    ]
  }
};

// ========== DATA UNTUK OSN (PER JENJANG) ==========
const osnData = {
  "sd": {
    "mapel": [
      {
        "nama": "Matematika",
        "topik": [
          { "nama": "Bilangan", "sub": [] },
          { "nama": "Aritmatika", "sub": [] },
          { "nama": "Geometri", "sub": [] },
          { "nama": "Kombinatorik", "sub": [] },
          { "nama": "Statistika, data, dan pengukuran", "sub": [] }
        ]
      },
      {
        "nama": "Ilmu Pengetahuan Sosial (IPS)",
        "topik": [
          {
            "nama": "Penampakan Fenomena Alam Sosial dan Budaya",
            "sub": [
              "Peta",
              "Letak geografis Indonesia",
              "Keanekaragaman hayati",
              "Sumber Daya Alam",
              "Perubahan Wilayah",
              "Kenampakan Alam dan Sosial",
              "Gejala Alam",
              "Bentang Alam dan Kaitannya dengan profesi masyarakat"
            ]
          },
          {
            "nama": "Keragaman, Interaksi dan Perubahan Sosial",
            "sub": [
              "Nilai Sosial",
              "Nilai dan Norma",
              "Peran dan Tanggung Jawab Sosial",
              "Interaksi Sosial",
              "Proses Sosial",
              "Keragaman Sosial Budaya",
              "Globalisasi dan Perubahan Sosial"
            ]
          },
          {
            "nama": "Kegiatan Ekonomi, Peran dan Posisi Indonesia dalam Ekonomi Global",
            "sub": [
              "Masalah Ekonomi",
              "Nilai Guna",
              "Kegiatan Ekonomi Negara ASEAN dan Perannya Dalam Ekonomi Global",
              "Peran Pelaku Ekonomi Indonesia",
              "Kegiatan Ekspor-Impor",
              "Ekonomi Maritim dan Agraris",
              "Pembangunan Ekonomi Berkelanjutan"
            ]
          },
          {
            "nama": "Perkembangan Sejarah Indonesia",
            "sub": [
              "Pembentukan awal budaya Masyarakat Indonesia",
              "Perkembangan Hindu Budha",
              "Pengaruh Islam",
              "Kolonialisme dan imperialisme",
              "Perlawanan Masyarakat Indonesia terhadap Kolonialisme",
              "Perjuangan mencapai kemerdekaan",
              "Tokoh lokal dan Nasional dalam mencapai dan mempertahankan kemerdekaan"
            ]
          }
        ]
      },
      {
        "nama": "Ilmu Pengetahuan Alam (IPA)",
        "topik": [
          { "nama": "Isu Kesehatan Lingkungan dan Teknologi", "sub": [] },
          { "nama": "Ekologi, Lingkungan, dan Pelestarian Sumber Daya Alam", "sub": [] },
          { "nama": "Proses dan Mekanisme yang Terjadi pada Makhluk Hidup", "sub": [] },
          { "nama": "Bentuk Energi dan Perubahannya", "sub": [] },
          { "nama": "Listrik dan Magnet", "sub": [] },
          { "nama": "Gelombang dan Optik", "sub": [] },
          { "nama": "Bumi, Tata Surya, dan Antariksa", "sub": [] }
        ]
      }
    ]
  },
  "smp": {
    "mapel": [
      {
        "nama": "Matematika",
        "topik": [
          { "nama": "Bilangan", "sub": [] },
          { "nama": "Aritmatika", "sub": [] },
          { "nama": "Geometri", "sub": [] },
          { "nama": "Statistika, data, dan pengukuran", "sub": [] },
          { "nama": "Kombinatorik", "sub": [] }
        ]
      },
      {
        "nama": "Ilmu Pengetahuan Alam (IPA)",
        "topik": [
          { "nama": "Besaran, satuan, dan pengukuran", "sub": [] },
          { "nama": "Zat dan kalor", "sub": [] },
          { "nama": "Energi", "sub": [] },
          { "nama": "Gerak dan gaya", "sub": [] },
          { "nama": "Fluida", "sub": [] },
          { "nama": "Getaran, gelombang, dan bunyi", "sub": [] },
          { "nama": "Cahaya dan optika", "sub": [] },
          { "nama": "Kelistrikan dan kemagnetan", "sub": [] },
          { "nama": "Ilmu pengetahuan bumi dan antariksa (IPBA)", "sub": [] },
          { "nama": "Makhluk hidup dan lingkungannya", "sub": [] },
          { "nama": "Keanekaragaman dan pengelompokan makhluk hidup", "sub": [] },
          { "nama": "Organisasi kehidupan", "sub": [] },
          { "nama": "Ekologi", "sub": [] },
          { "nama": "Struktur dan fungsi tumbuhan", "sub": [] },
          { "nama": "Sistem-sistem pada manusia dan hewan", "sub": [] },
          { "nama": "Pewarisan sifat", "sub": [] },
          { "nama": "Bioteknologi", "sub": [] },
          { "nama": "Forensik", "sub": [] }
        ]
      },
      {
        "nama": "Ilmu Pengetahuan Sosial (IPS)",
        "topik": [
          {
            "nama": "Geografi",
            "sub": [
              "Menganalisis interaksi antar-ruang dan wilayah (potensi daerah dan kondisi geografis)",
              "Pengaruh perubahan keruangan akibat faktor alam dan manusia",
              "Perubahan keruangan di Asia dan sekitarnya"
            ]
          },
          {
            "nama": "Sosiologi",
            "sub": [
              "Kelembagaan sosial",
              "Interaksi sosial",
              "Penyimpangan sosial",
              "Mobilitas sosial",
              "Pluralitas, konflik, dan integrasi sosial",
              "Pemberdayaan masyarakat"
            ]
          },
          {
            "nama": "Sejarah",
            "sub": [
              "Perubahan masyarakat pada masa pra-aksara, Hindu Budha, Islam, dalam bidang sosial, ekonomi, politik",
              "Perubahan dan kesinambungan ruang dari masa kemerdekaan sampai awal reformasi",
              "Mengevaluasi perubahan dan kesinambungan dari masa penjajahan sampai tumbuhnya semangat kebangsaan"
            ]
          },
          {
            "nama": "Ekonomi",
            "sub": [
              "Pemenuhan kebutuhan manusia",
              "Peran pelaku ekonomi",
              "Kegiatan perekonomian",
              "Pembangunan ekonomi"
            ]
          }
        ]
      }
    ]
  },
  "sma": {
    "mapel": [
      {
        "nama": "Informatika",
        "topik": [
          { "nama": "Dasar-dasar Pemrograman", "sub": [] },
          { "nama": "Operasi Logika dan Bitwise", "sub": [] },
          { "nama": "Aritmetika", "sub": [] },
          { "nama": "Aturan Berhitung", "sub": [] },
          { "nama": "Rekursi", "sub": [] },
          { "nama": "Pencarian dan Pengurutan", "sub": [] },
          { "nama": "Strategi Pemecahan Masalah", "sub": [] },
          { "nama": "Struktur Data", "sub": [] },
          { "nama": "Graf dan Tree", "sub": [] },
          { "nama": "Geometri Dasar", "sub": [] }
        ]
      },
      {
        "nama": "Geografi",
        "topik": [
          { "nama": "Iklim dan Perubahan Iklim", "sub": [] },
          { "nama": "Kebencanaan dan Manajemen Bencana", "sub": [] },
          { "nama": "Sumber Daya dan Manajemen Sumber Daya", "sub": [] },
          { "nama": "Geografi Lingkungan dan Pembangunan Berkelanjutan", "sub": [] },
          { "nama": "Geologi, Geomorfologi, dan Penggunaan Lahan", "sub": [] },
          { "nama": "Geografi Pertanian dan Permasalahan Pangan", "sub": [] },
          { "nama": "Kependudukan dan Dinamika Penduduk", "sub": [] },
          { "nama": "Geografi Ekonomi dan Globalisasi", "sub": [] },
          { "nama": "Geografi Pembangunan dan Ketimpangan Spasial", "sub": [] },
          { "nama": "Geografi Kota, Peremajaan Kota, dan Perencanaan Kota", "sub": [] },
          { "nama": "Pariwisata dan Manajemen Pariwisata", "sub": [] },
          { "nama": "Geografi Budaya dan Identitas Regional", "sub": [] },
          { "nama": "Perpetaan dan Interpretasi Informasi Geospasial", "sub": [] }
        ]
      },
      {
        "nama": "Fisika",
        "topik": [
          { "nama": "Kinematika", "sub": [] },
          { "nama": "Dinamika Linier", "sub": [] },
          { "nama": "Dinamika Rotasi", "sub": [] },
          { "nama": "Gravitasi", "sub": [] },
          { "nama": "Listrik Magnet", "sub": [] },
          { "nama": "Termofisika", "sub": [] }
        ]
      },
      {
        "nama": "Ekonomi",
        "topik": [
          { "nama": "Kebijakan moneter dan fiskal", "sub": [] },
          { "nama": "Data ekonomi makro", "sub": [] },
          { "nama": "Mata uang, serikat mata uang, nilai tukar, dan paritas suku bunga", "sub": [] },
          { "nama": "Ekonomi lingkungan dan pembangunan berkelanjutan", "sub": [] },
          { "nama": "Fluktuasi dan krisis ekonomi", "sub": [] },
          { "nama": "Institusi dan ketidaksetaraan", "sub": [] }
        ]
      },
      {
        "nama": "Biologi",
        "topik": [
          { "nama": "Biologi sel dan molekuler", "sub": [] },
          { "nama": "Anatomi dan Fisiologi Tumbuhan", "sub": [] },
          { "nama": "Anatomi dan Fisiologi Hewan", "sub": [] },
          { "nama": "Genetika dan Evolusi", "sub": [] },
          { "nama": "Etologi", "sub": [] },
          { "nama": "Ekologi", "sub": [] },
          { "nama": "Biosistematika", "sub": [] }
        ]
      },
      {
        "nama": "Astronomi",
        "topik": [
          { "nama": "Astrofisika Dasar", "sub": [] },
          { "nama": "Tata Surya", "sub": [] },
          { "nama": "Penerapan Sistem Koordinat, Estimasi", "sub": [] },
          { "nama": "Statistik dan Identifikasi Sumber Galat", "sub": [] }
        ]
      },
      {
        "nama": "Kebumian",
        "topik": [
          { "nama": "Bumi sebagai Sistem yang Dinamis", "sub": [] },
          { "nama": "Identifikasi dan Analisis Sistem Bumi", "sub": [] },
          { "nama": "Interaksi dan Siklus dalam Sistem Bumi", "sub": [] }
        ]
      },
      {
        "nama": "Kimia",
        "topik": [
          { "nama": "Sintesis senyawa organik dan kompleks", "sub": [] },
          { "nama": "Analisis kualitatif ion dan senyawa organik", "sub": [] },
          { "nama": "Struktur glukosa dan fruktosa", "sub": [] },
          { "nama": "Sintesis organik multilangkah sederhana", "sub": [] }
        ]
      },
      {
        "nama": "Matematika",
        "topik": [
          { "nama": "Aljabar", "sub": [] },
          { "nama": "Geometri", "sub": [] },
          { "nama": "Kombinatorika", "sub": [] },
          { "nama": "Teori Bilangan", "sub": [] }
        ]
      }
    ]
  }
};

// ========== DATA UNTUK TKA (tetap) ==========
const mapelByJenjangTKA = {
    'SD': ['Matematika', 'Bahasa Indonesia'],
    'SMP': ['Matematika', 'Bahasa Indonesia'],
    'SMA': ['Matematika', 'Bahasa Indonesia', 'Bahasa Inggris']
};

const elemenTKA = {
    'SD-Matematika': ['Bilangan', 'Geometri dan Pengukuran', 'Data'],
    'SD-Bahasa Indonesia': ['Teks Informasi', 'Teks Fiksi'],
    'SMP-Matematika': ['Bilangan', 'Aljabar', 'Geometri dan Pengukuran', 'Data dan Peluang'],
    'SMP-Bahasa Indonesia': ['Teks Informasi', 'Teks Fiksi'],
    'SMA-Matematika': ['Bilangan', 'Aljabar', 'Geometri dan Pengukuran', 'Data dan Peluang', 'Trigonometri'],
    'SMA-Bahasa Indonesia': ['Teks Informasi', 'Teks Fiksi'],
    'SMA-Bahasa Inggris': ['Teks B1', 'Teks A2']
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
const btnHome = document.getElementById('btnHome');
const btnRedo = document.getElementById('btnRedo');
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

// ========== FUNGSI BANTU ==========
function getJenjangFromKelas(kelas) {
    if (kelas === 'SD' || kelas === 'SMP' || kelas === 'SMA') return kelas;
    const kelasNum = parseInt(kelas);
    if (kelasNum <= 6) return 'SD';
    else if (kelasNum <= 9) return 'SMP';
    else return 'SMA';
}

// ========== FUNGSI DROPDOWN DINAMIS ==========
function updateKelasOptions() {
    const jenis = jenisSelect.value;
    if (!jenis) {
        kelasSelect.innerHTML = '<option value="">-- Pilih Jenis Ujian Dahulu --</option>';
        return;
    }
    
    let options = [];
    if (jenis === 'OSN') {
        // Untuk OSN hanya menampilkan jenjang
        options = [
            { value: 'SD', label: 'SD' },
            { value: 'SMP', label: 'SMP' },
            { value: 'SMA', label: 'SMA' }
        ];
    } else if (jenis === 'TKA') {
        options = [
            { value: 'SD', label: 'SD' },
            { value: 'SMP', label: 'SMP' },
            { value: 'SMA', label: 'SMA' }
        ];
    } else {
        // Harian & UAS menggunakan kelas angka
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
    
    let mapelList = [];
    
    if (jenis === 'OSN') {
        // Ambil dari osnData berdasarkan jenjang (kelas sudah berupa 'SD','SMP','SMA' - kita lower case)
        const jenjang = kelas.toLowerCase();
        const data = osnData[jenjang];
        if (data && data.mapel) {
            mapelList = data.mapel.map(m => m.nama);
        }
    } else if (jenis === 'TKA') {
        const jenjang = kelas; // karena untuk TKA kelas bisa 'SD','SMP','SMA'
        mapelList = mapelByJenjangTKA[jenjang] || [];
    } else {
        // Harian atau UAS: ambil dari dropdownData
        const kelasData = dropdownData[kelas];
        if (kelasData && kelasData.mapel) {
            mapelList = kelasData.mapel.map(m => {
                // Bersihkan nama, misal "Bahasa Inggris (pilihan)" -> "Bahasa Inggris"
                let nama = m.nama;
                nama = nama.replace(/\s*\([^)]*\)/g, '').trim();
                return nama;
            });
            mapelList = [...new Set(mapelList)];
        }
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
    
    // Untuk OSN, tidak perlu dropdown materi
    if (jenis === 'OSN') {
        materiGroup.style.display = 'none';
        materiSelect.value = '';
        return;
    }
    
    // Untuk TKA, sembunyikan materi
    if (jenis === 'TKA') {
        materiGroup.style.display = 'none';
        materiSelect.value = '';
        return;
    }
    
    // Untuk UAS, sembunyikan materi
    if (jenis === 'UAS') {
        materiGroup.style.display = 'none';
        materiSelect.value = '';
        return;
    }
    
    // Untuk Harian, tampilkan materi dari dropdownData
    if (jenis === 'Harian' && kelas && mapel) {
        const kelasData = dropdownData[kelas];
        if (kelasData && kelasData.mapel) {
            const mapelObj = kelasData.mapel.find(m => {
                const clean = m.nama.replace(/\s*\([^)]*\)/g, '').trim();
                return clean === mapel;
            });
            if (mapelObj) {
                const materiGabungan = [];
                if (mapelObj.semester1) materiGabungan.push(...mapelObj.semester1);
                if (mapelObj.semester2) materiGabungan.push(...mapelObj.semester2);
                const materiUnik = [...new Set(materiGabungan)];
                
                if (materiUnik.length > 0) {
                    materiGroup.style.display = 'block';
                    materiSelect.innerHTML = '<option value="">-- Pilih Materi --</option>';
                    materiUnik.forEach(m => {
                        const option = document.createElement('option');
                        option.value = m;
                        option.textContent = m;
                        materiSelect.appendChild(option);
                    });
                    return;
                }
            }
        }
    }
    
    materiGroup.style.display = 'none';
    materiSelect.value = '';
}

function toggleSemesterOptions() {
    // Semester hanya untuk UAS
    if (jenisSelect.value === 'UAS') {
        semesterGroup.style.display = 'block';
    } else {
        semesterGroup.style.display = 'none';
    }
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

btnHome.addEventListener('click', () => {
    soalSection.style.display = 'none';
    document.querySelector('.filter-section').scrollIntoView({ behavior: 'smooth' });
    btnCekSemua.style.display = 'none';
    btnExportPDF.style.display = 'inline-flex';
    btnSelesai.style.display = 'inline-flex';
    btnHome.style.display = 'none';
    btnRedo.style.display = 'none';
});

btnRedo.addEventListener('click', () => {
    generateSoal({
        kelas: kelasSelect.value,
        mapel: mapelSelect.value,
        jenis: jenisSelect.value,
        jumlah: jumlahInput.value,
        materi: materiSelect.value || '',
        semester: semesterSelect.value || '',
        nama_user: namaUserInput.value.trim(),
        tingkatKesulitan: tingkatKesulitanSelect.value || 'Sedang'
    });
    btnCekSemua.style.display = 'none';
    btnExportPDF.style.display = 'inline-flex';
    btnSelesai.style.display = 'inline-flex';
    btnHome.style.display = 'none';
    btnRedo.style.display = 'none';
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
    // Untuk Harian, materi wajib dipilih
    if (jenisSelect.value === 'Harian' && !materiSelect.value) {
        showNotification('❌ Materi untuk Ulangan Harian belum dipilih!', 'error');
        materiSelect.focus();
        return false;
    }
    // Untuk UAS, semester wajib dipilih
    if (jenisSelect.value === 'UAS' && !semesterSelect.value) {
        showNotification('❌ Semester untuk UAS belum dipilih!', 'error');
        semesterSelect.focus();
        return false;
    }
    // OSN dan TKA tidak perlu validasi materi
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

    // Untuk OSN, kumpulkan semua topik dari mapel yang dipilih
    if (jenis === 'OSN') {
        const jenjang = kelas.toLowerCase(); // kelas berisi 'SD','SMP','SMA'
        const data = osnData[jenjang];
        if (data && data.mapel) {
            const mapelObj = data.mapel.find(m => m.nama === mapel);
            if (mapelObj && mapelObj.topik) {
                // Gabungkan semua topik, dan sub topik jika ada
                const semuaTopik = mapelObj.topik.map(t => {
                    if (t.sub && t.sub.length > 0) {
                        return `${t.nama} (${t.sub.join(', ')})`;
                    } else {
                        return t.nama;
                    }
                });
                materi = semuaTopik.join('; ');
            }
        }
    }

    // Untuk TKA, materi diisi dengan elemen yang sesuai
    if (jenis === 'TKA') {
        const jenjang = kelas; // karena untuk TKA kelas bisa 'SD','SMP','SMA'
        const key = jenjang + '-' + mapel;
        const elemenList = elemenTKA[key] || [];
        materi = elemenList.join(', ');
    }
    
    // Untuk UAS, kumpulkan semua materi dari semester yang dipilih
    if (jenis === 'UAS') {
        const kelasData = dropdownData[kelas];
        if (kelasData && kelasData.mapel) {
            const mapelObj = kelasData.mapel.find(m => {
                const clean = m.nama.replace(/\s*\([^)]*\)/g, '').trim();
                return clean === mapel;
            });
            if (mapelObj) {
                const semesterKey = semester === '1' ? 'semester1' : 'semester2';
                const materiList = mapelObj[semesterKey] || [];
                materi = materiList.join(', ');
            }
        }
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
            btnCekSemua.style.display = 'none';
            btnExportPDF.style.display = 'inline-flex';
            btnSelesai.style.display = 'inline-flex';
            btnHome.style.display = 'none';
            btnRedo.style.display = 'none';
            let msg = '🤖 Soal digenerate dengan AI';
            if (materi) msg += ' - Materi: ' + (materi.length > 50 ? materi.substring(0,50)+'...' : materi);
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
        btnGenerate.innerHTML = '🚀 Mulai Latihan';
    }
}

function handleError(data) {
    if (data.error) {
        if (data.error.includes('429')) showNotification('⚠️ Server sibuk. Tunggu 1-2 menit.', 'warning');
        else if (data.error.includes('API Key')) showNotification('🔑 Konfigurasi API bermasalah.', 'error');
        else showNotification('Error: ' + data.error, 'error');
    } else showNotification('Terjadi kesalahan tak dikenal', 'error');
}

// ========== FUNGSI CLEAN LATEX (DENGAN PERBAIKAN SPASI) ==========
function cleanLatex(text) {
    if (!text) return text;
    
    // --- PERBAIKAN TAMBAHAN UNTUK SPASI DAN KARAKTER ---
    text = text.replace(/\\/g, '');
    text = text.replace(/speeda/g, 'sepeda');
    text = text.replace(/kecepataan/g, 'kecepatan');
    text = text.replace(/awaInya/g, 'awalnya');
    text = text.replace(/\.([A-Za-z])/g, '. $1');
    text = text.replace(/\,([A-Za-z])/g, ', $1');
    text = text.replace(/([a-zA-Z])(\d)/g, '$1 $2');
    text = text.replace(/(\d)([a-zA-Z])/g, '$1 $2');
    text = text.replace(/(\d)(km|jam|cm|liter|menit|m|kg|g)/gi, '$1 $2');
    text = text.replace(/(km|jam|cm|liter|menit|m|kg|g)([a-zA-Z])/gi, '$1 $2');
    
    const commonWords = [
        'sebuah', 'mobil', 'motor', 'sepeda', 'melaju', 'dengan', 'kecepatan', 'rata-rata', 'rata', 
        'jarak', 'waktu', 'dalam', 'menempuh', 'berapakah', 'tentukan', 'nilai', 'hasil', 'volume', 
        'luas', 'panjang', 'lebar', 'tinggi', 'debit', 'liter', 'menit', 'jam', 'km', 'cm', 'persegi', 
        'segitiga', 'lingkaran', 'tabung', 'balok', 'kubus', 'prisma', 'kerucut', 'bola', 'diameter', 
        'jari-jari', 'alas', 'sisi', 'rusuk', 'titik', 'garis', 'sudut', 'bak', 'mandi', 'air', 'diisi', 
        'penuh', 'dari', 'untuk', 'pada', 'oleh', 'atau', 'karena', 'maka', 'tersebut', 'adalah', 
        'merupakan', 'memiliki', 'dibutuhkan', 'waktu', 'yang', 'untuk', 'dengan', 'kecepa', 'tan'
    ];
    commonWords.sort((a, b) => b.length - a.length);
    commonWords.forEach(word => {
        let regex = new RegExp('([a-zA-Z0-9])(' + word + ')', 'gi');
        text = text.replace(regex, '$1 $2');
        regex = new RegExp('(' + word + ')([a-zA-Z0-9])', 'gi');
        text = text.replace(regex, '$1 $2');
    });
    
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
        let pilihan = soal.pilihan;
        
        if (!Array.isArray(pilihan) || pilihan.length < 4) {
            pilihan = ['A. Pilihan A', 'B. Pilihan B', 'C. Pilihan C', 'D. Pilihan D'];
        }
        
        if (pilihan[0].includes('Pilihan A') && pilihan[1].includes('Pilihan B')) {
            const base = (i + 1) * 10;
            pilihan = [
                `A. ${base}`,
                `B. ${base + 10}`,
                `C. ${base + 20}`,
                `D. ${base + 30}`
            ];
        }
        
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
        tanggal: new Date().toISOString(),
        timestamp: Date.now() // <-- Tambahkan timestamp untuk kadaluarsa
    };
    
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
    
    btnCekSemua.style.display = 'none';
    btnExportPDF.style.display = 'none';
    btnSelesai.style.display = 'none';
    btnHome.style.display = 'inline-flex';
    btnRedo.style.display = 'inline-flex';
    
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

    // Filter data yang masih fresh (kurang dari 1 jam)
    const now = Date.now();
    const oneHour = 3600000; // 1 jam dalam milidetik
    const freshPending = pending.filter(item => item.timestamp && (now - item.timestamp < oneHour));
    
    // Jika ada data yang kadaluarsa, hapus dari localStorage
    if (freshPending.length !== pending.length) {
        localStorage.setItem('bankSoalBackup', JSON.stringify(freshPending));
        pending = freshPending;
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
            const payload = {
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
            };
            const response = await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload)
            });
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
    
    await loadHistory();
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