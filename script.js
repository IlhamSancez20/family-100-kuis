const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxAbmxJf2qK8W0-w4yzN6F58Nhjmf8iiNf_DLJPCsz4EE8Rhaiw3_4wEolOsjq8amYy/exec";

class SoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playDing() {
    this.init();
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(1046.50, now);
    osc2.frequency.setValueAtTime(1318.51, now);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
  }

  playBuzzer() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  playTick() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playStealAlert() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  playFanfare() {
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      const now = this.ctx.currentTime + (index * 0.12);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    });
  }
}

const audioFX = new SoundSynth();

const DUMMY_QUESTIONS = [
  {
    id: 1,
    pertanyaan: "Negara yang bergabung di ASEAN berdasarkan jumlah penduduk terbanyak",
    jawaban: [
      {teks: "Indonesia", poin: 40},
      {teks: "Filipina", poin: 17},
      {teks: "Vietnam", poin: 14},
      {teks: "Thailand", poin: 10},
      {teks: "Myanmar", poin: 8},
      {teks: "Malaysia", poin: 5},
      {teks: "Kamboja", poin: 3},
      {teks: "Laos", poin: 1},
      {teks: "Singapura", poin: 1},
      {teks: "Brunei Darussalam", poin: 1}
    ]
  },
  {
    id: 2,
    pertanyaan: "Perangkat komputer atau elektronik yang sering ada di sekolah",
    jawaban: [
      {teks: "Speaker", poin: 30},
      {teks: "Tablet", poin: 25},
      {teks: "Komputer", poin: 20},
      {teks: "Smart Board", poin: 12},
      {teks: "Laptop", poin: 10},
      {teks: "CCTV", poin: 7},
      {teks: "Wi Fi", poin: 4},
      {teks: "Proyektor", poin: 2}
    ]
  },
  {
    id: 3,
    pertanyaan: "Perangkat komputer yang termasuk kategori input",
    jawaban: [
      {teks: "Keyboard", poin: 40},
      {teks: "Mouse", poin: 30},
      {teks: "Scanner", poin: 20},
      {teks: "Microphone", poin: 15},
      {teks: "Webcam", poin: 10},
      {teks: "Touchscreen", poin: 5}
    ]
  }
];

let questionsList = [];
let currentRoundIndex = 0;
let currentQuestion = null;
let currentAnswerStates = [];

let teamAName = "TIM A";
let teamBName = "TIM B";
let teamAScore = 0;
let teamBScore = 0;

let roundPot = 0;
let activeTeam = 'A';
let mainTurnTeam = 'A';
let strikes = 0;
let isStealTurn = false;
let roundEnded = false;

let timerSeconds = 300;
let timerInterval = null;
let isTimerRunning = false;

let currentLang = 'id';
let currentTheme = 'dark';

let onConfirmCallback = null;
let onPromptCallback = null;

const i18nDict = {
  id: {
    potLabel: "POT POIN RONDE",
    strikeTitle: "STRIKE:",
    submitBtn: "JAWAB",
    switchTeam: "Pindah Tim",
    resetStrike: "Reset Strike",
    nextQuestion: "Pindah Soal",
    quickAdd: "Tambah Soal",
    resetGame: "Reset Game",
    crudTitle: "Manajemen Soal & Jawaban",
    turnMain: "GILIRAN: ",
    turnSteal: "🔥 KESEMPATAN STEAL: "
  },
  en: {
    potLabel: "ROUND POT POINTS",
    strikeTitle: "STRIKES:",
    submitBtn: "SUBMIT",
    switchTeam: "Switch Team",
    resetStrike: "Reset Strikes",
    nextQuestion: "Next Question",
    quickAdd: "Add Question",
    resetGame: "Reset Game",
    crudTitle: "Question & Answer Manager",
    turnMain: "TURN: ",
    turnSteal: "🔥 STEAL CHANCE: "
  }
};

window.addEventListener('DOMContentLoaded', () => {
  loadPreferences();
  startRealtimeClock();
  fetchQuestionsFromDatabase();
});

function loadPreferences() {
  const savedTheme = localStorage.getItem('f100_theme') || 'dark';
  const savedLang = localStorage.getItem('f100_lang') || 'id';
  const savedTitle = localStorage.getItem('f100_title') || 'KUIS FAMILY 100 SMP';

  setTheme(savedTheme);
  setLanguage(savedLang);
  document.getElementById('appTitleText').innerText = savedTitle;
}

function startRealtimeClock() {
  setInterval(() => {
    const now = new Date();
    document.getElementById('clockDisplay').innerText = now.toLocaleTimeString('id-ID');
  }, 1000);
}

async function fetchQuestionsFromDatabase() {
  try {
    const response = await fetch(`${GAS_API_URL}?action=getQuestions`);
    if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      questionsList = data;
    } else {
      questionsList = DUMMY_QUESTIONS;
    }
  } catch (error) {
    console.warn("Beralih ke soal bawaan lokal.", error);
    questionsList = DUMMY_QUESTIONS;
  }

  initGame();
}

function showCustomAlert(title, message) {
  document.getElementById('customAlertTitle').innerText = title;
  document.getElementById('customAlertMessage').innerText = message;
  document.getElementById('customAlertModal').classList.add('active');
}

function closeCustomAlert() {
  document.getElementById('customAlertModal').classList.remove('active');
}

function showCustomConfirm(title, message, callback) {
  document.getElementById('customConfirmTitle').innerText = title;
  document.getElementById('customConfirmMessage').innerText = message;
  onConfirmCallback = callback;
  document.getElementById('customConfirmModal').classList.add('active');
}

function handleConfirmResult(isConfirmed) {
  document.getElementById('customConfirmModal').classList.remove('active');
  if (isConfirmed && typeof onConfirmCallback === 'function') {
    onConfirmCallback();
  }
  onConfirmCallback = null;
}

function showCustomPrompt(title, defaultValue, callback) {
  document.getElementById('customPromptTitle').innerText = title;
  const inputElem = document.getElementById('customPromptInput');
  inputElem.value = defaultValue || '';
  onPromptCallback = callback;
  document.getElementById('customPromptModal').classList.add('active');
  setTimeout(() => inputElem.focus(), 100);
}

function handlePromptSubmit(e) {
  e.preventDefault();
  const value = document.getElementById('customPromptInput').value.trim();
  document.getElementById('customPromptModal').classList.remove('active');
  if (value && typeof onPromptCallback === 'function') {
    onPromptCallback(value);
  }
  onPromptCallback = null;
}

function closeCustomPrompt() {
  document.getElementById('customPromptModal').classList.remove('active');
  onPromptCallback = null;
}

function initGame() {
  currentRoundIndex = 0;
  teamAScore = 0;
  teamBScore = 0;
  updateScoreboardUI();
  loadRound(currentRoundIndex);
}

function loadRound(index) {
  if (index >= questionsList.length || index >= 5) {
    endGameCelebration();
    return;
  }

  currentRoundIndex = index;
  currentQuestion = questionsList[index];
  roundPot = 0;
  strikes = 0;
  isStealTurn = false;
  roundEnded = false;

  mainTurnTeam = (index % 2 === 0) ? 'A' : 'B';
  activeTeam = mainTurnTeam;

  currentAnswerStates = currentQuestion.jawaban.map(j => ({
    teks: j.teks,
    poin: Number(j.poin) || 0,
    revealed: false,
    manual: false
  }));

  setTimerSeconds(300);
  stopTimer();

  renderBoard();
  updateRoundUI();
}

function renderBoard() {
  document.getElementById('questionTextDisplay').innerText = `Ronde ${currentRoundIndex + 1}: "${currentQuestion.pertanyaan}"`;
  
  const boardGrid = document.getElementById('boardGrid');
  boardGrid.innerHTML = '';

  currentAnswerStates.forEach((ans, idx) => {
    const container = document.createElement('div');
    container.className = `tile-container ${ans.revealed ? 'flipped' : ''} ${ans.manual ? 'manual-revealed' : ''}`;
    container.onclick = () => handleManualTileClick(idx);

    container.innerHTML = `
      <div class="tile-inner">
        <div class="tile-front">
          <div class="tile-front-number">${idx + 1}</div>
          <div class="tile-front-dots">••••••••••••••</div>
        </div>
        <div class="tile-back">
          <div class="tile-answer-text">${ans.teks}</div>
          <div class="tile-answer-score">${ans.poin}</div>
        </div>
      </div>
    `;
    boardGrid.appendChild(container);
  });
}

function updateRoundUI() {
  document.getElementById('roundPotScore').innerText = roundPot;
  document.getElementById('roundBadge').innerText = `RONDE ${currentRoundIndex + 1} / ${Math.min(5, questionsList.length)}`;

  document.getElementById('teamACard').classList.toggle('active', activeTeam === 'A');
  document.getElementById('teamBCard').classList.toggle('active', activeTeam === 'B');

  const boardGrid = document.getElementById('boardGrid');
  if (roundEnded) {
    boardGrid.classList.remove('locked');
  } else {
    boardGrid.classList.add('locked');
  }

  for (let i = 1; i <= 3; i++) {
    document.getElementById(`strike${i}`).classList.toggle('active', i <= strikes);
  }

  const turnBanner = document.getElementById('turnBanner');
  const activeName = (activeTeam === 'A') ? teamAName : teamBName;
  
  if (isStealTurn) {
    turnBanner.className = "turn-banner steal-turn";
    turnBanner.innerText = i18nDict[currentLang].turnSteal + activeName;
  } else {
    turnBanner.className = "turn-banner main-turn";
    turnBanner.innerText = i18nDict[currentLang].turnMain + activeName;
  }
}

function updateScoreboardUI() {
  document.getElementById('teamAScore').innerText = teamAScore;
  document.getElementById('teamBScore').innerText = teamBScore;
  document.getElementById('teamANameText').innerText = teamAName;
  document.getElementById('teamBNameText').innerText = teamBName;
}

function normalizeStr(str) {
  return (str || '')
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isExactOrStrictMatch(input, target) {
  const normInput = normalizeStr(input);
  const normTarget = normalizeStr(target);

  if (!normInput || !normTarget) return false;
  if (normInput === normTarget) return true;

  const inputWords = normInput.split(' ');
  const targetWords = normTarget.split(' ');

  if (inputWords.length !== targetWords.length) return false;

  const dist = levenshteinDistance(normInput, normTarget);
  const maxLen = Math.max(normInput.length, normTarget.length);
  return (1 - (dist / maxLen)) >= 0.85; 
}

function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function handleAnswerSubmit(e) {
  e.preventDefault();
  if (roundEnded) return;

  const inputElem = document.getElementById('answerInput');
  const userAns = inputElem.value;
  inputElem.value = '';

  if (!userAns.trim()) return;

  let matchIndex = -1;
  for (let i = 0; i < currentAnswerStates.length; i++) {
    if (!currentAnswerStates[i].revealed && isExactOrStrictMatch(userAns, currentAnswerStates[i].teks)) {
      matchIndex = i;
      break;
    }
  }

  if (matchIndex !== -1) {
    audioFX.playDing();
    revealAnswerTile(matchIndex, false);

    if (!isStealTurn) {
      roundPot += currentAnswerStates[matchIndex].poin;
      updateRoundUI();

      const allRevealed = currentAnswerStates.every(a => a.revealed);
      if (allRevealed) {
        awardRoundPotToTeam(activeTeam);
      } else {
        setTimerSeconds(300);
      }
    } else {
      roundPot += currentAnswerStates[matchIndex].poin;
      awardRoundPotToTeam(activeTeam);
    }
  } else {
    processWrongAnswer();
    if (!isStealTurn) {
      setTimerSeconds(300);
    }
  }
}

function processWrongAnswer() {
  audioFX.playBuzzer();
  triggerStrikeAnimation();

  if (!isStealTurn) {
    strikes++;
    updateRoundUI();

    if (strikes >= 3) {
      isStealTurn = true;
      activeTeam = (mainTurnTeam === 'A') ? 'B' : 'A';
      setTimerSeconds(600);
      audioFX.playStealAlert();
      updateRoundUI();
      startTimer();
    }
  } else {
    awardRoundPotToTeam(mainTurnTeam);
  }
}

function revealAnswerTile(index, isManual = false) {
  currentAnswerStates[index].revealed = true;
  currentAnswerStates[index].manual = isManual;
  renderBoard();
}

function handleManualTileClick(index) {
  if (!roundEnded) return;

  if (!currentAnswerStates[index].revealed) {
    revealAnswerTile(index, true);
    audioFX.playTick();
  }
}

function awardRoundPotToTeam(team) {
  roundEnded = true;
  
  if (team === 'A') teamAScore += roundPot;
  else teamBScore += roundPot;

  updateScoreboardUI();
  updateRoundUI();
  stopTimer();

  setTimeout(() => {
    showCustomAlert("Ronde Selesai!", `${roundPot} poin masuk ke ${team === 'A' ? teamAName : teamBName}. Sisa jawaban pada papan kini dapat diklik untuk dibuka.`);
  }, 400);
}

function triggerStrikeAnimation() {
  const overlay = document.getElementById('strikeOverlay');
  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 800);
}

function setTimerSeconds(sec) {
  timerSeconds = sec;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  document.getElementById('timerDisplay').innerText = 
    `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function toggleTimer() {
  if (isTimerRunning) stopTimer();
  else startTimer();
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  document.getElementById('timerToggleBtn').innerText = '⏸️';
  
  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      handleTimerTimeout();
    }
  }, 1000);
}

function handleTimerTimeout() {
  stopTimer();
  audioFX.playBuzzer();
  triggerStrikeAnimation();

  if (!isStealTurn) {
    strikes++;
    updateRoundUI();

    if (strikes >= 3) {
      isStealTurn = true;
      activeTeam = (mainTurnTeam === 'A') ? 'B' : 'A';
      setTimerSeconds(600);
      audioFX.playStealAlert();
      updateRoundUI();
      startTimer();
    } else {
      setTimerSeconds(300);
      startTimer();
    }
  } else {
    awardRoundPotToTeam(mainTurnTeam);
  }
}

function stopTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('timerToggleBtn').innerText = '▶️';
}

function resetTimer() {
  stopTimer();
  setTimerSeconds(isStealTurn ? 600 : 300);
}

function switchActiveTeam() {
  activeTeam = (activeTeam === 'A') ? 'B' : 'A';
  updateRoundUI();
}

function resetStrikesManual() {
  strikes = 0;
  updateRoundUI();
}

function nextQuestion() {
  loadRound(currentRoundIndex + 1);
}

function confirmResetGame() {
  showCustomConfirm(
    "Konfirmasi Reset Permainan",
    "Apakah Anda yakin ingin mereset seluruh permainan dari awal?",
    () => initGame()
  );
}

function editTeamName(team) {
  const currentName = (team === 'A') ? teamAName : teamBName;
  showCustomPrompt(`Ubah Nama Tim ${team}`, currentName, (newName) => {
    if (team === 'A') teamAName = newName;
    else teamBName = newName;
    updateScoreboardUI();
    updateRoundUI();
  });
}

function endGameCelebration() {
  audioFX.playFanfare();
  let winnerText = "";
  let winnerTag = "DRAW";

  if (teamAScore > teamBScore) {
    winnerText = `${teamAName} MENANG! 🎉`;
    winnerTag = teamAName;
  } else if (teamBScore > teamAScore) {
    winnerText = `${teamBName} MENANG! 🎉`;
    winnerTag = teamBName;
  } else {
    winnerText = "HASIL SERI / DRAW! 🤝";
  }

  document.getElementById('winnerText').innerText = winnerText;
  document.getElementById('winnerScoresText').innerText = 
    `Skor Akhir: ${teamAName} (${teamAScore}) vs ${teamBName} (${teamBScore})`;

  document.getElementById('winnerModal').classList.add('active');
  saveGameHistory(winnerTag);
}

async function saveGameHistory(winnerTag) {
  const payload = {
    action: "saveGameHistory",
    data: {
      namaTim1: teamAName,
      skorTim1: teamAScore,
      namaTim2: teamBName,
      skorTim2: teamBScore,
      pemenang: winnerTag
    }
  };

  try {
    await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Gagal menyimpan riwayat game ke Google Apps Script.", err);
  }
}

function restartFullGame() {
  document.getElementById('winnerModal').classList.remove('active');
  initGame();
}

function openCrudModal() {
  renderCrudQuestionList();
  document.getElementById('crudModal').classList.add('active');
}

function closeCrudModal() {
  document.getElementById('crudModal').classList.remove('active');
}

function renderCrudQuestionList() {
  const container = document.getElementById('crudQuestionList');
  container.innerHTML = '';

  questionsList.forEach((q, idx) => {
    const item = document.createElement('div');
    item.style.cssText = "display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid var(--card-border); gap:10px;";
    item.innerHTML = `
      <div style="flex:1;">
        <strong>Soal ${idx + 1}:</strong> ${q.pertanyaan} (${q.jawaban.length} Jawaban)
      </div>
      <button class="btn-host" onclick="openFormModal(${idx})">✏ Edit</button>
      <button class="btn-host danger" onclick="deleteQuestion(${q.id})">🗑 Hapus</button>
    `;
    container.appendChild(item);
  });
}

/* Slot Jawaban Dinamis */
function createAnswerSlotHTML(index, teks = '', poin = '') {
  return `
    <div class="answer-row-item">
      <span class="answer-num">#${index + 1}</span>
      <input type="text" class="form-control input-answer-text" placeholder="Teks Jawaban ${index + 1}" value="${teks}" required>
      <input type="number" class="form-control input-answer-poin" placeholder="Poin" value="${poin}" min="1" max="100" required>
      <button type="button" class="btn-remove-row" onclick="removeAnswerSlot(this)" title="Hapus Slot">&times;</button>
    </div>
  `;
}

function updateSlotUI() {
  const container = document.getElementById('answerSlotsContainer');
  const rows = container.querySelectorAll('.answer-row-item');
  const count = rows.length;

  rows.forEach((row, i) => {
    row.querySelector('.answer-num').textContent = `#${i + 1}`;
    row.querySelector('.input-answer-text').placeholder = `Teks Jawaban ${i + 1}`;
    
    const btnRemove = row.querySelector('.btn-remove-row');
    if (btnRemove) {
      btnRemove.style.visibility = (count <= 2) ? 'hidden' : 'visible';
    }
  });

  const badge = document.getElementById('slotCountBadge');
  if (badge) badge.textContent = `${count} / 10 Slot`;

  const btnAdd = document.getElementById('btnAddSlot');
  if (btnAdd) {
    btnAdd.disabled = (count >= 10);
    btnAdd.style.opacity = (count >= 10) ? '0.4' : '1';
    btnAdd.style.cursor = (count >= 10) ? 'not-allowed' : 'pointer';
  }
}

function addAnswerSlot(teks = '', poin = '') {
  const container = document.getElementById('answerSlotsContainer');
  const count = container.querySelectorAll('.answer-row-item').length;
  if (count >= 10) return;

  const temp = document.createElement('div');
  temp.innerHTML = createAnswerSlotHTML(count, teks, poin);
  container.appendChild(temp.firstElementChild);

  updateSlotUI();
}

function removeAnswerSlot(btn) {
  const container = document.getElementById('answerSlotsContainer');
  const count = container.querySelectorAll('.answer-row-item').length;
  if (count <= 2) return;

  btn.closest('.answer-row-item').remove();
  updateSlotUI();
}

function openFormModal(index = null) {
  const modal = document.getElementById('formModal');
  const container = document.getElementById('answerSlotsContainer');
  container.innerHTML = '';

  if (index !== null && questionsList[index]) {
    const q = questionsList[index];
    document.getElementById('formModalTitle').textContent = "Edit Soal";
    document.getElementById('formQId').value = q.id || '';
    document.getElementById('formQPertanyaan').value = q.pertanyaan || '';

    if (q.jawaban && q.jawaban.length > 0) {
      q.jawaban.forEach(j => addAnswerSlot(j.teks, j.poin));
    }
    
    while (container.querySelectorAll('.answer-row-item').length < 2) {
      addAnswerSlot();
    }
  } else {
    document.getElementById('formModalTitle').textContent = "Tambah Soal Baru";
    document.getElementById('formQId').value = '';
    document.getElementById('formQPertanyaan').value = '';
    
    addAnswerSlot();
    addAnswerSlot();
  }

  document.getElementById('crudModal').classList.remove('active');
  modal.classList.add('active');
}

function openQuickAddModal() {
  openFormModal(null);
}

function closeFormModal() {
  document.getElementById('formModal').classList.remove('active');
}

async function saveQuestionForm(e) {
  e.preventDefault();

  const id = document.getElementById('formQId').value;
  const pertanyaan = document.getElementById('formQPertanyaan').value.trim();
  const rows = document.querySelectorAll('#answerSlotsContainer .answer-row-item');

  const jawaban = [];
  rows.forEach(row => {
    const teks = row.querySelector('.input-answer-text').value.trim();
    const poin = parseInt(row.querySelector('.input-answer-poin').value) || 0;
    if (teks) {
      jawaban.push({ teks, poin });
    }
  });

  if (jawaban.length < 2) {
    showCustomAlert("Peringatan", "Minimal harus mengisi 2 jawaban!");
    return;
  }

  const questionObj = {
    id: id ? parseInt(id) : Date.now(),
    pertanyaan: pertanyaan,
    jawaban: jawaban
  };

  try {
    await fetch(GAS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'saveQuestion', data: questionObj })
    });
  } catch (err) {
    console.warn("Gagal terhubung ke API Google Sheets, disimpan secara lokal.", err);
  }

  if (id) {
    const idx = questionsList.findIndex(q => q.id == id);
    if (idx !== -1) questionsList[idx] = questionObj;
  } else {
    questionsList.push(questionObj);
  }

  closeFormModal();
  initGame();
}

function deleteQuestion(id) {
  showCustomConfirm("Konfirmasi Hapus Soal", "Apakah Anda yakin ingin menghapus soal ini?", async () => {
    try {
      await fetch(GAS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "deleteQuestion", id: id })
      });
    } catch (err) {
      console.warn("Hapus database gagal, menghapus lokal.", err);
    }
    questionsList = questionsList.filter(q => q.id !== id);
    renderCrudQuestionList();
    initGame();
  });
}

function openTitleModal() {
  document.getElementById('newAppTitleInput').value = document.getElementById('appTitleText').innerText;
  document.getElementById('titleModal').classList.add('active');
}

function closeTitleModal() {
  document.getElementById('titleModal').classList.remove('active');
}

function saveAppTitle() {
  const newTitle = document.getElementById('newAppTitleInput').value.trim();
  if (newTitle) {
    document.getElementById('appTitleText').innerText = newTitle;
    localStorage.setItem('f100_title', newTitle);
  }
  closeTitleModal();
}

function toggleTheme() {
  currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
  setTheme(currentTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.getElementById('themeBtn').innerText = (theme === 'dark') ? '🌙 Dark' : '☀️ Light';
  localStorage.setItem('f100_theme', theme);
}

function toggleLanguage() {
  currentLang = (currentLang === 'id') ? 'en' : 'id';
  setLanguage(currentLang);
}

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('langBtn').innerText = (lang === 'id') ? '🌐 ID' : '🌐 EN';
  
  const dict = i18nDict[lang];
  document.getElementById('i18nPotLabel').innerText = dict.potLabel;
  document.getElementById('i18nStrikeTitle').innerText = dict.strikeTitle;
  document.getElementById('i18nSubmitBtn').innerText = dict.submitBtn;
  document.getElementById('i18nSwitchTeam').innerText = dict.switchTeam;
  document.getElementById('i18nResetStrike').innerText = dict.resetStrike;
  document.getElementById('i18nNextQuestion').innerText = dict.nextQuestion;
  document.getElementById('i18nQuickAdd').innerText = dict.quickAdd;
  document.getElementById('i18nResetGame').innerText = dict.resetGame;
  document.getElementById('i18nCrudTitle').innerText = dict.crudTitle;

  localStorage.setItem('f100_lang', lang);
  updateRoundUI();
}
