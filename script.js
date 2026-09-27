const DEFAULT_QUESTIONS = [
  {
    id: 1,
    pertanyaan: "Perangkat Komputer atau Elektronik Di Sekolah",
    jawaban: [
      { teks: "Komputer", poin: 25 },
      { teks: "Laptop", poin: 20 },
      { teks: "Speaker", poin: 15 },
      { teks: "Tablet", poin: 10 },
      { teks: "Wi-Fi", poin: 5 }
    ]
  },
  {
    id: 2,
    pertanyaan: "Ekskul Yang ada di sekolah pada bidang olahraga",
    jawaban: [
      { teks: "Futsal", poin: 25 },
      { teks: "Basket", poin: 20 },
      { teks: "Bulu Tangkis", poin: 15 },
      { teks: "Pencak Silat", poin: 10 }
    ]
  },
  {
    id: 3,
    pertanyaan: "Negara Yang Bergabung di ASEAN Berdasarkan jumlah penduduk terbanyak",
    jawaban: [
      { teks: "Indonesia", poin: 50 },
      { teks: "Filipina", poin: 45 },
      { teks: "Vietnam", poin: 40 },
      { teks: "Thailand", poin: 35 },
      { teks: "Myanmar", poin: 30 },
      { teks: "Malaysia", poin: 25 },
      { teks: "Kamboja", poin: 20 },
      { teks: "Laos", poin: 15 },
      { teks: "Singapura", poin: 10 },
      { teks: "Brunei Darussalam", poin: 5 }
    ]
  },
  {
    id: 4,
    pertanyaan: "Hari Yang disukai Oleh anak-anak SMP",
    jawaban: [
      { teks: "Minggu", poin: 30 },
      { teks: "Sabtu", poin: 25 },
      { teks: "Jumat", poin: 20 }
    ]
  },
  {
    id: 5,
    pertanyaan: "Mata Pelajaran Yang disukai oleh Anak SMP",
    jawaban: [
      { teks: "PJOK", poin: 25 },
      { teks: "Seni Budaya", poin: 20 },
      { teks: "Informatika", poin: 15 },
      { teks: "Inggris", poin: 10 },
      { teks: "Indonesia", poin: 5 }
    ]
  }
];

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmNode = null;
    this.bgmGain = null;
    this.isBgmPlaying = false;
    this.volume = 0.5;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    this.init();
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(523.25, now);
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);

    osc2.frequency.setValueAtTime(659.25, now + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(880.00, now + 0.35);

    gain.gain.setValueAtTime(this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.15);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.5);
  }

  playWrong() {
    this.init();
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(130, now);
    osc2.frequency.setValueAtTime(124, now);

    gain.gain.setValueAtTime(this.volume * 1.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.7);
    osc2.stop(now + 0.7);
  }

  playStealAlarm() {
    this.init();
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now + (i * 0.2));
      gain.gain.setValueAtTime(this.volume, now + (i * 0.2));
      gain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.2) + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + (i * 0.2));
      osc.stop(now + (i * 0.2) + 0.15);
    }
  }

  playFanfare() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const now = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + (idx * 0.12));
      gain.gain.setValueAtTime(this.volume, now + (idx * 0.12));
      gain.gain.exponentialRampToValueAtTime(0.01, now + (idx * 0.12) + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + (idx * 0.12));
      osc.stop(now + (idx * 0.12) + 0.4);
    });
  }

  playPop() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(this.volume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  toggleBGM() {
    this.init();
    if (this.isBgmPlaying) this.stopBGM();
    else this.startBGM();
    return this.isBgmPlaying;
  }

  startBGM() {
    if (this.isBgmPlaying) return;
    const now = this.ctx.currentTime;
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(this.volume * 0.2, now);
    this.bgmGain.connect(this.ctx.destination);

    this.bgmNode = this.ctx.createOscillator();
    this.bgmNode.type = 'sine';
    this.bgmNode.frequency.setValueAtTime(110, now);

    this.bgmNode.connect(this.bgmGain);
    this.bgmNode.start(now);
    this.isBgmPlaying = true;
  }

  stopBGM() {
    if (this.bgmGain) {
      this.bgmGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      setTimeout(() => {
        if (this.bgmNode) this.bgmNode.stop();
        this.isBgmPlaying = false;
      }, 300);
    }
  }

  setVolume(val) {
    this.volume = parseFloat(val);
    if (this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.volume * 0.2, this.ctx.currentTime);
    }
  }
}

const sounds = new SoundEngine();

let gameState = {
  questions: DEFAULT_QUESTIONS,
  currentQIndex: 0,
  revealed: [],
  roundPoints: 0,
  scores: { team1: 0, team2: 0 },
  activeTeam: 1,
  originalTurnTeam: 1,
  strikes: 0,
  phase: 'NORMAL',
  config: {
    appTitle: "FAMILY 100 SMP",
    team1Name: "TIM A",
    team2Name: "TIM B",
    gasUrl: ""
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadLocalSettings();
  initClock();
  setupEventListeners();
  loadQuestion(0);
});

function initClock() {
  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock-time').textContent = `${hours}:${mins}:${secs}`;

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    document.getElementById('clock-date').textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  };
  updateClock();
  setInterval(updateClock, 1000);
}

function loadQuestion(index) {
  if (index < 0 || index >= gameState.questions.length) return;

  gameState.currentQIndex = index;
  const currentQ = gameState.questions[index];

  gameState.revealed = new Array(currentQ.jawaban.length).fill(false);
  gameState.roundPoints = 0;
  gameState.strikes = 0;
  gameState.phase = 'NORMAL';
  gameState.originalTurnTeam = gameState.activeTeam;

  document.getElementById('disp-round-num').textContent = index + 1;
  document.getElementById('disp-question-text').textContent = currentQ.pertanyaan;
  document.getElementById('disp-round-points').textContent = '0';

  updatePhaseBadge();
  renderBoard();
}

function renderBoard() {
  const board = document.getElementById('answer-board');
  board.innerHTML = '';

  const currentQ = gameState.questions[gameState.currentQIndex];
  
  const totalAnswers = currentQ.jawaban.length;

  for (let i = 0; i < totalAnswers; i++) {
    const isRevealed = gameState.revealed[i] || false;
    const ansItem = currentQ.jawaban[i];

    const card = document.createElement('div');
    const isUnlocked = (gameState.phase === 'ROUND_END');
    card.className = `flip-card ${isRevealed ? 'revealed' : ''} ${isUnlocked ? 'unlocked' : ''}`;

    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <div class="slot-num">${i + 1}</div>
        </div>
        <div class="flip-card-back">
          <span class="ans-text">${ansItem.teks}</span>
          <span class="ans-points">${ansItem.poin}</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      if (gameState.phase === 'ROUND_END') {
        toggleAnswerSlot(i);
      }
    });

    board.appendChild(card);
  }
}

function updatePhaseBadge() {
  const badge = document.getElementById('phase-badge');
  if (gameState.phase === 'NORMAL') {
    badge.textContent = `FASE UTAMA (${gameState.config[`team${gameState.activeTeam}Name`]})`;
    badge.className = 'phase-badge normal';
  } else if (gameState.phase === 'STEAL') {
    badge.textContent = `FASE STEAL (${gameState.config[`team${gameState.activeTeam}Name`]})`;
    badge.className = 'phase-badge steal';
  } else {
    badge.textContent = 'RONDE SELESAI (SISA JAWABAN TERBUKA)';
    badge.className = 'phase-badge ended';
  }
}

function updateScoresUI() {
  document.getElementById('disp-team1-score').textContent = gameState.scores.team1;
  document.getElementById('disp-team2-score').textContent = gameState.scores.team2;
  document.getElementById('disp-round-points').textContent = gameState.roundPoints;

  document.getElementById('card-team-1').classList.toggle('active-turn', gameState.activeTeam === 1);
  document.getElementById('card-team-2').classList.toggle('active-turn', gameState.activeTeam === 2);
}

function submitAnswer() {
  if (gameState.phase === 'ROUND_END') return;

  const inputEl = document.getElementById('input-answer');
  const userText = inputEl.value.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!userText) return;

  const currentQ = gameState.questions[gameState.currentQIndex];
  let foundIndex = -1;

  currentQ.jawaban.forEach((item, idx) => {
    if (item.teks.toLowerCase().trim().replace(/\s+/g, ' ') === userText) {
      foundIndex = idx;
    }
  });

  inputEl.value = '';

  if (foundIndex !== -1) {
    if (gameState.revealed[foundIndex]) return;

    gameState.revealed[foundIndex] = true;
    gameState.roundPoints += currentQ.jawaban[foundIndex].poin;
    sounds.playCorrect();
    renderBoard();
    updateScoresUI();

    const allRevealed = currentQ.jawaban.every((_, idx) => gameState.revealed[idx]);

    if (gameState.phase === 'NORMAL') {
      if (allRevealed) {
        awardRoundPoints(gameState.activeTeam);
      }
    } else if (gameState.phase === 'STEAL') {
      awardRoundPoints(gameState.activeTeam);
    }

  } else {
    triggerWrongAnswer();
  }
}

function triggerWrongAnswer() {
  if (gameState.phase === 'ROUND_END') return;

  gameState.strikes++;
  sounds.playWrong();
  showStrikeOverlay(gameState.strikes);

  if (gameState.phase === 'NORMAL') {
    if (gameState.strikes >= 3) {
      setTimeout(() => {
        gameState.phase = 'STEAL';
        gameState.activeTeam = gameState.activeTeam === 1 ? 2 : 1;
        sounds.playStealAlarm();
        updatePhaseBadge();
        updateScoresUI();
      }, 1100);
    }
  } else if (gameState.phase === 'STEAL') {
    setTimeout(() => {
      awardRoundPoints(gameState.originalTurnTeam);
    }, 1100);
  }
}

function awardRoundPoints(teamNum) {
  if (teamNum === 1) {
    gameState.scores.team1 += gameState.roundPoints;
  } else {
    gameState.scores.team2 += gameState.roundPoints;
  }
  
  gameState.phase = 'ROUND_END';
  updatePhaseBadge();
  updateScoresUI();
  sounds.playFanfare();
  renderBoard();
}

function toggleAnswerSlot(slotIdx) {
  gameState.revealed[slotIdx] = !gameState.revealed[slotIdx];
  sounds.playPop();
  renderBoard();
}

function showStrikeOverlay(count) {
  const overlay = document.getElementById('strike-overlay');
  const container = document.getElementById('strike-container');
  container.innerHTML = '';

  const displayCount = Math.min(count, 3);
  for (let i = 0; i < displayCount; i++) {
    const xMark = document.createElement('div');
    xMark.className = 'strike-x';
    xMark.textContent = '❌';
    container.appendChild(xMark);
  }

  overlay.classList.remove('hidden');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 1000);
}

function setupEventListeners() {
  document.getElementById('form-answer').addEventListener('submit', (e) => {
    e.preventDefault();
    submitAnswer();
  });

  document.getElementById('btn-manual-wrong').addEventListener('click', triggerWrongAnswer);

  document.getElementById('btn-prev-q').addEventListener('click', () => {
    if (gameState.currentQIndex > 0) loadQuestion(gameState.currentQIndex - 1);
  });
  document.getElementById('btn-next-q').addEventListener('click', () => {
    if (gameState.currentQIndex < gameState.questions.length - 1) loadQuestion(gameState.currentQIndex + 1);
  });

  document.getElementById('btn-switch-team').addEventListener('click', () => {
    gameState.activeTeam = gameState.activeTeam === 1 ? 2 : 1;
    updatePhaseBadge();
    updateScoresUI();
  });

  document.getElementById('btn-reset-strikes').addEventListener('click', () => {
    gameState.strikes = 0;
  });

  document.getElementById('btn-reveal-all').addEventListener('click', () => {
    const currentQ = gameState.questions[gameState.currentQIndex];
    gameState.revealed = new Array(currentQ.jawaban.length).fill(true);
    gameState.phase = 'ROUND_END';
    sounds.playPop();
    updatePhaseBadge();
    renderBoard();
  });

  document.getElementById('btn-bgm').addEventListener('click', (e) => {
    const isPlaying = sounds.toggleBGM();
    e.target.textContent = isPlaying ? '🎵 BGM: ON' : '🎵 BGM: OFF';
  });

  document.getElementById('volume-slider').addEventListener('input', (e) => {
    sounds.setVolume(e.target.value);
  });

  const modal = document.getElementById('admin-modal');
  document.getElementById('btn-open-admin').addEventListener('click', () => modal.classList.remove('hidden'));
  document.getElementById('btn-close-admin').addEventListener('click', () => modal.classList.add('hidden'));

  document.getElementById('btn-save-admin').addEventListener('click', () => {
    gameState.config.appTitle = document.getElementById('cfg-app-title').value;
    gameState.config.team1Name = document.getElementById('cfg-team1-name').value;
    gameState.config.team2Name = document.getElementById('cfg-team2-name').value;
    gameState.config.gasUrl = document.getElementById('cfg-gas-url').value.trim();

    saveLocalSettings();
    applyConfigUI();
    modal.classList.add('hidden');
    alert('Pengaturan berhasil disimpan!');
  });

  document.getElementById('btn-reset-scores').addEventListener('click', () => {
    if (confirm('Yakin ingin mereset total skor kedua tim menjadi 0?')) {
      gameState.scores.team1 = 0;
      gameState.scores.team2 = 0;
      updateScoresUI();
      alert('Skor tim berhasil direset!');
    }
  });

  document.getElementById('btn-sync-gas').addEventListener('click', fetchGASData);
}

function applyConfigUI() {
  document.getElementById('app-title').innerHTML = `${gameState.config.appTitle}`;
  document.getElementById('disp-team1-name').textContent = gameState.config.team1Name;
  document.getElementById('disp-team2-name').textContent = gameState.config.team2Name;
  updatePhaseBadge();
}

function saveLocalSettings() {
  localStorage.setItem('f100_config', JSON.stringify(gameState.config));
}

function loadLocalSettings() {
  const saved = localStorage.getItem('f100_config');
  if (saved) {
    try {
      gameState.config = { ...gameState.config, ...JSON.parse(saved) };
      document.getElementById('cfg-app-title').value = gameState.config.appTitle;
      document.getElementById('cfg-team1-name').value = gameState.config.team1Name;
      document.getElementById('cfg-team2-name').value = gameState.config.team2Name;
      document.getElementById('cfg-gas-url').value = gameState.config.gasUrl;
      applyConfigUI();
    } catch (e) {
      console.error(e);
    }
  }
}

async function fetchGASData() {
  const url = gameState.config.gasUrl;
  if (!url) {
    alert('Silakan masukkan URL Google Apps Script Web App terlebih dahulu.');
    return;
  }

  try {
    const res = await fetch(`${url}?action=getSoal`);
    const json = await res.json();
    if (json.status === 'success' && Array.isArray(json.data) && json.data.length > 0) {
      gameState.questions = json.data;
      loadQuestion(0);
      alert(`Berhasil sinkronisasi ${json.data.length} soal dari Google Sheets!`);
    } else {
      alert('Respon dari Google Sheets tidak valid.');
    }
  } catch (err) {
    alert('Gagal mengambil data dari Google Apps Script: ' + err.message);
  }
}