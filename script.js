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

let students = [
  { id: 1, name: '', answers: {} }
];
let currentStudentIdx = 0;
let curQuestionIdx = 0;
let calcData = null;
let activeHasilStudentId = null;

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

/* SETUP SCREEN MANAGEMENT */
function renderSetup() {
  const container = document.getElementById('students-list-container');
  if (!container) return;

  container.innerHTML = students.map((s, idx) => `
    <div class="student-input-row">
      <span style="font-weight: 700; color: var(--text-muted); font-size: 14px; width: 110px; flex-shrink: 0;">Mahasiswa ${idx + 1}</span>
      <input type="text" placeholder="Masukkan nama mahasiswa (misal: Ahmad / Alternatif ${idx + 1})..." value="${s.name}" oninput="updateStudentName(${s.id}, this.value)" />
      <button class="btn-delete-student" onclick="removeStudentRow(${s.id})" ${students.length === 1 ? 'disabled' : ''} title="Hapus mahasiswa ini">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  `).join('');

  const btnAdd = document.getElementById('btn-add-student');
  if (btnAdd) {
    if (students.length >= 5) {
      btnAdd.style.display = 'none';
    } else {
      btnAdd.style.display = 'inline-flex';
    }
  }
}

function addStudentRow() {
  if (students.length >= 5) return;
  const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
  students.push({ id: nextId, name: '', answers: {} });
  renderSetup();
}

function removeStudentRow(id) {
  if (students.length <= 1) return;
  students = students.filter(s => s.id !== id);
  renderSetup();
}

function updateStudentName(id, name) {
  const s = students.find(x => x.id === id);
  if (s) s.name = name;
}

function startWizard() {
  // Autofill empty names to be extremely user-friendly
  students.forEach((s, idx) => {
    if (!s.name || s.name.trim() === '') {
      s.name = `Mahasiswa ${idx + 1}`;
    } else {
      s.name = s.name.trim();
    }
    if (!s.answers) s.answers = {};
  });

  currentStudentIdx = 0;
  curQuestionIdx = 0;

  document.getElementById('setup-container').style.display = 'none';
  document.getElementById('wizard-container').style.display = 'block';

  const title = document.getElementById('input-page-title');
  const sub = document.getElementById('input-page-sub');
  if (title) title.textContent = 'Pengisian Formulir Penilaian';
  if (sub) sub.textContent = 'Jawab 6 pertanyaan berikut untuk setiap mahasiswa sesuai kondisi pengajuannya.';

  renderQ();
}

/* WIZARD FLOW */
function renderQ() {
  const s = students[currentStudentIdx];
  const c = CRITERIA[curQuestionIdx];
  const totalQ = CRITERIA.length;
  const pct = Math.round((curQuestionIdx / totalQ) * 100);

  document.getElementById('prog').style.width = pct + '%';
  document.getElementById('prog-label').textContent = `Pertanyaan ${curQuestionIdx + 1} dari ${totalQ}`;
  document.getElementById('prog-pct').textContent = pct + '%';

  document.getElementById('current-student-name').textContent = s.name;
  document.getElementById('current-student-badge').textContent = `Mahasiswa ${currentStudentIdx + 1} dari ${students.length}`;

  const optsHtml = c.options.map(o => `
    <button class="opt ${s.answers[c.id] === o.score ? 'selected' : ''}" onclick="selectOpt(${o.score}, this)">
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
      <div class="q-eyebrow">C${curQuestionIdx+1} — ${c.label} &nbsp;${sifatBadge}&nbsp;<span style="color:var(--accent)">Bobot ${(c.bobot*100).toFixed(0)}%</span></div>
      <div class="q-title">${c.question}</div>
    </div>
    <div class="options-list">${optsHtml}</div>
  `;
  updateNavBtns();
}

function selectOpt(score, el) {
  const s = students[currentStudentIdx];
  const c = CRITERIA[curQuestionIdx];
  s.answers[c.id] = score;
  document.querySelectorAll('.opt').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  updateNavBtns();
}

function updateNavBtns() {
  const s = students[currentStudentIdx];
  const hasAns = s.answers[CRITERIA[curQuestionIdx].id] !== undefined;

  const isLastQOfLastStudent = (currentStudentIdx === students.length - 1 && curQuestionIdx === CRITERIA.length - 1);

  // Next button is disabled if there's no answer for the current question
  document.getElementById('btn-next').disabled = !hasAns;

  // On the last question of the last student, hide next button and show hitung button
  if (isLastQOfLastStudent) {
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('btn-hitung').style.display = 'inline-flex';
    document.getElementById('btn-hitung').disabled = !hasAns;
  } else {
    document.getElementById('btn-next').style.display = 'inline-flex';
    document.getElementById('btn-hitung').style.display = 'none';
  }
}

function nextQ() {
  const s = students[currentStudentIdx];
  const hasAns = s.answers[CRITERIA[curQuestionIdx].id] !== undefined;
  if (!hasAns) return;

  if (curQuestionIdx < CRITERIA.length - 1) {
    curQuestionIdx++;
    renderQ();
  } else if (currentStudentIdx < students.length - 1) {
    currentStudentIdx++;
    curQuestionIdx = 0;
    renderQ();
  }
}

function prevQ() {
  if (curQuestionIdx > 0) {
    curQuestionIdx--;
    renderQ();
  } else if (currentStudentIdx > 0) {
    currentStudentIdx--;
    curQuestionIdx = CRITERIA.length - 1;
    renderQ();
  } else {
    // Back to Setup screen
    document.getElementById('wizard-container').style.display = 'none';
    document.getElementById('setup-container').style.display = 'block';

    const title = document.getElementById('input-page-title');
    const sub = document.getElementById('input-page-sub');
    if (title) title.textContent = 'Daftar Mahasiswa yang Dinilai';
    if (sub) sub.textContent = 'Tentukan alternatif mahasiswa yang ingin dinilai kelayakan dispensasinya (maksimal 5).';

    renderSetup();
  }
}

/* SAW CALCULATION LOGIC */
function calcSAW() {
  return students.map(s => {
    const scores = {};
    CRITERIA.forEach(c => { scores[c.id] = s.answers[c.id]; });

    const norm = {};
    CRITERIA.forEach(c => {
      norm[c.id] = c.sifat === 'benefit' ? scores[c.id] / 5 : 1 / scores[c.id];
    });

    let vi = 0;
    CRITERIA.forEach(c => { vi += norm[c.id] * c.bobot; });

    return {
      id: s.id,
      name: s.name,
      scores,
      norm,
      vi
    };
  });
}

function doHitung() {
  const allDone = students.every(s =>
    CRITERIA.every(c => s.answers[c.id] !== undefined)
  );
  if (!allDone) {
    alert('Harap jawab semua pertanyaan untuk seluruh mahasiswa terlebih dahulu.');
    return;
  }

  const results = calcSAW();
  const rankedResults = [...results].sort((a, b) => b.vi - a.vi);
  rankedResults.forEach((r, idx) => {
    r.rank = idx + 1;
  });

  calcData = {
    results: results,
    ranked: rankedResults
  };

  activeHasilStudentId = rankedResults[0].id;

  renderHitung();
  renderHasil();
  unlockTab('hitung');
  unlockTab('hasil');
  goPage('hitung');
}

/* RENDERING PAGES */
function renderHitung() {
  const { results, ranked } = calcData;

  const rawRows = results.map((r, idx) => `
    <tr>
      <td class="label">A${idx + 1}</td>
      <td class="label">${r.name}</td>
      <td>${r.scores.c1}</td>
      <td>${r.scores.c2}</td>
      <td>${r.scores.c3}</td>
      <td>${r.scores.c4}</td>
      <td class="hi">${r.scores.c5}</td>
      <td class="hi">${r.scores.c6}</td>
    </tr>
  `).join('');

  const normRows = results.map((r, idx) => `
    <tr>
      <td class="label">A${idx + 1}</td>
      <td class="label">${r.name}</td>
      <td>${r.norm.c1.toFixed(4)}</td>
      <td>${r.norm.c2.toFixed(4)}</td>
      <td>${r.norm.c3.toFixed(4)}</td>
      <td>${r.norm.c4.toFixed(4)}</td>
      <td class="hi">${r.norm.c5.toFixed(4)}</td>
      <td class="hi">${r.norm.c6.toFixed(4)}</td>
    </tr>
  `).join('');

  const prefRows = results.map((r, idx) => {
    const isWinner = r.id === ranked[0].id;
    const rowStyle = isWinner ? 'style="background:var(--accent-bg)"' : '';
    const rankObj = ranked.find(x => x.id === r.id);
    const rankBadge = isWinner
      ? '<span class="badge badge-acc">1 🏆</span>'
      : `<span class="badge" style="background:var(--border);color:var(--text-muted)">${rankObj.rank}</span>`;

    const labelStyle = isWinner ? 'style="color:var(--accent-dark); font-weight: 700;"' : '';
    const viStyle = isWinner ? 'style="font-weight: 700; color: var(--accent-dark);"' : 'style="font-weight: 600;"';

    return `
      <tr ${rowStyle}>
        <td class="label">A${idx + 1}</td>
        <td class="label" ${labelStyle}>${r.name}</td>
        <td>${(r.norm.c1 * 0.25).toFixed(4)}</td>
        <td>${(r.norm.c2 * 0.25).toFixed(4)}</td>
        <td>${(r.norm.c3 * 0.10).toFixed(4)}</td>
        <td>${(r.norm.c4 * 0.15).toFixed(4)}</td>
        <td>${(r.norm.c5 * 0.10).toFixed(4)}</td>
        <td>${(r.norm.c6 * 0.15).toFixed(4)}</td>
        <td class="hi" ${viStyle}>${r.vi.toFixed(4)}</td>
        <td>${rankBadge}</td>
      </tr>
    `;
  }).join('');

  document.getElementById('hitung-content').innerHTML = `
    <div class="step-block">
      <div class="step-header">
        <div class="step-num">1</div>
        <div class="step-name">Matriks Keputusan (Nilai Mentah)</div>
      </div>
      <div class="formula-box">Nilai asli yang diberikan untuk setiap alternatif mahasiswa pada masing-masing kriteria (skala 1–5).</div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead>
            <tr><th>Kode</th><th>Mahasiswa / Kegiatan</th><th>C1</th><th>C2</th><th>C3</th><th>C4</th><th>C5 (Cost)</th><th>C6 (Cost)</th></tr>
          </thead>
          <tbody>
            ${rawRows}
          </tbody>
        </table>
      </div>
    </div>

    <div class="step-block">
      <div class="step-header">
        <div class="step-num">2</div>
        <div class="step-name">Matriks Normalisasi (r)</div>
      </div>
      <div class="formula-box">
        <strong>Benefit:</strong> r = x / max(x) &nbsp;→&nbsp; max = 5, sehingga r = x / 5<br>
        <strong>Cost:</strong> r = min(x) / x &nbsp;→&nbsp; min = 1, sehingga r = 1 / x
      </div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead>
            <tr><th>Kode</th><th>Mahasiswa</th><th>C1</th><th>C2</th><th>C3</th><th>C4</th><th>C5</th><th>C6</th></tr>
          </thead>
          <tbody>
            ${normRows}
          </tbody>
        </table>
      </div>
    </div>

    <div class="step-block">
      <div class="step-header">
        <div class="step-num">3</div>
        <div class="step-name">Nilai Preferensi &amp; Ranking</div>
      </div>
      <div class="formula-box"><strong>Vi = Σ (Wj × rij)</strong> &nbsp;—&nbsp; Bobot: C1=25%, C2=25%, C3=10%, C4=15%, C5=10%, C6=15%</div>
      <div class="tbl-wrap">
        <table class="tbl">
          <thead>
            <tr><th>Kode</th><th>Mahasiswa / Kegiatan</th><th>C1×W1</th><th>C2×W2</th><th>C3×W3</th><th>C4×W4</th><th>C5×W5</th><th>C6×W6</th><th>Vi</th><th>Ranking</th></tr>
          </thead>
          <tbody>
            ${prefRows}
          </tbody>
        </table>
      </div>
    </div>

    <div style="display:flex;gap:10px;margin-top:0.5rem">
      <button class="btn-pri" onclick="goPage('hasil')">Lihat Hasil Rekomendasi →</button>
      <button class="btn-sec" onclick="resetAll()">Isi Ulang</button>
    </div>
  `;
}

function renderHasil() {
  const { results, ranked } = calcData;

  let rankingCardsHtml = '';
  ranked.forEach(r => {
    const isWinner = r.rank === 1;
    const isSelected = r.id === activeHasilStudentId;
    const cardClass = `ranking-card rank-card-${r.rank > 3 ? 'other' : r.rank} ${isSelected ? 'active-rank' : ''}`;

    let statusClass, statusText;
    if (r.vi >= 0.80) {
      statusClass = 'status-high'; statusText = 'Sangat Layak';
    } else if (r.vi >= 0.60) {
      statusClass = 'status-mid'; statusText = 'Layak Dipertimbangkan';
    } else {
      statusClass = 'status-low'; statusText = 'Kurang Layak';
    }

    const rankBadgeText = isWinner ? '🏆' : r.rank;

    rankingCardsHtml += `
      <div class="${cardClass}" onclick="selectHasilStudent(${r.id})">
        <div style="display: flex; align-items: center;">
          <div class="rank-badge">${rankBadgeText}</div>
          <div class="ranking-info">
            <div class="ranking-name">${r.name}</div>
            <div style="font-size: 12.5px; color: var(--text-muted); font-weight: 500;">Alternatif A${results.findIndex(x => x.id === r.id) + 1}</div>
          </div>
        </div>
        <div class="ranking-score-group">
          <span class="badge ${statusClass}">${statusText}</span>
          <div class="ranking-vi">${r.vi.toFixed(4)}</div>
        </div>
      </div>
    `;
  });

  const activeStudent = results.find(r => r.id === activeHasilStudentId);
  let detailsHtml = '';

  if (activeStudent) {
    let statusClass, statusText, statusDetail;
    if (activeStudent.vi >= 0.80) {
      statusClass = 'status-high'; statusText = 'Sangat Layak Mendapat Dispensasi';
      statusDetail = 'Pengajuan ini memenuhi seluruh kriteria dengan baik dan sangat direkomendasikan untuk disetujui.';
    } else if (activeStudent.vi >= 0.60) {
      statusClass = 'status-mid'; statusText = 'Layak Dipertimbangkan';
      statusDetail = 'Pengajuan ini cukup memenuhi syarat namun beberapa kriteria masih perlu diperhatikan.';
    } else {
      statusClass = 'status-low'; statusText = 'Kurang Memenuhi Syarat';
      statusDetail = 'Pengajuan ini belum memenuhi standar kelayakan yang ditetapkan.';
    }

    const bkRows = CRITERIA.map(c => {
      const pct = (activeStudent.norm[c.id] * 100).toFixed(1);
      return `
        <div class="bk-row">
          <div class="bk-label">C${CRITERIA.indexOf(c)+1} — ${c.label}</div>
          <div class="bk-track"><div class="bk-fill" style="width:${pct}%"></div></div>
          <div class="bk-score">${activeStudent.scores[c.id]}/5</div>
        </div>
      `;
    }).join('');

    const weak = CRITERIA.filter(c =>
      (c.sifat === 'benefit' && activeStudent.scores[c.id] <= 2) ||
      (c.sifat === 'cost' && activeStudent.scores[c.id] >= 4)
    ).map(c => c.label);

    let analysisText = `Nilai preferensi SAW yang diperoleh adalah <strong>${activeStudent.vi.toFixed(4)}</strong>. ${statusDetail}`;
    if (weak.length) {
      analysisText += ` Kriteria yang perlu diperhatikan/diperbaiki: <strong>${weak.join(', ')}</strong>.`;
    }

    detailsHtml = `
      <div class="result-hero" style="margin-top: 1rem;">
        <div class="result-vi-label">Nilai Preferensi SAW (Vi) — ${activeStudent.name}</div>
        <div class="result-vi">${activeStudent.vi.toFixed(4)}</div>
        <div><span class="result-status ${statusClass}">${statusText}</span></div>
      </div>

      <div class="card" style="margin-bottom:1rem">
        <div class="section-title">Rincian Nilai per Kriteria: ${activeStudent.name}</div>
        <div class="breakdown-list">${bkRows}</div>
      </div>

      <div class="analysis" style="margin-bottom: 2rem;">
        <div class="analysis-label">Analisis Otomatis (${activeStudent.name})</div>
        <p>${analysisText}</p>
      </div>
    `;
  }

  const summaryRows = results.map((r, idx) => {
    const rankObj = ranked.find(x => x.id === r.id);
    let statusClass, statusText;
    if (r.vi >= 0.80) {
      statusClass = 'status-high'; statusText = 'Sangat Layak';
    } else if (r.vi >= 0.60) {
      statusClass = 'status-mid'; statusText = 'Layak';
    } else {
      statusClass = 'status-low'; statusText = 'Kurang Layak';
    }

    const rowStyle = r.id === ranked[0].id ? 'style="background:var(--accent-bg)"' : '';

    return `
      <tr ${rowStyle}>
        <td class="label">A${idx + 1}</td>
        <td class="label">${r.name}</td>
        <td style="font-weight: 700;">${r.vi.toFixed(4)}</td>
        <td><span class="badge ${statusClass}">${statusText}</span></td>
        <td class="hi" style="font-weight: 800;">${rankObj.rank}</td>
      </tr>
    `;
  }).join('');

  document.getElementById('hasil-content').innerHTML = `
    <div class="section-title" style="margin-top: 1rem;">Hasil Pemeringkatan Kelayakan</div>
    <div class="ranking-list">
      ${rankingCardsHtml}
    </div>

    <div id="hasil-selected-detail">
      ${detailsHtml}
    </div>

    <div class="card" style="margin-top:1.5rem">
      <div class="section-title">Ringkasan Evaluasi Seluruh Alternatif</div>
      <div class="tbl-wrap" style="border:none;border-radius:0">
        <table class="tbl">
          <thead>
            <tr><th>Kode</th><th>Mahasiswa</th><th>Nilai SAW (Vi)</th><th>Status Kelayakan</th><th>Peringkat</th></tr>
          </thead>
          <tbody>
            ${summaryRows}
          </tbody>
        </table>
      </div>
    </div>

    <div style="display:flex;gap:10px;margin-top:1.5rem;flex-wrap:wrap">
      <button class="btn-sec" onclick="goPage('hitung')">← Lihat Perhitungan</button>
      <button class="btn-sec" onclick="resetAll()">Isi Ulang</button>
    </div>
  `;
}

function selectHasilStudent(id) {
  activeHasilStudentId = id;
  renderHasil();
  
  const detailEl = document.getElementById('hasil-selected-detail');
  if (detailEl) {
    detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function resetAll() {
  students = [
    { id: 1, name: '', answers: {} }
  ];
  currentStudentIdx = 0;
  curQuestionIdx = 0;
  calcData = null;
  activeHasilStudentId = null;

  document.getElementById('tab-hitung').classList.add('disabled');
  document.getElementById('tab-hasil').classList.add('disabled');
  document.getElementById('hitung-content').innerHTML = '<div class="empty-state"><div class="empty-icon">⚙️</div><p>Lengkapi Input Data terlebih dahulu untuk melihat perhitungan.</p></div>';
  document.getElementById('hasil-content').innerHTML = '<div class="empty-state"><div class="empty-icon">📊</div><p>Belum ada data. Silakan lengkapi Input Data terlebih dahulu.</p></div>';

  document.getElementById('wizard-container').style.display = 'none';
  document.getElementById('setup-container').style.display = 'block';

  const title = document.getElementById('input-page-title');
  const sub = document.getElementById('input-page-sub');
  if (title) title.textContent = 'Daftar Mahasiswa yang Dinilai';
  if (sub) sub.textContent = 'Tentukan alternatif mahasiswa yang ingin dinilai kelayakan dispensasinya (maksimal 5).';

  renderSetup();
  goPage('beranda');
}

// Initial Call
renderSetup();

