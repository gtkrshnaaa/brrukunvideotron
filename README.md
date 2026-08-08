# Videotron 17 Agustus — Website Perayaan Kemerdekaan Desa

Website satu halaman yang dirancang untuk ditampilkan di papan videotron
berukuran **3m x 2m** (rasio 3:2), menggantikan konten videotron biasa
dengan pengalaman yang terasa seperti video sinematik — padahal sepenuhnya
berjalan di browser.

Tema visual: **merah – putih – hitam**, dengan aksen **emas** yang
terinspirasi ornamen gapura/pura khas Bali, untuk menyatukan nuansa
kemerdekaan dan identitas lokal desa.

---

## Isi Website

Website ini terdiri dari **3 halaman**, berpindah lewat menu navigasi di
sisi kiri layar (muncul saat kursor diarahkan ke tepi kiri):

| Halaman | Fungsi |
|---|---|
| **Ucapan Salam** | Layar pembuka acara — teks "Dirgahayu Republik Indonesia" dengan efek partikel emas melayang seperti damar/lampion. |
| **Kenangan** | Galeri foto kegiatan warga, diputar otomatis penuh layar (tanpa scroll) dengan animasi sinematik ala film dokumenter. Ini halaman utama/fokus dari project ini. |
| **Idle Screen** | Layar jeda/standby saat tidak ada sesi aktif — lambang bintang beranimasi halus dan jam berjalan. |

Setiap halaman punya bingkai sudut emas bergaya gapura Bali sebagai
elemen visual yang konsisten di ketiganya.

---

## Halaman Kenangan — Detail

Ini bagian paling kompleks, dibuat agar terasa seperti video, bukan slide
show biasa:

- **Animasi Ken Burns** — tiap foto perlahan zoom & bergeser (arah acak
  tiap foto) selama tampil, memberi kesan hidup/bergerak.
- **Crossfade sinematik** — transisi antar foto berupa dissolve halus,
  bukan potongan kasar.
- **Tanpa scroll** — semua konten mengisi penuh layar (letterbox hitam
  otomatis kalau rasio layar target berbeda dari 3:2).
- **Indikator & kontrol pemutaran** (muncul saat kursor di atas halaman,
  auto-hide agar tidak mengganggu tampilan ke penonton):
  - Progress bar durasi foto yang sedang tampil.
  - Tombol sebelumnya / jeda-putar / berikutnya.
  - Penghitung foto — misalnya `5 / 72`.
  - Pengaturan durasi per foto: **3s / 5s / 8s / 12s**.

### Tentang foto di versi demo ini

Karena foto asli kegiatan warga belum tersedia saat pembuatan awal, versi
ini memakai **12 motif visual generatif** bertema merah-putih-hitam-emas
(gaya damar/lampion, pita merah, siluet gapura, batik, kerumunan warga,
dsb.) sebagai foto placeholder, ditanam langsung di dalam file (format
`base64`) — **tidak butuh koneksi internet sama sekali** untuk tampil,
baik di laptop operator maupun di layar videotron.

---

## Cara Mengganti dengan Foto Asli Warga

Buka file `index`, cari komentar:

```
ASET FOTO DEMO (ditanam langsung sebagai base64 — tanpa internet)
```

Di bawahnya ada array `PHOTO_ASSETS`. Ganti isinya dengan foto asli, bisa
dengan salah satu cara berikut:

1. **Base64 (disarankan, tetap 1 file, tetap offline)**
   Ubah tiap foto jadi base64 lalu isi seperti:
   ```js
   const PHOTO_ASSETS = [
     { name:"Upacara Bendera", src:"data:image/jpeg;base64,XXXXX..." },
     { name:"Lomba 17-an",     src:"data:image/jpeg;base64,XXXXX..." },
     // ... tambahkan sebanyak yang diperlukan (100+ foto tidak masalah)
   ];
   ```

2. **File lokal terpisah** (lebih mudah dikelola kalau fotonya banyak)
   Simpan foto di folder `foto/`, lalu isi array dengan path relatif:
   ```js
   const PHOTO_ASSETS = [
     { name:"Upacara Bendera", src:"foto/01.jpg" },
     { name:"Lomba 17-an",     src:"foto/02.jpg" },
   ];
   ```
   Catatan: cara ini butuh file HTML dan folder `foto/` dijalankan lewat
   local server (bukan dibuka langsung sebagai `file://`) agar tidak
   terhalang batasan keamanan browser.

Jumlah foto di galeri (`DEMO_TOTAL`) otomatis mengikuti jumlah isi
`PHOTO_ASSETS` — tidak perlu diubah manual.

---

## Cara Menampilkan di Videotron

1. Buka file `index.html` di browser (Chrome/Edge disarankan)
   pada laptop yang tersambung ke papan videotron.
2. Tekan **F11** untuk mode fullscreen.
3. Arahkan kursor ke tepi kiri layar untuk membuka menu navigasi dan
   berpindah halaman sesuai jalannya acara:
   - Mulai dari **Idle Screen** saat sebelum acara.
   - Pindah ke **Ucapan Salam** saat pembukaan.
   - Pindah ke **Kenangan** saat sesi nostalgia/kenangan warga.
4. Sesuaikan kecepatan galeri lewat tombol durasi (3s/5s/8s/12s) di
   halaman Kenangan sesuai kebutuhan saat itu.

---

## Catatan Teknis

- File tunggal (`index.html`) — HTML, CSS, dan JavaScript ada
  dalam satu file, tidak ada dependency eksternal wajib selain Google
  Fonts (Fraunces, Plus Jakarta Sans, JetBrains Mono) yang dimuat online;
  jika ingin 100% offline termasuk font, font juga bisa di-download dan
  ditanam sebagai base64 dengan cara yang sama seperti foto.
- Rasio layar tetap terjaga 3:2 di ukuran layar berapa pun (letterbox
  hitam otomatis untuk rasio berbeda).
- Tidak ada scroll di halaman manapun — semua elemen didesain penuh
  layar (`100vh`/`100vw`).
