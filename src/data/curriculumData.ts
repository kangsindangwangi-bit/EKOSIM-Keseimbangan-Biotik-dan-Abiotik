import { QuizQuestion, SymbiosisItem, FoodChainNode } from '../types';

export const TWO_WAY_RELATIONSHIPS = [
  {
    id: 'plant_light',
    title: 'Tumbuhan – Cahaya',
    process: 'Tumbuhan menggunakan energi cahaya untuk fotosintesis (menghasilkan glukosa dan oksigen).',
    observableExample: 'Rumput di tempat cukup cahaya umumnya tumbuh lebih hijau dan lebat daripada rumput di tempat sangat teduh, jika faktor lain serupa.',
    abioticFactor: 'Cahaya Matahari',
    bioticComponent: 'Tumbuhan Hijau (Klorofil)',
    actionHint: 'Tingkatkan intensitas cahaya untuk memacu fotosintesis.',
  },
  {
    id: 'plant_water_soil',
    title: 'Tumbuhan – Air dan Tanah',
    process: 'Akar menyerap air dan mineral dari pori-pori tanah untuk mengangkut nutrisi ke seluruh tubuh tumbuhan.',
    observableExample: 'Tanaman pot cepat layu dan daunnya menguning saat tanah sangat kering dan kehabisan air.',
    abioticFactor: 'Air & Mineral Tanah',
    bioticComponent: 'Akar Tanaman',
    actionHint: 'Jaga kelembapan tanah agar tanaman tetap segar dan kokoh.',
  },
  {
    id: 'animal_water_oxygen',
    title: 'Hewan – Air dan Oksigen',
    process: 'Hewan memerlukan air untuk metabolisme; banyak hewan air (ikan) memerlukan oksigen terlarut melalui insang.',
    observableExample: 'Ikan dapat stres, berenang mengapung di permukaan air sambil megap-megap ketika air kolam kotor dan oksigen terlarut rendah.',
    abioticFactor: 'Oksigen Terlarut & Kebersihan Air',
    bioticComponent: 'Ikan & Hewan Air',
    actionHint: 'Bersihkan limbah kolam dan aerasi air agar kadar oksigen naik.',
  },
  {
    id: 'decomposer_soil',
    title: 'Pengurai – Tanah',
    process: 'Pengurai (bakteri, jamur, cacing tanah) memecah sisa bahan organik; unsur hara dikembalikan ke tanah.',
    observableExample: 'Daun gugur dan bangkai serangga lama-kelamaan membusuk menjadi humus hitam yang menyumbang bahan organik subur ke tanah.',
    abioticFactor: 'Unsur Hara & Humus Tanah',
    bioticComponent: 'Pengurai (Cacing, Jamur, Bakteri)',
    actionHint: 'Biarkan cacing dan mikroba mengolah daun gugur menjadi pupuk alami.',
  },
  {
    id: 'plant_soil_temp',
    title: 'Tumbuhan – Tanah dan Suhu',
    process: 'Akar pohon mengikat butir-butir tanah; tajuk rimbun memberi naungan dan membantu menjaga kelembapan mikro lokal.',
    observableExample: 'Area berpohon terasa jauh lebih sejuk dan teduh daripada lapangan beton/tanah tanpa pohon di siang terik.',
    abioticFactor: 'Struktur Tanah & Suhu Udara',
    bioticComponent: 'Pohon & Hutan Berkanopi',
    actionHint: 'Tanam pohon rindang untuk menurunkan suhu mikro dan mengikat tanah.',
  },
  {
    id: 'organism_river_water',
    title: 'Organisme – Air (Aliran & Erosi)',
    process: 'Tumbuhan di tepi sungai memperlambat aliran limpasan permukaan dan akar menahan tebing dari erosi.',
    observableExample: 'Tepi sungai yang memiliki vegetasi sering lebih terlindungi dan airnya jernih, dibandingkan tepi sungai terbuka yang mudah longsor.',
    abioticFactor: 'Aliran Air & Pencegahan Erosi',
    bioticComponent: 'Vegetasi Bantaran Sungai',
    actionHint: 'Rimbunkan sempadan sungai agar tebing tanah tidak runtuh terbawa arus.',
  },
];

export const SYMBIOSIS_DATA: SymbiosisItem[] = [
  {
    id: 'predation_frog_grasshopper',
    title: 'Predasi: Katak & Belalang',
    type: 'PREDASI',
    speciesA: {
      name: 'Katak (Predator)',
      role: 'Pemangsa',
      icon: '🐸',
      status: '+ (Untung)',
    },
    speciesB: {
      name: 'Belalang (Mangsa)',
      role: 'Mangsa',
      icon: '🦗',
      status: '- (Rugi)',
    },
    description: 'Satu organisme menangkap, membunuh, dan memakan organisme lain untuk mendapatkan energi makanan.',
    example: 'Katak sawah menjulurkan lidah lengket dengan kecepatan kilat untuk menangkap belalang.',
    consequence: 'Jika populasi katak menurun drastis, populasi belalang dapat meledak dan memakan habis daun padi!',
  },
  {
    id: 'competition_paddy_weed',
    title: 'Kompetisi: Padi & Gulma Liar',
    type: 'KOMPETISI',
    speciesA: {
      name: 'Tanaman Padi',
      role: 'Tanaman Budidaya',
      icon: '🌾',
      status: '- (Rugi/Tertekan)',
    },
    speciesB: {
      name: 'Gulma Liar (Rumput)',
      role: 'Tumbuhan Pengganggu',
      icon: '🌿',
      status: '- (Rugi/Tertekan)',
    },
    description: 'Dua organisme saling bersaing untuk memperoleh sumber daya lingkungan yang terbatas (cahaya matahari, air, mineral tanah, dan ruang).',
    example: 'Padi yang tumbuh berdampingan rapat dengan gulma menjadi kerdil karena kekurangan sinar matahari dan nutrisi tanah.',
    consequence: 'Petani perlu menyiangi gulma agar tanaman padi mendapat ruang dan nutrisi maksimal.',
  },
  {
    id: 'mutualism_bee_flower',
    title: 'Mutualisme: Lebah & Bunga',
    type: 'MUTUALISME',
    speciesA: {
      name: 'Lebah Madu',
      role: 'Penyerbuk',
      icon: '🐝',
      status: '+ (Untung)',
    },
    speciesB: {
      name: 'Bunga Sepatu / Buah',
      role: 'Tumbuhan Berbunga',
      icon: '🌸',
      status: '+ (Untung)',
    },
    description: 'Hubungan timbal balik di mana KEDUA organisme sama-sama memperoleh keuntungan nyata untuk kelangsungan hidupnya.',
    example: 'Lebah memperoleh nektar manis sebagai bahan makanan, sedangkan bunga terbantu proses penyerbukannya saat serbuk sari menempel pada tubuh lebah.',
    consequence: 'Ketiadaan lebah di alam dapat menggagalkan penyerbukan buah dan menurunkan hasil panen dunia secara drastis.',
  },
  {
    id: 'parasitism_tick_animal',
    title: 'Parasitisme: Kutu & Inang',
    type: 'PARASITISME',
    speciesA: {
      name: 'Kutu Hewan',
      role: 'Parasit',
      icon: '🪲',
      status: '+ (Untung)',
    },
    speciesB: {
      name: 'Hewan Inang (Kucing/Sapi)',
      role: 'Inang',
      icon: '🐈',
      status: '- (Rugi)',
    },
    description: 'Satu organisme (parasit) memperoleh keuntungan dengan mengambil nutrisi dari organisme inang, sementara inang dirugikan.',
    example: 'Kutu mengisap darah dari kulit hewan inang; inang mengalami rasa gatal, iritasi, anemia, bahkan infeksi.',
    consequence: 'Parasit biasanya tidak langsung membunuh inang secara cepat karena inang adalah sumber makanan berkelanjutan baginya.',
  },
];

export const FOOD_CHAIN_NODES: FoodChainNode[] = [
  {
    id: 'sun',
    name: 'Matahari',
    roleText: 'Sumber Energi Utama',
    trophicLevel: 'Matahari',
    icon: '☀️',
    color: '#F59E0B',
  },
  {
    id: 'padi',
    name: 'Padi Sawah',
    roleText: 'Produsen (Autotrof)',
    trophicLevel: 'Produsen',
    icon: '🌾',
    color: '#10B981',
    eatsIds: ['sun'],
  },
  {
    id: 'belalang',
    name: 'Belalang',
    roleText: 'Konsumen Tingkat I (Herbivora)',
    trophicLevel: 'Konsumen I',
    icon: '🦗',
    color: '#84CC16',
    eatsIds: ['padi'],
  },
  {
    id: 'katak',
    name: 'Katak',
    roleText: 'Konsumen Tingkat II (Karnivora)',
    trophicLevel: 'Konsumen II',
    icon: '🐸',
    color: '#06B6D4',
    eatsIds: ['belalang'],
  },
  {
    id: 'ular',
    name: 'Ular Sawah',
    roleText: 'Konsumen Tingkat III (Karnivora)',
    trophicLevel: 'Konsumen Puncak',
    icon: '🐍',
    color: '#F97316',
    eatsIds: ['katak'],
  },
  {
    id: 'elang',
    name: 'Burung Elang',
    roleText: 'Konsumen Puncak (Predator Puncak)',
    trophicLevel: 'Konsumen Puncak',
    icon: '🦅',
    color: '#8B5CF6',
    eatsIds: ['ular'],
  },
];

export const FOOD_WEB_EXTENDED_NODES = [
  { id: 'padi', name: 'Tanaman Padi', icon: '🌾', role: 'Produsen', color: '#10B981' },
  { id: 'tikus', name: 'Tikus Sawah', icon: '🐀', role: 'Konsumen I (Pemakan Biji)', color: '#A16207' },
  { id: 'pipit', name: 'Burung Pipit', icon: '🐦', role: 'Konsumen I (Pemakan Biji & Ulat)', color: '#D97706' },
  { id: 'belalang', name: 'Belalang', icon: '🦗', role: 'Konsumen I (Pemakan Daun)', color: '#84CC16' },
  { id: 'katak', name: 'Katak Sawah', icon: '🐸', role: 'Konsumen II (Pemakan Serangga)', color: '#0EA5E9' },
  { id: 'ular', name: 'Ular Sawah', icon: '🐍', role: 'Konsumen III (Pemakan Katak & Tikus)', color: '#EA580C' },
  { id: 'elang', name: 'Elang Bondol', icon: '🦅', role: 'Konsumen Puncak', color: '#7C3AED' },
  { id: 'pengurai', name: 'Pengurai (Jamur & Cacing)', icon: '🍄', role: 'Dekomposer (Daur Materi)', color: '#78350F' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    topic: '3.1 Hubungan Dua Arah (Tumbuhan & Cahaya)',
    question: 'Mengapa tanaman rumput atau padi di area terbuka dengan limpahan sinar matahari tumbuh jauh lebih subur dibanding di tempat yang sangat teduh?',
    options: [
      'Di tempat teduh kelembapan udara terlalu tinggi sehingga stomata daun tertutup total',
      'Cahaya matahari mengaktifkan klorofil untuk reaksi fotosintesis menghasilkan cadangan makanan glukosa',
      'Tanaman di tempat terbuka tidak memerlukan penyerapan air dari dalam tanah',
      'Sinar matahari membunuh seluruh mikroba tanah sehingga akar tanaman tidak bersaing'
    ],
    correctAnswer: 1,
    explanation: 'Cahaya matahari adalah faktor abiotik krusial yang ditangkap klorofil tumbuhan (biotik) untuk fotosintesis menghasilkan glukosa dan oksigen.',
    practicalExample: 'Rumput lapangan terbuka tumbuh hijau pekat, sedangkan rumput di bawah naungan pohon lebat tumbuh pucat dan jarang.',
  },
  {
    id: 2,
    topic: '3.1 Hubungan Dua Arah (Biotik Mengubah Abiotik)',
    question: 'Manakah fenomena berikut yang menjadi bukti nyata bahwa makhluk hidup (biotik) mampu mengubah kondisi fisik lingkungan sekitarnya (abiotik)?',
    options: [
      'Aliran air hujan di lereng gunung mengikis bebatuan menjadi butiran kerikil sungai',
      'Sinar terik matahari menyebabkan air danau menguap menjadi gumpalan awan',
      'Akar pohon mengikat partikel tanah mencegah erosi dan tajuknya menurunkan suhu mikro lokal',
      'Perubahan pergantian musim hujan dan kemarau yang memengaruhi kalender tanam petani'
    ],
    correctAnswer: 2,
    explanation: 'Hubungan berlangsung dua arah: tidak hanya lingkungan memengaruhi organisme, tetapi tajuk pohon menaungi dan mendinginkan suhu udara lokal, serta akarnya mengikat partikel tanah dari bahaya longsor.',
    practicalExample: 'Berdiri di bawah hutan lindung terasa sejuk (24°C) dibanding jalan aspal terbuka (34°C).',
  },
  {
    id: 3,
    topic: '3.1 Hubungan Dua Arah (Hewan & Oksigen Air)',
    question: 'Pada kolam pemeliharaan ikan yang airnya keruh berlumpur dan sirkulasinya buruk, ikan sering terlihat mengapung di permukaan sambil membuka tutup mulutnya cepat. Penyebab utama reaksi ikan tersebut adalah...',
    options: [
      'Ikan mengalami stres pernapasan (hipoksia) akibat kadar oksigen terlarut dalam air sangat rendah',
      'Ikan beralih menyerap nitrogen terlarut pada lapisan permukaan air untuk menggantikan air kolam',
      'Ikan sedang bermigrasi mencari serangga air yang jatuh di permukaan kolam',
      'Suhu dasar kolam terlalu dingin sehingga ikan mencari kehangatan di atas air'
    ],
    correctAnswer: 0,
    explanation: 'Hewan air memerlukan oksigen terlarut untuk bernapas melalui insang. Ketika air kotor dan aerasi minim, kadar O₂ anjlok sehingga ikan naik ke permukaan air mencari lapisan air yang kontak dengan udara.',
    practicalExample: 'Peternak ikan memasang kincir aerator agar pasokan oksigen terlarut tetap tinggi sehingga ikan tidak stres.',
  },
  {
    id: 4,
    topic: '3.1 Hubungan Dua Arah (Pengurai & Tanah)',
    question: 'Peran ekologis utama pengurai (dekomposer seperti cacing tanah dan jamur) dalam memengaruhi faktor abiotik tanah adalah...',
    options: [
      'Menyerap seluruh air tanah agar pori-pori tanah terisi oleh gas karbon dioksida murni',
      'Mengikat partikel pasir menjadi batuan sedimen keras agar tanah tidak berpori',
      'Memecah bahan organik kompleks dari daun gugur dan bangkai menjadi unsur hara yang menyuburkan tanah',
      'Membunuh benih gulma agar akar tanaman utama tidak mengalami persaingan hara'
    ],
    correctAnswer: 2,
    explanation: 'Pengurai memecah sisa daun gugur dan bahan organik menjadi humus kaya mineral alami (nitrogen, fosfor, kalium) yang dikembalikan ke tanah.',
    practicalExample: 'Kompos daun yang didiamkan lama-kelamaan menjadi tanah hitam gembur berkat cacing dan jamur.',
  },
  {
    id: 5,
    topic: '3.2 Interaksi Makhluk Hidup (Predasi)',
    question: 'Katak sawah menjulurkan lidahnya untuk menangkap belalang pemakan padi. Hubungan ini dikategorikan sebagai predasi karena...',
    options: [
      'Katak dan belalang sama-sama bersaing mendapatkan tanaman padi sebagai sumber energi',
      'Satu pihak (predator) memangsa dan memakan organisme lain (mangsa) untuk kelangsungan hidupnya',
      'Katak hidup sebagai parasit menempel pada tubuh belalang tanpa membunuhnya secara langsung',
      'Katak membantu penyerbukan tanaman tempat belalang hinggap sehingga keduanya untung'
    ],
    correctAnswer: 1,
    explanation: 'Predasi adalah interaksi di mana predator (katak) menangkap, membunuh, dan memakan mangsa (belalang). Hubungan ini menjaga populasi herbivora tetap seimbang.',
    practicalExample: 'Katak sawah menjadi pengendali alami hama belalang perusak daun tanaman padi.',
  },
  {
    id: 6,
    topic: '3.2 Interaksi Makhluk Hidup (Kompetisi)',
    question: 'Tanaman padi yang tumbuh berdesakan dengan gulma liar (rumput teki) mengalami daun menguning dan batang kerdil. Hal ini merupakan akibat dari...',
    options: [
      'Kompetisi antarorganisme dalam memperebutkan sumber daya terbatas seperti cahaya, air, dan hara tanah',
      'Parasitisme di mana jaringan gulma menusuk batang padi dan menyerap cairan floem secara langsung',
      'Predasi di mana akar gulma memakan secara aktif jaringan akar tanaman padi',
      'Mutualisme yang tertunda karena gulma belum berbunga untuk menarik serangga penyerbuk'
    ],
    correctAnswer: 0,
    explanation: 'Kompetisi terjadi ketika dua atau lebih tanaman berada pada ruang yang sama dan bersaing memperebutkan faktor abiotik terbatas (sinar matahari, ruang tumbuh, air, dan mineral tanah).',
    practicalExample: 'Petani melakukan penyiangan rumput agar pupuk dan sinar matahari terserap maksimal oleh tanaman padi.',
  },
  {
    id: 7,
    topic: '3.2 Interaksi Makhluk Hidup (Mutualisme)',
    question: 'Hubungan antara lebah madu yang mengisap nektar bunga sepatu dengan tanaman berbunga tersebut digolongkan sebagai mutualisme karena...',
    options: [
      'Lebah memperoleh sarang tempat bertelur sementara bunga terlindungi dari sengatan serangga lain',
      'Lebah memperoleh makanan nektar bergizi dan bunga terbantu penyerbukan serbuk sarinya secara timbal balik',
      'Lebah menjadi predator serbuk sari sedangkan bunga mengambil kotoran lebah sebagai pupuk',
      'Bunga menumpang pada sayap lebah untuk menyebarkan bijinya ke wilayah lain'
    ],
    correctAnswer: 1,
    explanation: 'Mutualisme adalah hubungan timbal balik yang sama-sama menguntungkan (+/+): lebah mendapat nektar manis sebagai energi, dan bunga terbantu proses penyerbukannya.',
    practicalExample: 'Tanpa serangga penyerbuk, ribuan jenis tanaman buah tidak akan menghasilkan buah dan biji.',
  },
  {
    id: 8,
    topic: '3.3 Rantai Makanan (Tingkat Trofik)',
    question: 'Pada rantai makanan sawah: Matahari → Padi → Belalang → Katak → Ular → Elang, manakah organisme yang menempati posisi Konsumen Tingkat I?',
    options: [
      'Padi sawah, karena merupakan organisme hidup pertama dalam urutan rantai makanan',
      'Cahaya matahari, karena merupakan sumber energi primer paling awal',
      'Belalang, karena merupakan herbivora yang langsung memakan jaringan produsen',
      'Katak sawah, karena merupakan hewan pertama yang memakan hewan lain'
    ],
    correctAnswer: 2,
    explanation: 'Padi adalah Produsen (autotrof). Konsumen Tingkat I adalah herbivora yang memakan produsen secara langsung, yaitu Belalang.',
    practicalExample: 'Belalang memakan daun padi, lalu belalang menjadi mangsa bagi konsumen tingkat II (katak).',
  },
  {
    id: 9,
    topic: '3.3 Dampak Perubahan Populasi (Jaring Makanan)',
    question: 'Jika di suatu persawahan para petani membasmi habis seluruh populasi ular sawah karena dianggap berbahaya, akibat berantai yang akan langsung terjadi adalah...',
    options: [
      'Populasi burung elang meningkat pesat karena sarangnya terbebas dari ancaman ular',
      'Populasi tikus sawah melonjak tajam tanpa predator pengendali alami sehingga merusak panen padi secara masif',
      'Tanaman padi tumbuh lebih subur karena tanah sawah tidak terganggu oleh liang persembunyian ular',
      'Populasi belalang musnah total karena katak sawah memakan seluruh serangga yang ada'
    ],
    correctAnswer: 1,
    explanation: 'Ular adalah predator puncak lokal bagi tikus sawah. Menghilangkan ular memicu peledakan populasi tikus (hama padi) yang berujung pada gagal panen total.',
    practicalExample: 'Keseimbangan jaring makanan mengajarkan bahwa membasmi satu spesies predator dapat merusak kestabilan panen pertanian.',
  },
  {
    id: 10,
    topic: '3.4 Aliran Energi & Daur Materi',
    question: 'Manakah kesimpulan yang PALING TEPAT mengenai perbedaan mendasar antara aliran energi dan daur materi di dalam ekosistem bumi?',
    options: [
      'Energi mengalami siklus tertutup melalui fotosintesis, sedangkan materi mengalir satu arah dan hilang ke angkasa',
      'Materi dan energi keduanya mengalir satu arah dan harus selalu disuplai ulang oleh radiasi matahari setiap hari',
      'Energi mengalir satu arah dengan pelepasan panas di tiap tingkat trofik, sedangkan materi mengalami daur/siklus berulang melalui pengurai',
      'Pengurai berperan mengembalikan energi ke matahari, sedangkan materi disimpan abadi oleh tanaman'
    ],
    correctAnswer: 2,
    explanation: 'Energi masuk dari matahari, mengalir searah melalui rantai makanan, dan terdisipasi ke alam sebagai energi panas. Sebaliknya, materi (air, karbon, nitrogen, mineral) didaur ulang terus-menerus oleh pengurai kembali ke tanah.',
    practicalExample: 'Atom air dan fosfor yang kita konsumsi hari ini adalah materi yang sama yang pernah mengalir jutaan tahun lalu di bumi.',
  },
];

