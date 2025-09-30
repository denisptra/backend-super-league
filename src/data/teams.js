const teams = [
  {
    id: 1,
    name: "Persija Jakarta",
    short_name: "PSJ",
    image:
      "https://ik.imagekit.io/lq6i4t8an/Teams/persija.png?updatedAt=1759125016090",
    description:
      "Persija Jakarta adalah klub sepak bola profesional yang berbasis di Jakarta, Indonesia. Didirikan pada tahun 1928, Persija merupakan salah satu klub tertua dan paling sukses di Indonesia. Klub ini memiliki julukan 'Macan Kemayoran' dan didukung oleh kelompok suporter fanatik yang disebut 'The Jakmania'. Kandang mereka adalah Stadion Utama Gelora Bung Karno. Persija memiliki rivalitas yang sangat sengit dengan Persib Bandung, yang dikenal sebagai salah satu derby terpanas di Asia.",
    stats: { played: 5, win: 4, draw: 1, loss: 0, points: 13 },
  },
  {
    id: 2,
    name: "Persib Bandung",
    short_name: "PSB",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/persib.png?updatedAt=1759125015938",
    description:
      "Persib Bandung adalah klub sepak bola profesional yang berbasis di Bandung, Jawa Barat, Indonesia. Didirikan pada tahun 1933, Persib telah menjadi salah satu klub paling sukses di Indonesia dengan banyak gelar juara di tingkat nasional. Klub ini dikenal dengan julukan 'Maung Bandung' dan memiliki basis penggemar yang besar dan setia yang dikenal sebagai 'Bobotoh'. Persib bermain di Stadion Gelora Bandung Lautan Api (GBLA).",
    stats: { played: 5, win: 3, draw: 1, loss: 1, points: 10 },
  },
  {
    id: 3,
    name: "Borneo Samarinda",
    short_name: "BOR",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/borneo.png?updatedAt=1759125015874",
    description:
      "Borneo FC Samarinda adalah klub sepak bola profesional yang berbasis di Samarinda, Kalimantan Timur. Klub yang didirikan pada tahun 2014 ini dengan cepat menjadi kekuatan di liga teratas Indonesia. Mereka dijuluki 'Pesut Etam' dan memainkan pertandingan kandang mereka di Stadion Segiri. Warna kebesaran klub adalah oranye.",
    stats: { played: 5, win: 3, draw: 2, loss: 0, points: 11 },
  },
  {
    id: 4,
    name: "Arema Malang",
    short_name: "ARM",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/arema.png?updatedAt=1759125015945",
    description:
      "Arema FC adalah klub sepak bola populer yang berasal dari Malang, Jawa Timur. Didirikan pada tahun 1987, klub ini memiliki julukan 'Singo Edan'. Arema dikenal memiliki basis suporter yang sangat militan, yang disebut Aremania. Mereka telah memenangkan beberapa trofi domestik dan memiliki sejarah panjang di kancah sepak bola Indonesia.",
    stats: { played: 5, win: 2, draw: 2, loss: 1, points: 8 },
  },
  {
    id: 5,
    name: "PSIM Yogyakarta",
    short_name: "PSY",
    image:
      "https://ik.imagekit.io/lq6i4t8an/Teams/psim.png?updatedAt=1759125016005",
    description:
      "PSIM Yogyakarta adalah klub sepak bola bersejarah yang berbasis di Yogyakarta. Didirikan pada tahun 1929, PSIM adalah salah satu klub pendiri PSSI. Klub ini dijuluki 'Laskar Mataram' dan memiliki suporter setia. Mereka memainkan pertandingan kandang di Stadion Mandala Krida dan identik dengan warna biru.",
    stats: { played: 5, win: 2, draw: 1, loss: 2, points: 7 },
  },
  {
    id: 6,
    name: "Persebaya Surabaya",
    short_name: "PBY",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/persebaya.png?updatedAt=1759125016023",
    description:
      "Persebaya Surabaya adalah klub sepak bola yang berbasis di Surabaya, Jawa Timur, dan didirikan pada tahun 1927. Dikenal dengan julukan 'Bajul Ijo', Persebaya adalah salah satu klub paling ikonik di Indonesia dengan sejarah prestasi yang kaya. Suporter mereka, yang disebut 'Bonek', terkenal dengan loyalitas dan semangatnya. Kandang mereka adalah Stadion Gelora Bung Tomo.",
    stats: { played: 5, win: 3, draw: 0, loss: 2, points: 9 },
  },
  {
    id: 7,
    name: "Bali United FC",
    short_name: "BLU",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/bali_utd.png?updatedAt=1759125015878",
    description:
      "Bali United FC adalah klub sepak bola profesional yang berbasis di Gianyar, Bali. Meskipun relatif baru, klub ini telah meraih kesuksesan besar, termasuk menjuarai Liga 1 Indonesia. Mereka dijuluki 'Serdadu Tridatu' dan bermain di Stadion Kapten I Wayan Dipta. Bali United dikenal dengan manajemen profesional dan basis penggemar yang terus berkembang.",
    stats: { played: 5, win: 4, draw: 0, loss: 1, points: 12 },
  },
  {
    id: 8,
    name: "Malut United",
    short_name: "MLU",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/malut_utd.png?updatedAt=1759125015851",
    description:
      "Malut United FC adalah klub sepak bola yang mewakili wilayah Maluku Utara. Klub ini merupakan pendatang baru yang ambisius di kancah sepak bola Indonesia, dengan tujuan untuk membawa kebanggaan bagi masyarakat Maluku Utara. Mereka terus membangun kekuatan tim untuk bersaing di level tertinggi.",
    stats: { played: 5, win: 1, draw: 3, loss: 1, points: 6 },
  },
  {
    id: 9,
    name: "Persijap Jepara",
    short_name: "PJP",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/persijap.png?updatedAt=1759125015989",
    description:
      "Persijap Jepara adalah klub sepak bola yang berbasis di Jepara, Jawa Tengah. Didirikan pada tahun 1954, klub ini memiliki julukan 'Laskar Kalinyamat'. Persijap memiliki sejarah panjang berkompetisi di berbagai level liga Indonesia dan didukung oleh kelompok suporter setianya.",
    stats: { played: 5, win: 1, draw: 2, loss: 2, points: 5 },
  },
  {
    id: 10,
    name: "Bhayangkara FC",
    short_name: "BFC",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/bhayangkara.png?updatedAt=1759125015930",
    description:
      "Bhayangkara FC adalah klub sepak bola yang dimiliki oleh Kepolisian Negara Republik Indonesia. Klub ini pernah menjuarai Liga 1 Indonesia dan dikenal dengan julukan 'The Guardian'. Mereka bertujuan untuk menjadi salah satu klub papan atas di Indonesia sambil mewakili institusi Polri.",
    stats: { played: 5, win: 2, draw: 2, loss: 1, points: 8 },
  },
  {
    id: 11,
    name: "Madura United",
    short_name: "MDU",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/madura_utd.png?updatedAt=1759125015842",
    description:
      "Madura United FC adalah klub sepak bola yang berbasis di Pulau Madura, Jawa Timur. Klub ini dikenal dengan julukan 'Laskar Sape Kerrab' dan memiliki basis suporter yang kuat di Madura. Warna kebesaran mereka adalah merah dan putih bergaris.",
    stats: { played: 5, win: 3, draw: 1, loss: 1, points: 10 },
  },
  {
    id: 12,
    name: "Persis Solo",
    short_name: "PSS",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/persis.png?updatedAt=1759125015866",
    description:
      "Persis Solo adalah klub sepak bola bersejarah dari kota Surakarta (Solo), Jawa Tengah, yang didirikan pada tahun 1923. Dijuluki 'Laskar Sambernyawa', Persis memiliki sejarah panjang dan basis suporter yang sangat fanatik. Klub ini kembali ke kasta tertinggi sepak bola Indonesia dengan ambisi besar.",
    stats: { played: 5, win: 2, draw: 3, loss: 0, points: 9 },
  },
  {
    id: 13,
    name: "Persik Kediri",
    short_name: "PSK",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/persik.png?updatedAt=1759125015941",
    description:
      "Persik Kediri adalah klub sepak bola yang berbasis di Kediri, Jawa Timur. Klub yang dijuluki 'Macan Putih' ini memiliki sejarah gemilang, termasuk pernah menjadi juara Liga Indonesia. Persik dikenal dengan permainan solid dan dukungan penuh dari suporter mereka, Persikmania.",
    stats: { played: 5, win: 2, draw: 0, loss: 3, points: 6 },
  },
  {
    id: 14,
    name: "Semen Padang",
    short_name: "SPD",
    image:
      "https://ik.imagekit.io/lq6i4t8an/Teams/semen_padang.png?updatedAt=1759125016011",
    description:
      "Semen Padang FC adalah klub sepak bola yang berbasis di Padang, Sumatera Barat. Didukung oleh perusahaan semen PT Semen Padang, klub ini dijuluki 'Kabau Sirah'. Mereka memiliki sejarah prestasi yang baik di tingkat nasional maupun regional.",
    stats: { played: 5, win: 1, draw: 1, loss: 3, points: 4 },
  },
  {
    id: 15,
    name: "PSM Makassar",
    short_name: "PSM",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/psm.png?updatedAt=1759125015909",
    description:
      "PSM Makassar adalah klub sepak bola yang berbasis di Makassar, Sulawesi Selatan. Didirikan pada tahun 1915, PSM adalah klub tertua di Indonesia dan salah satu yang paling sukses. Mereka dijuluki 'Juku Eja' dan terkenal dengan gaya permainan yang keras dan tanpa kompromi.",
    stats: { played: 5, win: 4, draw: 0, loss: 1, points: 12 },
  },
  {
    id: 16,
    name: "Dewa United FC",
    short_name: "DWU",
    image:
      "https://ik.imagekit.io/lq6i4t8an/Teams/dewa_utd.png?updatedAt=1759125015977",
    description:
      "Dewa United FC adalah klub sepak bola profesional yang berbasis di Tangerang Selatan, Banten. Klub ini tergolong baru namun menunjukkan ambisi besar untuk bersaing di level teratas sepak bola Indonesia dengan merekrut pemain-pemain berkualitas.",
    stats: { played: 5, win: 1, draw: 2, loss: 2, points: 5 },
  },
  {
    id: 17,
    name: "PSBS Biak Numfor",
    short_name: "PSBS",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/psbs.png?updatedAt=1759125015856",
    description:
      "PSBS Biak Numfor adalah klub sepak bola yang berasal dari Biak, Papua. Dijuluki 'Cendrawasih Kuning', PSBS mewakili semangat dan bakat sepak bola dari wilayah timur Indonesia. Mereka berjuang untuk menunjukkan kekuatan Papua di panggung nasional.",
    stats: { played: 5, win: 0, draw: 2, loss: 3, points: 2 },
  },
  {
    id: 18,
    name: "Persita Tangerang",
    short_name: "PST",
    image: "https://ik.imagekit.io/lq6i4t8an/Teams/persita.png?updatedAt=1759125015871",
    description:
      "Persita Tangerang adalah klub sepak bola yang berbasis di Tangerang, Banten. Klub ini memiliki julukan 'Pendekar Cisadane'. Dengan seragam ungu yang khas, Persita memiliki sejarah panjang di sepak bola Indonesia dan didukung oleh suporter yang loyal.",
    stats: { played: 5, win: 0, draw: 1, loss: 4, points: 1 },
  },
];

module.exports = teams;
