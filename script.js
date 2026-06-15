const CRITERIA = [
  {
    id:'c1', label:'Jenis Kegiatan', sifat:'benefit', bobot:0.25,
    question:'Apa jenis kegiatan yang menjadi dasar pengajuan dispensasi?',
    options:[
      {score:5, main:'Lomba atau kegiatan tingkat internasional / nasional', sub:'Kompetisi, konferensi, atau penugasan yang mewakili kampus di tingkat nasional atau internasional'},
      {score:4, main:'Kegiatan resmi tingkat universitas / rektorat', sub:'Program yang diselenggarakan atau disahkan langsung oleh rektorat Unsoed'},
      {score:3, main:'Kegiatan tingkat fakultas atau kolaborasi antar lembaga', sub:'Kegiatan yang difasilitasi fakultas atau melibatkan kerja sama dengan lembaga lain'},
      {score:2, main:'Kegiatan internal organisasi / himpunan', sub:'Seminar, suksesi kepengurusan, atau kegiatan resmi di lingkup organisasi mahasiswa'},
      {score:1, main:'Kegiatan internal kecil', sub:'Rapat rutin, latihan biasa UKM, atau pertemuan informal'}
    ]
  },
  {
    id:'c2', label:'Legalitas Dokumen', sifat:'benefit', bobot:0.25,
    question:'Bagaimana kelengkapan dokumen pendukung pengajuan dispensasi?',
    options:[
      {score:5, main:'Lengkap: cap resmi, nomor surat, dan identitas lembaga penerbit', sub:'Semua elemen dokumen terpenuhi dengan jelas dan dapat diverifikasi'},
      {score:4, main:'Lengkap, tapi salah satu elemen kurang jelas', sub:'Dokumen hampir sempurna, satu elemen sedikit tidak terbaca atau kurang jelas'},
      {score:3, main:'Dokumen ada, tidak semua komponen terpenuhi', sub:'Sebagian komponen wajib hadir, sebagian tidak ada atau tidak lengkap'},
      {score:2, main:'Dokumen tidak lengkap atau hanya sebagian', sub:'Hanya ada satu atau dua komponen, sisanya tidak dilampirkan'},
      {score:1, main:'Tidak ada dokumen atau dokumen meragukan keasliannya', sub:'Tidak ada lampiran sama sekali, atau dokumen yang ada diragukan keasliannya'}
    ]
  },
  {
    id:'c3', label:'Riwayat Tujuan Dispensasi', sifat:'benefit', bobot:0.10,
    question:'Bagaimana riwayat pengajuan dispensasi sebelumnya?',
    options:[
      {score:5, main:'Pernah disetujui untuk kegiatan bergengsi', sub:'Lomba nasional/internasional atau penugasan resmi — riwayat sangat baik'},
      {score:4, main:'Pernah disetujui untuk kegiatan biasa atau organisasi', sub:'Dispensasi sebelumnya diterima dan kewajiban pasca-dispensasi dipenuhi'},
      {score:3, main:'Belum pernah mengajukan dispensasi', sub:'Ini merupakan pengajuan pertama kali'},
      {score:2, main:'Pernah ditolak karena tidak memenuhi syarat', sub:'Ada riwayat penolakan akibat dokumen kurang atau tidak memenuhi ketentuan'},
      {score:1, main:'Pernah ditolak karena dokumen palsu atau pelanggaran berat', sub:'Ada riwayat pelanggaran serius terkait pengajuan dispensasi sebelumnya'}
    ]
  },
  {
    id:'c4', label:'IPK Mahasiswa', sifat:'benefit', bobot:0.15,
    question:'Berapa kisaran IPK terakhir yang dimiliki?',
    options:[
      {score:5, main:'IPK ≥ 3,50', sub:'Prestasi akademik sangat baik'},
      {score:4, main:'IPK 3,00 – 3,49', sub:'Prestasi akademik baik'},
      {score:3, main:'IPK 2,75 – 2,99', sub:'Prestasi akademik cukup'},
      {score:2, main:'IPK 2,50 – 2,74', sub:'Batas minimum yang disebut dalam ketentuan akademik'},
      {score:1, main:'IPK < 2,50', sub:'Di bawah batas minimum yang ditetapkan'}
    ]
  },
  {
    id:'c5', label:'Durasi Ketidakhadiran', sifat:'cost', bobot:0.10,
    question:'Berapa lama perkiraan ketidakhadiran akibat kegiatan ini?',
    options:[
      {score:1, main:'1 – 2 hari', sub:'Absen paling singkat, dampak minimal pada perkuliahan'},
      {score:2, main:'3 – 5 hari', sub:'Absen singkat, masih bisa dikompensasi dengan baik'},
      {score:3, main:'6 – 8 hari', sub:'Absen cukup lama, perlu koordinasi aktif dengan dosen'},
      {score:4, main:'9 – 12 hari', sub:'Absen panjang, berpotensi melampaui batas toleransi kehadiran'},
      {score:5, main:'Lebih dari 12 hari', sub:'Absen sangat panjang, risiko tinggi tidak memenuhi syarat kehadiran minimum'}
    ]
  },
  {
    id:'c6', label:'Jumlah Matkul Terdampak', sifat:'cost', bobot:0.15,
    question:'Berapa jumlah mata kuliah yang perkuliahannya akan terlewat?',
    options:[
      {score:1, main:'1 – 2 mata kuliah', sub:'Dampak paling minimal'},
      {score:2, main:'3 – 6 mata kuliah', sub:'Dampak kecil, masih mudah dikomunikasikan ke dosen'},
      {score:3, main:'7 – 10 mata kuliah', sub:'Dampak sedang, butuh koordinasi aktif'},
      {score:4, main:'11 – 14 mata kuliah', sub:'Dampak cukup besar, banyak jadwal yang bertabrakan'},
      {score:5, main:'Lebih dari 15 mata kuliah', sub:'Dampak sangat besar, hampir semua mata kuliah aktif terdampak'}
    ]
  }
];

let cur = 0;
let answers = {};
let calcData = null;

function goPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  const tabMap = { beranda: 0, input: 1, hitung: 2, hasil: 3, contoh: 4, tentang: 5 };
  document.querySelectorAll('.nav-tab')[tabMap[id]].classList.add('active');
  window.scrollTo(0, 0);
}

function unlockTab(id) {
  const map = { hitung: 'tab-hitung', hasil: 'tab-hasil' };
  if (map[id]) document.getElementById(map[id]).classList.remove('disabled');
}

function renderQ() {
  const c = CRITERIA[cur];
  const total = CRITERIA.length;
  const pct = Math.round((cur / total) * 100);
  document.getElementById('prog').style.width = pct + '%';
  document.getElementById('prog-label').textContent = `Pertanyaan ${cur + 1} dari ${total}`;
  document.getElementById('prog-pct').textContent = pct + '%';

  const optsHtml = c.options.map(o => `
    <button class="opt ${answers[c.id] === o.score ? 'selected' : ''}" onclick="selectOpt(${o.score}, this)">
      <div class="opt-radio"><div class="opt-radio-dot"></div></div>
      <div class="opt-body">
        <div class="opt-main">${o.main}</div>
        <div class="opt-sub">${o.sub}</div>
      </div>
    </button>
  `).join('');

  const sifatBadge = c.sifat === 'benefit'
    ? '<span class="badge badge-benefit">Benefit</span>'
    : '<span class="badge badge-cost">Cost</span>';

  document.getElementById('q-area').innerHTML = `
    <div class="q-card">
      <div class="q-eyebrow">C${cur+1} — ${c.label} &nbsp;${sifatBadge}&nbsp;<span style="color:var(--accent)">Bobot ${(c.bobot*100).toFixed(0)}%</span></div>
      <div class="q-title">${c.question}</div>
    </div>
    <div class="options-list">${optsHtml}</div>
  `;
  updateNavBtns();
}

function selectOpt(score, el) {
  const c = CRITERIA[cur];
  answers[c.id] = score;
  document.querySelectorAll('.opt').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  updateNavBtns();
}

function updateNavBtns() {
  const hasAns = answers[CRITERIA[cur].id] !== undefined;
  const isLast = cur === CRITERIA.length - 1;
  document.getElementById('btn-prev').disabled = cur === 0;
  document.getElementById('btn-next').disabled = !hasAns || isLast;
  document.getElementById('btn-next').style.display = isLast ? 'none' : 'inline-flex';
  const bh = document.getElementById('btn-hitung');
  bh.style.display = isLast ? 'inline-flex' : 'none';
  bh.disabled = !hasAns;
}

function nextQ() { if (cur < CRITERIA.length - 1) { cur++; renderQ(); } }
function prevQ() { if (cur > 0) { cur--; renderQ(); } }

function calcSAW() {
  const scores = {};
  CRITERIA.forEach(c => { scores[c.id] = answers[c.id]; });
  const norm = {};
  CRITERIA.forEach(c => {
    norm[c.id] = c.sifat === 'benefit' ? scores[c.id] / 5 : 1 / scores[c.id];
  });
  let vi = 0;
  CRITERIA.forEach(c => { vi += norm[c.id] * c.bobot; });
  return { scores, norm, vi };
}

function doHitung() {
  const allDone = CRITERIA.every(c => answers[c.id] !== undefined);
  if (!allDone) { alert('Harap jawab semua pertanyaan terlebih dahulu.'); return; }
  calcData = calcSAW();
  renderHitung();
  renderHasil();
  unlockTab('hitung');
  unlockTab('hasil');
  goPage('hitung');
}

function renderHitung() {
  const { scores, norm, vi } = calcData;

  const matriks = CRITERIA.map(c =>
    `<tr><td class="label">C${CRITERIA.indexOf(c)+1} — ${c.label}</td>
     <td><span class="badge ${c.sifat==='benefit'?'badge-benefit':'badge-cost'}">${c.sifat}</span></td>
     <td>${(c.bobot*100).toFixed(0)}%</td>
     <td class="hi">${scores[c.id]}</td></tr>`
  ).join('');

  const normRows = CRITERIA.map(c => {
    const r = norm[c.id];
    const formula = c.sifat === 'benefit'
      ? `${scores[c.id]} / 5`
      : `1 / ${scores[c.id]}`;
    return `<tr><td class="label">C${CRITERIA.indexOf(c)+1} — ${c.label}</td>
      <td>${formula}</td>
      <td class="hi">${r.toFixed(4)}</td>
      <td>${(c.bobot*100).toFixed(0)}%</td>
      <td class="hi">${(r * c.bobot).toFixed(4)}</td></tr>`;
  }).join('');

  const viRows = CRITERIA.map(c =>
    `<tr><td class="label">C${CRITERIA.indexOf(c)+1}</td>
     <td>${(norm[c.id]).toFixed(4)}</td>
     <td>× ${(c.bobot*100).toFixed(0)}%</td>
     <td class="hi">${(norm[c.id]*c.bobot).toFixed(4)}</td></tr>`
  ).join('');

  document.getElementById('hitung-content').innerHTML = `
    <div class="step-block">
      <div class="step-header">
        <div class="step-num">1</div>
        <div class="step-name">Matriks Keputusan</div>
      </div>
      <div class="formula-box">Nilai mentah dari setiap kriteria berdasarkan jawaban yang dipilih. Skala 1–5 untuk semua kriteria.</div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th>Kriteria</th><th>Atribut</th><th>Bobot</th><th>Nilai (x)</th></tr></thead>
          <tbody>${matriks}</tbody>
        </table>
      </div>
    </div>

    <div class="step-block">
      <div class="step-header">
        <div class="step-num">2</div>
        <div class="step-name">Normalisasi Matriks</div>
      </div>
      <div class="formula-box">
        <strong>Benefit:</strong> r = x / max(x) &nbsp;→&nbsp; max = 5, sehingga r = x / 5<br>
        <strong>Cost:</strong> r = min(x) / x &nbsp;→&nbsp; min = 1, sehingga r = 1 / x
      </div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th>Kriteria</th><th>Formula</th><th>r (ternormalisasi)</th><th>Bobot (w)</th><th>w × r</th></tr></thead>
          <tbody>${normRows}</tbody>
        </table>
      </div>
    </div>

    <div class="step-block">
      <div class="step-header">
        <div class="step-num">3</div>
        <div class="step-name">Nilai Preferensi (Vi)</div>
      </div>
      <div class="formula-box"><strong>Vi = Σ (wj × rij)</strong> &nbsp;—&nbsp; Jumlah dari seluruh perkalian bobot dan nilai ternormalisasi.</div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead><tr><th>Kriteria</th><th>r</th><th></th><th>w × r</th></tr></thead>
          <tbody>${viRows}
          <tr style="background:var(--accent-bg)">
            <td colspan="3" style="text-align:right;font-weight:600;color:var(--accent-dark)">Total Vi =</td>
            <td style="font-weight:700;color:var(--accent-dark)">${vi.toFixed(4)}</td>
          </tr></tbody>
        </table>
      </div>
    </div>

    <div style="display:flex;gap:10px;margin-top:0.5rem">
      <button class="btn-pri" onclick="goPage('hasil')">Lihat Hasil →</button>
      <button class="btn-sec" onclick="resetAll()">Isi Ulang</button>
    </div>
  `;
}

function renderHasil() {
  const { scores, norm, vi } = calcData;
  let statusClass, statusText, statusDetail;
  if (vi >= 0.80) {
    statusClass = 'status-high'; statusText = 'Sangat Layak Mendapat Dispensasi';
    statusDetail = 'Pengajuan ini memenuhi seluruh kriteria dengan baik dan sangat direkomendasikan untuk disetujui.';
  } else if (vi >= 0.60) {
    statusClass = 'status-mid'; statusText = 'Layak Dipertimbangkan';
    statusDetail = 'Pengajuan ini cukup memenuhi syarat namun beberapa kriteria masih perlu diperhatikan.';
  } else {
    statusClass = 'status-low'; statusText = 'Kurang Memenuhi Syarat';
    statusDetail = 'Pengajuan ini belum memenuhi standar kelayakan yang ditetapkan.';
  }

  const bkRows = CRITERIA.map(c => {
    const pct = (norm[c.id] * 100).toFixed(1);
    return `<div class="bk-row">
      <div class="bk-label">C${CRITERIA.indexOf(c)+1} — ${c.label}</div>
      <div class="bk-track"><div class="bk-fill" style="width:${pct}%"></div></div>
      <div class="bk-score">${scores[c.id]}/5</div>
    </div>`;
  }).join('');

  const weak = CRITERIA.filter(c =>
    (c.sifat === 'benefit' && scores[c.id] <= 2) ||
    (c.sifat === 'cost' && scores[c.id] >= 4)
  ).map(c => c.label);

  let analysisText = `Nilai preferensi SAW yang diperoleh adalah <strong>${vi.toFixed(4)}</strong>. ${statusDetail}`;
  if (weak.length) analysisText += ` Kriteria yang perlu diperbaiki: <strong>${weak.join(', ')}</strong>.`;

  document.getElementById('hasil-content').innerHTML = `
    <div class="result-hero">
      <div class="result-vi-label">Nilai Preferensi SAW (Vi)</div>
      <div class="result-vi">${vi.toFixed(4)}</div>
      <div><span class="result-status ${statusClass}">${statusText}</span></div>
    </div>

    <div class="card" style="margin-bottom:1rem">
      <div class="section-title">Rincian Nilai per Kriteria</div>
      <div class="breakdown-list">${bkRows}</div>
    </div>

    <div class="analysis">
      <div class="analysis-label">Analisis Otomatis</div>
      <p>${analysisText}</p>
    </div>

    <div class="card" style="margin-top:1rem">
      <div class="section-title">Ringkasan Skor</div>
      <div class="tbl-wrap" style="border:none;border-radius:0">
        <table class="tbl">
          <thead><tr><th>Kriteria</th><th>Atribut</th><th>Skor</th><th>r (norm)</th><th>Bobot</th><th>Kontribusi</th></tr></thead>
          <tbody>
            ${CRITERIA.map(c => `<tr>
              <td class="label">C${CRITERIA.indexOf(c)+1} — ${c.label}</td>
              <td><span class="badge ${c.sifat==='benefit'?'badge-benefit':'badge-cost'}">${c.sifat}</span></td>
              <td>${scores[c.id]}</td>
              <td>${norm[c.id].toFixed(4)}</td>
              <td>${(c.bobot*100).toFixed(0)}%</td>
              <td class="hi">${(norm[c.id]*c.bobot).toFixed(4)}</td>
            </tr>`).join('')}
            <tr style="background:var(--accent-bg)">
              <td colspan="5" style="text-align:right;font-weight:600;color:var(--accent-dark)">Nilai Preferensi (Vi)</td>
              <td style="font-weight:700;color:var(--accent-dark)">${vi.toFixed(4)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style="display:flex;gap:10px;margin-top:1.25rem;flex-wrap:wrap">
      <button class="btn-sec" onclick="goPage('hitung')">← Lihat Perhitungan</button>
      <button class="btn-sec" onclick="resetAll()">Isi Ulang</button>
    </div>
  `;
}

function resetAll() {
  cur = 0; answers = {}; calcData = null;
  document.getElementById('tab-hitung').classList.add('disabled');
  document.getElementById('tab-hasil').classList.add('disabled');
  document.getElementById('hitung-content').innerHTML = '<div class="empty-state"><div class="empty-icon">⚙️</div><p>Lengkapi Input Data terlebih dahulu untuk melihat perhitungan.</p></div>';
  document.getElementById('hasil-content').innerHTML = '<div class="empty-state"><div class="empty-icon">📊</div><p>Belum ada data. Silakan lengkapi Input Data terlebih dahulu.</p></div>';
  renderQ();
  goPage('beranda');
}

renderQ();
