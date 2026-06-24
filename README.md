# 📘 Panduan Pengguna (User Manual) SPK Dispensasi Mahasiswa — SAW

Panduan Pengguna **Sistem Pendukung Keputusan (SPK) Kelayakan Dispensasi Mahasiswa**. Sistem ini menggunakan metode **Simple Additive Weighting (SAW)** untuk memberikan rekomendasi kelayakan pengajuan dispensasi secara objektif, terukur, dan berbasis data.

Sistem ini mendukung evaluasi untuk **1 hingga maksimal 5 mahasiswa** secara bersamaan untuk membantu Anda membandingkan dan menentukan prioritas rekomendasi kelayakan.

---

## 🗺️ Alur Kerja Penggunaan Sistem

Berikut adalah alur pengoperasian sistem dari awal hingga mendapatkan hasil rekomendasi akhir:

```text
[ Beranda ] ➔ [ Input Data ] ➔ [ Setup Nama ] ➔ [ Kuesioner C1-C6 ] ➔ [ Perhitungan SAW ] ➔ [ Hasil & Peringkat ]
```

### Bagan Alur Detail:
```text
1. 🏠 Halaman Beranda
   └── Klik tombol "Mulai Penilaian" atau pilih tab "Input Data" di bawah.
   
2. 📝 Layar Setup Nama (Manajemen Alternatif)
   └── Masukkan nama-nama mahasiswa yang akan dinilai (1 s/d 5 orang).
   └── Klik tombol "Mulai Penilaian →".
   
3. 📋 Layar Wizard (Pengisian Kuesioner)
   └── Jawab kriteria C1 s/d C6 secara berurutan untuk setiap mahasiswa.
   └── Pada kuesioner terakhir mahasiswa terakhir, klik "Lihat Perhitungan".
   
4. ⚙️ Halaman Perhitungan (Langkah SAW)
   └── Tinjau matriks keputusan, normalisasi, dan nilai preferensi SAW gabungan.
   └── Klik tombol "Lihat Hasil Rekomendasi →".
   
5. 📊 Halaman Hasil Pemeringkatan
   └── Lihat urutan peringkat kelayakan mahasiswa dari skor tertinggi.
   └── Klik kartu nama mahasiswa untuk menampilkan grafik kriteria & analisis detailnya.
   └── Selesai / Klik "Isi Ulang" untuk memulai penilaian baru.
```

---

## 💻 Panduan Langkah demi Langkah

### Langkah 1: Persiapan & Input Nama Mahasiswa (*Setup Alternatif*)
1. Navigasi ke menu **Input Data** melalui tab navigasi di bagian bawah atau klik tombol **Mulai Penilaian** di halaman Beranda.
2. Anda akan melihat layar persiapan daftar mahasiswa.
3. **Mengisi Nama**: Masukkan nama mahasiswa atau deskripsi pengajuan (misal: *Ahmad - Lomba Robot*) pada kolom input yang tersedia.
4. **Menambah Mahasiswa**: Klik tombol **`+ Tambah Mahasiswa`** untuk menambah alternatif mahasiswa baru. Batas maksimal adalah **5 mahasiswa**.
5. **Menghapus Mahasiswa**: Klik tombol hapus (ikon tempat sampah 🗑️) di sebelah kanan input nama jika ingin membatalkan penilaian mahasiswa tersebut. Batas minimal adalah **1 mahasiswa**.
6. Klik tombol **`Mulai Penilaian →`** untuk melanjutkan ke pengisian kuesioner.

---

### Langkah 2: Pengisian Kuesioner Kriteria (*Wizard Mode*)
Sistem akan memandu Anda menjawab **6 pertanyaan kriteria** untuk setiap mahasiswa secara berurutan.
1. Perhatikan **Header Informasi** di atas kuesioner untuk memastikan nama mahasiswa yang sedang dinilai (misal: *Menilai Mahasiswa: Ahmad (Mahasiswa 1 dari 2)*).
2. **Pilih Jawaban**: Klik salah satu opsi jawaban yang paling menggambarkan kondisi pengajuan mahasiswa tersebut. Setiap opsi memiliki deskripsi detail untuk objektivitas penilaian.
3. **Navigasi Soal**:
   - Klik **`Selanjutnya →`** untuk berlanjut ke kriteria berikutnya atau mahasiswa berikutnya setelah kriteria terakhir terisi.
   - Klik **`← Sebelumnya`** untuk kembali ke kriteria sebelumnya. Jika Anda menekan tombol ini di pertanyaan pertama mahasiswa pertama, Anda akan kembali ke **Layar Setup Nama**.
4. Di kriteria terakhir (C6) untuk mahasiswa terakhir, tombol akan berubah menjadi **`Lihat Perhitungan`**. Klik tombol tersebut setelah memberikan jawaban untuk memulai perhitungan metode SAW.

---

### Langkah 3: Meninjau Langkah Perhitungan SAW (*Tab Perhitungan*)
Halaman ini menyajikan perhitungan matematika metode SAW secara transparan langkah demi langkah:
1. **Langkah 1: Matriks Keputusan (Nilai Mentah)**
   - Menampilkan nilai skala asli (1 hingga 5) yang Anda pilih untuk masing-masing kriteria semua mahasiswa.
2. **Langkah 2: Matriks Normalisasi (r)**
   - Menampilkan nilai hasil normalisasi sesuai jenis atribut kriteria.
   - *Benefit (C1, C2, C3, C4)*: Dinormalisasi dengan pembagian skala maksimal ($r = x / 5$).
   - *Cost (C5, C6)*: Dinormalisasi dengan pembagian skala minimal ($r = 1 / x$).
3. **Langkah 3: Nilai Preferensi & Ranking**
   - Mengalikan matriks normalisasi dengan bobot kriteria masing-masing:
     - **C1 & C2**: 25% | **C3**: 10% | **C4**: 15% | **C5**: 10% | **C6**: 15%
   - Menampilkan total Nilai Preferensi ($V_i$) akhir dan peringkatnya. Mahasiswa dengan peringkat terbaik (Peringkat 1) akan otomatis disorot dengan warna khusus dan lencana mahkota/piala (🏆).
4. Klik **`Lihat Hasil Rekomendasi →`** untuk melanjutkan ke analisis rekomendasi.

---

### Langkah 4: Analisis Hasil Kelayakan & Pemeringkatan (*Tab Hasil*)
Halaman ini menyajikan kesimpulan keputusan kelayakan:
1. **Daftar Peringkat Kelayakan**:
   - Kartu daftar mahasiswa yang diurutkan otomatis dari peringkat tertinggi hingga terendah berdasarkan nilai preferensi ($V_i$).
   - Dilengkapi dengan label status kelayakan instan (*Sangat Layak / Layak Dipertimbangkan / Kurang Layak*).
2. **Rincian Detail Mahasiswa Terpilih**:
   - **Klik pada salah satu kartu mahasiswa** di daftar peringkat untuk melihat detail evaluasi mahasiswa tersebut di bagian bawah.
   - Menampilkan skor visual per kriteria dalam bentuk diagram batang (*breakdown list*).
   - Menampilkan **Analisis Otomatis** yang mengulas kelemahan pengajuan mahasiswa tersebut (kriteria yang perlu diperbaiki/diperhatikan jika ada).
3. **Tabel Ringkasan Akhir**:
   - Tabel terpadu yang merangkum nilai preferensi akhir, status kelayakan, dan peringkat seluruh mahasiswa.
4. Klik tombol **`Isi Ulang`** untuk mereset seluruh data dan memulai penilaian baru dari awal.

---

## 📊 Detail Kriteria Penilaian

Sistem ini mengevaluasi pengajuan dispensasi berdasarkan 6 kriteria berikut:

| Kode | Kriteria Penilaian | Jenis Atribut | Bobot | Deskripsi Singkat |
| :--- | :--- | :--- | :--- | :--- |
| **C1** | Jenis Kegiatan | **Benefit** (Semakin tinggi semakin baik) | **25%** | Tingkat skala kegiatan (Internasional/Nasional s/d Internal kecil). |
| **C2** | Legalitas Dokumen | **Benefit** (Semakin tinggi semakin baik) | **25%** | Kelengkapan tanda tangan, cap resmi, dan kop surat pengaju. |
| **C3** | Riwayat Tujuan Dispensasi | **Benefit** (Semakin tinggi semakin baik) | **10%** | Riwayat persetujuan atau pelanggaran dispensasi sebelumnya. |
| **C4** | IPK Mahasiswa | **Benefit** (Semakin tinggi semakin baik) | **15%** | Rentang IPK terakhir mahasiswa aktif (skala $\ge$ 3.50 s/d < 2.50). |
| **C5** | Durasi Ketidakhadiran | **Cost** (Semakin rendah semakin baik) | **10%** | Perkiraan durasi absen kuliah (1-2 hari s/d lebih dari 12 hari). |
| **C6** | Jumlah Matkul Terdampak | **Cost** (Semakin rendah semakin baik) | **15%** | Jumlah mata kuliah aktif yang akan terlewatkan selama dispensasi. |

---

## 🔑 Interpretasi Status Kelayakan

Keputusan kelayakan ditentukan berdasarkan ambang batas nilai preferensi ($V_i$) berikut:

*   🟢 **Sangat Layak Mendapat Dispensasi** ($V_i \ge 0.80$)
    *   *Penjelasan*: Memenuhi sebagian besar kriteria dengan sangat baik (kegiatan resmi/skala besar, dokumen lengkap, IPK tinggi, dan dampak akademik sangat kecil). Pengajuan sangat direkomendasikan untuk langsung disetujui.
*   🟡 **Layak Dipertimbangkan** ($0.60 \le V_i \le 0.79$)
    *   *Penjelasan*: Cukup memenuhi syarat namun memiliki beberapa catatan yang perlu diperhatikan (misal: durasi absen agak lama atau dokumen kurang satu komponen). Membutuhkan kebijakan khusus dari program studi/dosen.
*   🔴 **Kurang Memenuhi Syarat** ($V_i < 0.60$)
    *   *Penjelasan*: Nilai evaluasi di bawah standar kelayakan (kegiatan tidak resmi/skala kecil, dokumen diragukan/tidak lengkap, IPK di bawah standar, atau durasi absen sangat panjang). Pengajuan disarankan untuk ditolak atau direvisi.

---

## 🛠️ Pemecahan Masalah (Troubleshooting)

*   **Tombol "Tambah Mahasiswa" Hilang**: Batas maksimal input adalah 5 mahasiswa. Jika tombol hilang, Anda sudah menginputkan 5 nama.
*   **Tombol Hapus (Ikon Tempat Sampah) Mati**: Batas minimal input adalah 1 mahasiswa. Tombol hapus akan dinonaktifkan jika hanya tersisa 1 baris input agar sistem tetap memiliki data untuk dievaluasi.
*   **Ingin Mengubah Nama Saat Penilaian Berjalan**: Klik tombol **`← Sebelumnya`** pada pertanyaan pertama mahasiswa pertama untuk kembali ke layar setup nama tanpa kehilangan data penilaian yang sudah diisi sebagian (data akan disesuaikan kembali).
*   **Reset Seluruh Sistem**: Klik tombol **`Isi Ulang`** pada bagian bawah halaman Perhitungan atau Hasil untuk menghapus semua jawaban dan kembali ke halaman Beranda dengan kondisi sistem yang bersih.
