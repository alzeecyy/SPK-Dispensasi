# 📋 SPK Dispensasi Mahasiswa — SAW

Sistem Pendukung Keputusan (SPK) untuk menilai kelayakan pengajuan dispensasi akademik mahasiswa menggunakan metode **Simple Additive Weighting (SAW)**.

---

## 🧠 Tentang Sistem

Dispensasi akademik adalah izin resmi yang diberikan kepada mahasiswa untuk tidak mengikuti perkuliahan karena mengikuti kegiatan tertentu yang diakui kampus. Sistem ini hadir untuk membantu pengambil keputusan menilai setiap pengajuan dispensasi secara **objektif, transparan, dan terukur** berdasarkan 6 kriteria yang telah disepakati.

---

## 🎯 Fitur

- **Beranda** — Tampilan ringkasan sistem dan tabel kriteria penilaian
- **Input Data** — Formulir penilaian 6 kriteria berbasis pilihan ganda bertahap
- **Perhitungan** — Tampilan langkah-langkah perhitungan SAW secara transparan (matriks keputusan, normalisasi, nilai preferensi)
- **Hasil** — Rekomendasi kelayakan dispensasi beserta rincian nilai per kriteria dan analisis otomatis

---

## 📐 Metode: Simple Additive Weighting (SAW)

SAW adalah metode pengambilan keputusan multikriteria dengan langkah-langkah:

| Langkah | Keterangan |
|---------|-----------|
| 1 | **Matriks Keputusan** — Nilai tiap kriteria dikumpulkan dalam matriks X (skala 1–5) |
| 2 | **Normalisasi** — Benefit: `r = x / 5` &nbsp;\|&nbsp; Cost: `r = 1 / x` |
| 3 | **Nilai Preferensi** — `Vi = Σ(wj × rij)` — jumlah bobot × nilai ternormalisasi |

---

## 📊 Kriteria Penilaian

| Kode | Kriteria | Atribut | Bobot |
|------|----------|---------|-------|
| C1 | Jenis Kegiatan | Benefit | 25% |
| C2 | Legalitas Dokumen | Benefit | 25% |
| C3 | Riwayat Tujuan Dispensasi | Benefit | 10% |
| C4 | IPK Mahasiswa | Benefit | 15% |
| C5 | Durasi Ketidakhadiran | Cost | 10% |
| C6 | Jumlah Matkul Terdampak | Cost | 15% |

### Interpretasi Hasil

| Nilai Vi | Status |
|----------|--------|
| ≥ 0.80 | ✅ Sangat Layak Mendapat Dispensasi |
| 0.60 – 0.79 | ⚠️ Layak Dipertimbangkan |
| < 0.60 | ❌ Kurang Memenuhi Syarat |

---

## 🗂️ Struktur File

```
Dispensasi SAW/
├── index.html    # Struktur halaman utama
├── style.css     # Tampilan dan desain UI
└── script.js     # Logika perhitungan SAW
```

---

