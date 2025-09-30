const newsData = [
  {
    id: 1,
    title: "Teknologi AI Terbaru Merevolusi Dunia Medis di Indonesia",
    description: "Sebuah startup lokal berhasil mengembangkan AI yang dapat mendeteksi penyakit dini dengan akurasi tinggi, membawa harapan baru bagi sektor kesehatan.",
    author: "Budi Santoso",
    created_at: "2025-09-20T10:00:00.000Z",
    updated_at: "2025-09-20T11:30:00.000Z"
  },
  {
    id: 2,
    title: "Timnas Indonesia Siap Hadapi Laga Kualifikasi Piala Dunia",
    description: "Pelatih kepala mengumumkan 23 pemain yang akan dibawa untuk pertandingan krusial melawan timnas Vietnam bulan depan.",
    author: "Anisa Putri",
    created_at: "2025-09-20T09:15:00.000Z",
    updated_at: "2025-09-20T09:15:00.000Z"
  },
  {
    id: 3,
    title: "Pemerintah Umumkan Kebijakan Ekonomi Baru untuk UMKM",
    description: "Paket stimulus baru diluncurkan untuk membantu Usaha Mikro, Kecil, dan Menengah (UMKM) bertahan di tengah tantangan ekonomi global.",
    author: "Joko Prasetyo",
    created_at: "2025-09-19T17:00:00.000Z",
    updated_at: "2025-09-20T08:00:00.000Z"
  },
  {
    id: 4,
    title: "Harga Bahan Pokok di Jakarta Mulai Stabil",
    description: "Setelah mengalami fluktuasi, harga beberapa komoditas pangan utama seperti beras dan minyak goreng dilaporkan stabil.",
    author: "Siti Rahmawati",
    created_at: "2025-09-19T14:20:00.000Z",
    updated_at: "2025-09-19T14:20:00.000Z"
  },
  {
    id: 5,
    title: "Festival Kuliner Nusantara Kembali Digelar di Monas",
    description: "Acara tahunan ini akan menampilkan lebih dari 100 jenis makanan khas dari seluruh penjuru Indonesia selama akhir pekan ini.",
    author: "Budi Santoso",
    created_at: "2025-09-19T11:05:00.000Z",
    updated_at: "2025-09-19T12:00:00.000Z"
  },
  {
    id: 6,
    title: "Konstruksi Ibu Kota Nusantara (IKN) Capai 70%",
    description: "Pembangunan infrastruktur utama di IKN, termasuk Istana Kepresidenan dan kantor kementerian, telah mencapai progres yang signifikan.",
    author: "Joko Prasetyo",
    created_at: "2025-09-18T20:00:00.000Z",
    updated_at: "2025-09-19T09:00:00.000Z"
  },
  {
    id: 7,
    title: "Peluncuran Satelit SATRIA-2 Sukses Dilaksanakan",
    description: "Satelit komunikasi terbaru milik Indonesia berhasil mengorbit, diharapkan dapat meningkatkan konektivitas internet di daerah terpencil.",
    author: "Anisa Putri",
    created_at: "2025-09-18T15:45:00.000Z",
    updated_at: "2025-09-18T15:45:00.000Z"
  },
  {
    id: 8,
    title: "Tips Jitu Menjaga Kesehatan Mental di Tengah Kesibukan",
    description: "Psikolog membagikan lima cara sederhana untuk mengelola stres dan menjaga kesejahteraan mental saat menghadapi tuntutan pekerjaan.",
    author: "Siti Rahmawati",
    created_at: "2025-09-18T11:00:00.000Z",
    updated_at: "2025-09-18T11:00:00.000Z"
  },
  {
    id: 9,
    title: "Pasar Saham Menguat Didorong Sektor Perbankan",
    description: "Indeks Harga Saham Gabungan (IHSG) ditutup di zona hijau berkat kinerja positif dari saham-saham perbankan besar.",
    author: "Eko Wibowo",
    created_at: "2025-09-17T18:00:00.000Z",
    updated_at: "2025-09-17T18:30:00.000Z"
  },
  {
    id: 10,
    title: "Persebaya Surabaya Menang Tipis di Kandang Lawan",
    description: "Gol tunggal di menit akhir pertandingan memastikan kemenangan penting bagi tim Bajul Ijo dalam lanjutan kompetisi Liga 1.",
    author: "Anisa Putri",
    created_at: "2025-09-17T14:00:00.000Z",
    updated_at: "2025-09-17T14:00:00.000Z"
  },
  {
    id: 11,
    title: "Mobil Listrik Buatan Lokal Siap Mengaspal Tahun Depan",
    description: "Prototipe mobil listrik hasil karya anak bangsa telah lulus uji coba dan dijadwalkan akan diproduksi massal pada kuartal kedua tahun depan.",
    author: "Budi Santoso",
    created_at: "2025-09-16T16:25:00.000Z",
    updated_at: "2025-09-17T10:10:00.000Z"
  },
  {
    id: 12,
    title: "Cuaca Ekstrem Diperkirakan Melanda Sebagian Wilayah Jawa",
    description: "BMKG mengeluarkan peringatan dini terkait potensi hujan lebat dan angin kencang yang akan melanda beberapa kota besar.",
    author: "Siti Rahmawati",
    created_at: "2025-09-16T13:00:00.000Z",
    updated_at: "2025-09-16T13:00:00.000Z"
  },
  {
    id: 13,
    title: "Rahasia Membuat Kopi Susu Gula Aren Seenak di Kafe",
    description: "Seorang barista profesional membagikan resep dan teknik untuk meracik es kopi susu gula aren yang sempurna di rumah.",
    author: "Eko Wibowo",
    created_at: "2025-09-15T19:00:00.000Z",
    updated_at: "2025-09-15T19:00:00.000Z"
  },
  {
    id: 14,
    title: "Startup Edukasi Raih Pendanaan Seri A Sebesar $5 Juta",
    description: "Platform pembelajaran online 'PintarBareng' mendapatkan suntikan dana segar untuk ekspansi pasar ke Asia Tenggara.",
    author: "Joko Prasetyo",
    created_at: "2025-09-15T12:30:00.000Z",
    updated_at: "2025-09-15T14:00:00.000Z"
  },
  {
    id: 15,
    title: "Borobudur Menjadi Tuan Rumah Konferensi Warisan Dunia",
    description: "Para delegasi dari 50 negara akan berkumpul di Candi Borobudur untuk membahas strategi pelestarian situs warisan dunia.",
    author: "Anisa Putri",
    created_at: "2025-09-14T17:00:00.000Z",
    updated_at: "2025-09-14T17:00:00.000Z"
  }
];

// Jangan lupa diekspor jika disimpan di file terpisah
module.exports = newsData;