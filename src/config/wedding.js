// Semua konten undangan ada di sini. Ganti nilai di file ini
// tanpa menyentuh komponen. Data di bawah hanyalah placeholder demo.

export const couple = {
  first: { name: 'Alya', full: 'Alya Prameswari', parents: 'Putri dari Bapak Hendra & Ibu Sari' },
  second: { name: 'Raka', full: 'Raka Mahendra', parents: 'Putra dari Bapak Wahyu & Ibu Lestari' },
  hashtag: '#AlyaRaka',
}

export const edition = {
  number: 'No. 01',
  headline: 'Dua cerita, satu halaman',
  tagline: 'Edisi khusus pernikahan',
}

// Waktu lokal Surabaya (WIB, +07:00)
export const events = [
  {
    id: 'akad',
    title: 'Akad Nikah',
    start: '2027-03-20T08:00:00+07:00',
    end: '2027-03-20T09:30:00+07:00',
    venue: 'Sacred Heart Cathedral Surabaya',
    address: 'Jl. Polisi Istimewa No.15, Keputran, Kec. Tegalsari, Surabaya, Jawa Timur 60265',
    mapsQuery: 'Sacred Heart Cathedral Surabaya',
  },
  {
    id: 'resepsi',
    title: 'Resepsi',
    start: '2027-03-20T11:00:00+07:00',
    end: '2027-03-20T14:00:00+07:00',
    venue: 'Pakuwon Imperial Ballroom',
    address: 'Villa Bukit Regency Pakuwon Indah, Jl. Lontar, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60211',
    mapsQuery: 'Pakuwon Imperial Ballroom',
  },
]

export const story = [
  { id: 'bertemu', year: '2019', title: 'Bertemu di ruang kelas yang salah', body: 'Alya salah masuk kelas, Raka menyimpan satu kursi kosong. Hanya itu awalnya.' },
  { id: 'berjalan', year: '2021', title: 'Berjalan, lalu terbiasa', body: 'Dari obrolan larut malam menjadi kebiasaan pulang bersama.' },
  { id: 'jauh', year: '2023', title: 'Jarak yang mengajari rindu', body: 'Satu tahun berjauhan, ratusan pesan suara, dan satu janji untuk kembali.' },
  { id: 'melamar', year: '2026', title: 'Satu pertanyaan sederhana', body: 'Di teras rumah, tanpa kejutan besar. Alya menjawab sebelum pertanyaannya selesai.' },
]

// Kosongkan src untuk memakai placeholder otomatis.
export const gallery = [
  { id: 'g1', src: '/images/g1.jpg', alt: 'Alya dan Raka tertawa di taman', ratio: 3 / 4 },
  { id: 'g2', src: '/images/g2.jpg', alt: 'Tangan bergandengan di tepi jalan', ratio: 1 },
  { id: 'g3', src: '/images/g3.jpg', alt: 'Potret berdua menghadap matahari sore', ratio: 4 / 5 },
  { id: 'g4', src: '/images/g4.jpg', alt: 'Cincin pernikahan bersama bunga', ratio: 5 / 4 },
  { id: 'g5', src: '/images/g5.jpg', alt: 'Berjalan di pantai saat senja', ratio: 3 / 4 },
  { id: 'g6', src: '/images/g6.jpg', alt: 'Foto close-up dengan senyum', ratio: 1 },
]

export const music = {
  // Isi dengan file di /public (mis. '/audio/lagu.mp3'). Kosong = tombol musik disembunyikan.
  src: '',
  title: 'Musik latar',
}

export const guestbookSeed = [
  { id: 's1', name: 'Dinda', message: 'Selamat ya! Semoga selalu bahagia.', created_at: '2026-11-20T10:00:00Z' },
  { id: 's2', name: 'Bima', message: 'Ditunggu undangan makan-makannya. Barakallah!', created_at: '2026-11-21T08:30:00Z' },
]
