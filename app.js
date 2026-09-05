// app.js — SSC Typing Test Simulator Core Engine (v2.0 — Enhanced)

// ── Sound Effects Generator (Web Audio API — no external files needed) ──
class SoundFX {
  constructor() {
    this.enabled = localStorage.getItem('soundEnabled') !== 'false';
    this.ctx = null;
  }

  getContext() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e) { this.enabled = false; }
    }
    return this.ctx;
  }

  playTick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  playError() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 200;
    osc.type = 'square';
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  }

  playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    [523, 659, 784].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.2);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.2);
    });
  }

  playFail() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    [300, 250].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sawtooth';
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.2 + 0.25);
      osc.start(ctx.currentTime + i * 0.2);
      osc.stop(ctx.currentTime + i * 0.2 + 0.25);
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', this.enabled.toString());
    return this.enabled;
  }
}

// ── Test History Manager (LocalStorage) ──
class HistoryManager {
  constructor() {
    this.storageKey = 'testHistory';
  }

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch { return []; }
  }

  save(result) {
    const history = this.getAll();
    history.push({
      ...result,
      date: new Date().toISOString(),
      id: Date.now()
    });
    // Keep max 50 records
    if (history.length > 50) history.shift();
    localStorage.setItem(this.storageKey, JSON.stringify(history));
  }

  getStats() {
    const history = this.getAll();
    if (history.length === 0) return null;

    const avgWPM = Math.round(history.reduce((s, h) => s + h.wpm, 0) / history.length);
    const avgAccuracy = (history.reduce((s, h) => s + h.accuracy, 0) / history.length).toFixed(1);
    const bestWPM = Math.max(...history.map(h => h.wpm));
    const totalTests = history.length;
    const qualifiedCount = history.filter(h => h.qualified).length;

    return { avgWPM, avgAccuracy, bestWPM, totalTests, qualifiedCount, history };
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}

// ── Main Application ──
class TypingSimulator {
  constructor() {
    // State
    this.currentScreen = 'home';
    this.selectedExam = null;
    this.selectedLanguage = 'english';
    this.selectedDuration = null;
    this.currentPassage = null;

    // Test state
    this.timerInterval = null;
    this.timeRemaining = 0;
    this.testStarted = false;
    this.testFinished = false;
    this.startTime = null;
    this.lastTypedLength = 0;

    // Tracking
    this.totalKeystrokes = 0;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.keyErrors = {};
    this.totalTests = parseInt(localStorage.getItem('totalTests') || '0');

    // Theme
    this.darkMode = localStorage.getItem('theme') !== 'light';

    // Modules
    this.sound = new SoundFX();
    this.history = new HistoryManager();

    // Init
    this.init();
  }

  init() {
    this.renderTotalTests();
    this.bindHomeEvents();
    this.bindAntiCheat();
    this.applyTheme();
    this.renderHistorySection();
  }

  // ── THEME ──
  applyTheme() {
    document.body.classList.toggle('light-mode', !this.darkMode);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = this.darkMode ? '☀️' : '🌙';
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  // ── HOME SCREEN ──
  bindHomeEvents() {
    // Exam card selection
    document.querySelectorAll('.exam-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.exam-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedExam = card.dataset.exam;
        this.updateDurationFromExam();
        this.updateStartButton();
      });
    });

    // Language selector
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        this.selectedLanguage = e.target.value;
      });
    }

    // Duration selector
    const durSelect = document.getElementById('duration-select');
    if (durSelect) {
      durSelect.addEventListener('change', (e) => {
        this.selectedDuration = parseInt(e.target.value);
      });
    }

    // Start button
    const startBtn = document.getElementById('btn-start');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.startTest());
    }

    // Theme toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Sound toggle
    const soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const enabled = this.sound.toggle();
        soundBtn.textContent = enabled ? '🔊' : '🔇';
      });
      soundBtn.textContent = this.sound.enabled ? '🔊' : '🔇';
    }

    // Clear history
    const clearBtn = document.getElementById('btn-clear-history');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('क्या आप अपनी पूरी History मिटाना चाहते हैं?\n(Delete all test history?)')) {
          this.history.clear();
          this.renderHistorySection();
        }
      });
    }
  }

  updateDurationFromExam() {
    if (this.selectedExam && EXAM_CONFIG[this.selectedExam]) {
      const config = EXAM_CONFIG[this.selectedExam];
      const durSelect = document.getElementById('duration-select');
      if (durSelect) {
        durSelect.value = config.duration;
        this.selectedDuration = config.duration;
      }
    }
  }

  updateStartButton() {
    const startBtn = document.getElementById('btn-start');
    if (startBtn) {
      startBtn.disabled = !this.selectedExam;
    }
  }

  renderTotalTests() {
    const el = document.getElementById('total-tests');
    if (el) el.textContent = this.totalTests.toLocaleString();
  }

  // ── HISTORY SECTION ──
  renderHistorySection() {
    const container = document.getElementById('history-section');
    if (!container) return;

    const stats = this.history.getStats();
    if (!stats || stats.totalTests === 0) {
      container.innerHTML = `
        <div class="history-empty">
          <p>📝 अभी कोई Test History नहीं है।</p>
          <p style="color: var(--gray-500); font-size: 0.85rem;">पहला टेस्ट दें, फिर यहाँ आपकी Progress दिखेगी!</p>
        </div>
      `;
      return;
    }

    // Stats summary cards
    let html = `
      <div class="history-stats-grid">
        <div class="history-stat-card">
          <div class="hs-value">${stats.totalTests}</div>
          <div class="hs-label">Total Tests</div>
        </div>
        <div class="history-stat-card">
          <div class="hs-value" style="color: var(--primary-300);">${stats.avgWPM}</div>
          <div class="hs-label">Avg WPM</div>
        </div>
        <div class="history-stat-card">
          <div class="hs-value" style="color: var(--accent-400);">${stats.bestWPM}</div>
          <div class="hs-label">Best WPM 🏆</div>
        </div>
        <div class="history-stat-card">
          <div class="hs-value" style="color: var(--success-400);">${stats.avgAccuracy}%</div>
          <div class="hs-label">Avg Accuracy</div>
        </div>
      </div>
    `;

    // WPM Progress Chart (ASCII-style bar chart with CSS)
    const recent = stats.history.slice(-10); // last 10 tests
    const maxWPM = Math.max(...recent.map(r => r.wpm), 1);

    html += `<div class="progress-chart">
      <h4 style="margin-bottom: 12px; font-size: 0.85rem; color: var(--gray-400);">📈 WPM Progress (Last ${recent.length} Tests)</h4>
      <div class="chart-bars">`;

    recent.forEach((r, i) => {
      const heightPct = Math.max((r.wpm / maxWPM) * 100, 5);
      const barColor = r.qualified ? 'var(--success-400)' : 'var(--error-400)';
      const date = new Date(r.date);
      const dateStr = `${date.getDate()}/${date.getMonth()+1}`;
      html += `
        <div class="chart-bar-wrapper" title="${r.examName} — ${r.wpm} WPM, ${r.accuracy}% Acc">
          <div class="chart-bar-value">${r.wpm}</div>
          <div class="chart-bar" style="height: ${heightPct}%; background: ${barColor};"></div>
          <div class="chart-bar-label">${dateStr}</div>
        </div>`;
    });

    html += `</div></div>`;

    // Recent test history table
    html += `<div class="history-table-wrap">
      <h4 style="margin-bottom: 12px; font-size: 0.85rem; color: var(--gray-400);">📋 Recent Tests</h4>
      <div class="history-table-scroll">
      <table class="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Exam</th>
            <th>WPM</th>
            <th>Accuracy</th>
            <th>KDPH</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>`;

    stats.history.slice(-10).reverse().forEach(r => {
      const date = new Date(r.date);
      const dateStr = `${date.getDate()}/${date.getMonth()+1} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`;
      html += `
          <tr>
            <td>${dateStr}</td>
            <td>${r.examName || '-'}</td>
            <td style="font-weight:700; color: var(--primary-300);">${r.wpm}</td>
            <td>${r.accuracy}%</td>
            <td>${(r.kdph || 0).toLocaleString()}</td>
            <td>${r.qualified ? '✅' : '❌'}</td>
          </tr>`;
    });

    html += `</tbody></table></div></div>`;

    container.innerHTML = html;
  }

  // ── TEST ──
  startTest() {
    if (!this.selectedExam) return;

    const config = EXAM_CONFIG[this.selectedExam];
    const duration = this.selectedDuration || config.duration;
    const lang = this.selectedLanguage;

    // Pick random passage
    const passages = PASSAGES[lang].filter(p => {
      if (this.selectedExam === 'Custom') return true;
      return p.exam === this.selectedExam;
    });

    if (passages.length === 0) {
      this.currentPassage = PASSAGES[lang][Math.floor(Math.random() * PASSAGES[lang].length)];
    } else {
      this.currentPassage = passages[Math.floor(Math.random() * passages.length)];
    }

    // Reset test state
    this.timeRemaining = duration * 60;
    this.testStarted = false;
    this.testFinished = false;
    this.startTime = null;
    this.totalKeystrokes = 0;
    this.correctChars = 0;
    this.incorrectChars = 0;
    this.keyErrors = {};
    this.lastTypedLength = 0;

    this.showScreen('test');
    this.renderTestScreen(config, lang);
  }

  renderTestScreen(config, lang) {
    document.getElementById('test-exam-name').textContent = config.name;
    document.getElementById('test-exam-lang').textContent = lang === 'english' ? 'English' : 'हिंदी';

    // Render passage characters
    const passageEl = document.getElementById('passage-text');
    passageEl.innerHTML = '';
    const chars = this.currentPassage.text.split('');
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char;
      span.dataset.index = i;
      if (i === 0) span.classList.add('current');
      passageEl.appendChild(span);
    });

    this.updateTimerDisplay();

    document.getElementById('live-wpm').textContent = '0';
    document.getElementById('live-accuracy').textContent = '100%';
    document.getElementById('live-correct').textContent = '0';
    document.getElementById('live-wrong').textContent = '0';
    document.getElementById('live-keystrokes').textContent = '0';

    const typingArea = document.getElementById('typing-area');
    typingArea.value = '';
    typingArea.disabled = false;
    typingArea.placeholder = 'यहाँ टाइप करना शुरू करें... (Type here to begin)';

    // Rebind typing events (clean)
    const newTA = typingArea.cloneNode(true);
    typingArea.parentNode.replaceChild(newTA, typingArea);

    newTA.addEventListener('input', (e) => this.handleTyping(e));
    newTA.addEventListener('paste', (e) => {
      e.preventDefault();
      this.showNoCopyNotice('Paste not allowed during test! ❌');
    });

    setTimeout(() => newTA.focus(), 300);
  }

  handleTyping(e) {
    const typingArea = document.getElementById('typing-area');
    const typedText = typingArea.value;
    const passageText = this.currentPassage.text;

    // Start timer on first keystroke
    if (!this.testStarted) {
      this.testStarted = true;
      this.startTime = Date.now();
      this.startTimer();
    }

    if (this.testFinished) { e.preventDefault(); return; }

    this.totalKeystrokes++;

    // Compare characters
    const charSpans = document.querySelectorAll('#passage-text .char');
    let correct = 0;
    let incorrect = 0;

    // Play sound for the latest character typed
    const newLen = typedText.length;
    if (newLen > this.lastTypedLength && newLen <= passageText.length) {
      const lastIdx = newLen - 1;
      if (typedText[lastIdx] !== passageText[lastIdx]) {
        this.sound.playError();
      }
    }
    this.lastTypedLength = newLen;

    for (let i = 0; i < passageText.length; i++) {
      const span = charSpans[i];
      if (!span) break;

      span.classList.remove('correct', 'incorrect', 'current');

      if (i < typedText.length) {
        if (typedText[i] === passageText[i]) {
          span.classList.add('correct');
          correct++;
        } else {
          span.classList.add('incorrect');
          incorrect++;
          const expectedKey = passageText[i];
          this.keyErrors[expectedKey] = (this.keyErrors[expectedKey] || 0) + 1;
        }
      } else if (i === typedText.length) {
        span.classList.add('current');
      }
    }

    this.correctChars = correct;
    this.incorrectChars = incorrect;

    // Auto-scroll passage
    const currentSpan = document.querySelector('#passage-text .char.current');
    if (currentSpan) {
      const passageContainer = document.querySelector('.passage-text');
      const spanTop = currentSpan.offsetTop;
      const containerHeight = passageContainer.clientHeight;
      if (spanTop > containerHeight / 2) {
        passageContainer.scrollTop = spanTop - containerHeight / 3;
      }
    }

    this.updateLiveStats();

    // Check completion
    if (typedText.length >= passageText.length) {
      this.finishTest();
    }
  }

  updateLiveStats() {
    const elapsed = this.startTime ? (Date.now() - this.startTime) / 60000 : 0;
    const totalTyped = this.correctChars + this.incorrectChars;
    const wpm = elapsed > 0 ? Math.round(this.correctChars / 5 / elapsed) : 0;
    const accuracy = totalTyped > 0 ? ((this.correctChars / totalTyped) * 100).toFixed(1) : '100';

    document.getElementById('live-wpm').textContent = wpm;
    document.getElementById('live-accuracy').textContent = accuracy + '%';
    document.getElementById('live-correct').textContent = this.correctChars;
    document.getElementById('live-wrong').textContent = this.incorrectChars;
    document.getElementById('live-keystrokes').textContent = this.totalKeystrokes;

    const headerWpm = document.getElementById('header-wpm');
    if (headerWpm) headerWpm.textContent = wpm;

    // Color accuracy live
    const accEl = document.getElementById('live-accuracy');
    if (parseFloat(accuracy) >= 95) {
      accEl.className = 'value good';
    } else if (parseFloat(accuracy) >= 85) {
      accEl.className = 'value neutral';
    } else {
      accEl.className = 'value bad';
    }
  }

  startTimer() {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.timeRemaining = 0;
        this.finishTest();
      }
      this.updateTimerDisplay();
      const timerEl = document.getElementById('timer-value');
      if (this.timeRemaining <= 60) timerEl.classList.add('warning');
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timer-value').textContent = display;
  }

  finishTest() {
    if (this.testFinished) return;
    this.testFinished = true;
    clearInterval(this.timerInterval);

    const typingArea = document.getElementById('typing-area');
    typingArea.disabled = true;

    this.totalTests++;
    localStorage.setItem('totalTests', this.totalTests.toString());

    const results = this.calculateResults();

    // Save to history
    this.history.save(results);

    // Play sound
    if (results.qualified) {
      this.sound.playSuccess();
    } else {
      this.sound.playFail();
    }

    setTimeout(() => this.showResults(results), 500);
  }

  calculateResults() {
    const config = EXAM_CONFIG[this.selectedExam];
    const elapsed = this.startTime ? (Date.now() - this.startTime) / 60000 : 1;
    const totalTyped = this.correctChars + this.incorrectChars;

    const wpm = elapsed > 0 ? Math.round(this.correctChars / 5 / elapsed) : 0;
    const accuracy = totalTyped > 0 ? ((this.correctChars / totalTyped) * 100).toFixed(1) : 0;
    const kdph = elapsed > 0 ? Math.round(this.totalKeystrokes / elapsed * 60) : 0;

    let qualified = false;
    let requirementText = config.requirement;

    if (this.selectedExam === 'SSC CGL') {
      qualified = kdph >= (config.minKDPH || 8000);
    } else if (this.selectedExam === 'SSC CHSL') {
      const minWPM = this.selectedLanguage === 'hindi' ? config.minWPMHindi : config.minWPMEnglish;
      qualified = wpm >= (minWPM || 35);
    } else if (this.selectedExam === 'Railway NTPC') {
      const minWPM = this.selectedLanguage === 'hindi' ? config.minWPMHindi : config.minWPMEnglish;
      qualified = wpm >= (minWPM || 30);
    } else {
      qualified = true;
    }

    const weakKeys = Object.entries(this.keyErrors)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, count]) => ({ key, count }));

    return {
      wpm,
      accuracy: parseFloat(accuracy),
      totalChars: totalTyped,
      correctChars: this.correctChars,
      incorrectChars: this.incorrectChars,
      totalKeystrokes: this.totalKeystrokes,
      kdph,
      timeTaken: elapsed.toFixed(1),
      qualified,
      requirementText,
      weakKeys,
      examName: config.name,
      language: this.selectedLanguage === 'english' ? 'English' : 'Hindi'
    };
  }

  // ── RESULTS ──
  showResults(results) {
    this.showScreen('results');
    this.currentResults = results;

    const statusEl = document.getElementById('result-status');
    if (results.qualified) {
      statusEl.className = 'result-status qualified';
      statusEl.innerHTML = '✅ QUALIFIED';
    } else {
      statusEl.className = 'result-status not-qualified';
      statusEl.innerHTML = '❌ NOT QUALIFIED';
    }

    document.getElementById('result-wpm').textContent = results.wpm;
    document.getElementById('result-accuracy').textContent = results.accuracy + '%';
    document.getElementById('result-errors').textContent = results.incorrectChars;
    document.getElementById('result-kdph').textContent = results.kdph.toLocaleString();
    document.getElementById('result-total-chars').textContent = results.totalChars;
    document.getElementById('result-correct-chars').textContent = results.correctChars;
    document.getElementById('result-time').textContent = results.timeTaken + ' min';
    document.getElementById('result-keystrokes').textContent = results.totalKeystrokes;

    // Weak keys
    const weakKeysEl = document.getElementById('weak-keys-container');
    if (results.weakKeys.length === 0) {
      weakKeysEl.innerHTML = '<p class="no-weak-keys">🎉 कोई Weak Key नहीं! बहुत बढ़िया!</p>';
    } else {
      weakKeysEl.innerHTML = results.weakKeys.map(wk => `
        <div class="weak-key">
          <span class="key-char">${this.escapeHTML(wk.key === ' ' ? '␣' : wk.key)}</span>
          <span class="key-errors">${wk.count} errors</span>
        </div>
      `).join('');
    }

    // Requirement box
    const reqBox = document.getElementById('requirement-box');
    reqBox.className = 'requirement-box ' + (results.qualified ? 'pass' : 'fail');
    reqBox.innerHTML = `
      <span class="req-icon">${results.qualified ? '✅' : '⚠️'}</span>
      <div class="req-text">
        <strong>${results.examName} Requirement: ${results.requirementText}</strong>
        ${results.qualified
          ? 'बधाई हो! आप Typing requirement पूरी करते हैं!'
          : 'अभी और प्रैक्टिस करें। हिम्मत मत हारिए!'
        }
      </div>
    `;

    // Bind result buttons (use cloneNode to prevent duplicate listeners)
    ['btn-retake', 'btn-home', 'btn-share'].forEach(id => {
      const btn = document.getElementById(id);
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
    });

    document.getElementById('btn-retake').addEventListener('click', () => this.startTest());
    document.getElementById('btn-home').addEventListener('click', () => {
      this.showScreen('home');
      this.renderTotalTests();
      this.renderHistorySection();
    });
    document.getElementById('btn-share').addEventListener('click', () => this.shareOnWhatsApp());
  }

  shareOnWhatsApp() {
    if (!this.currentResults) return;
    const r = this.currentResults;
    const text = `🏆 SSC Typing Test Result 🏆\n\n` +
      `📋 Exam: ${r.examName}\n` +
      `🌐 Language: ${r.language}\n` +
      `⚡ Speed: ${r.wpm} WPM\n` +
      `🎯 Accuracy: ${r.accuracy}%\n` +
      `⌨️ KDPH: ${r.kdph}\n` +
      `${r.qualified ? '✅ QUALIFIED!' : '❌ Keep Practicing!'}\n\n` +
      `क्या तुम मुझे हरा सकते हो? 💪\n` +
      `Practice here: ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  // ── SCREEN MANAGEMENT ──
  showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const screen = document.getElementById(`${screenName}-screen`);
    if (screen) screen.classList.remove('hidden');
    this.currentScreen = screenName;
    window.scrollTo(0, 0);
  }

  // ── ANTI-CHEAT ──
  bindAntiCheat() {
    document.addEventListener('contextmenu', (e) => {
      if (this.currentScreen === 'test') {
        e.preventDefault();
        this.showNoCopyNotice('Right-click disabled during test! 🔒');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (this.currentScreen === 'test') {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'a' || e.key === 'u')) {
          e.preventDefault();
          this.showNoCopyNotice('Copy/Select disabled during test! 🔒');
        }
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (this.currentScreen === 'test' && this.testStarted && !this.testFinished) {
        if (document.hidden) {
          this.showNoCopyNotice('⚠️ Tab switch detected! Stay focused!');
        }
      }
    });
  }

  showNoCopyNotice(message) {
    const existing = document.querySelector('.no-copy-notice');
    if (existing) existing.remove();
    const notice = document.createElement('div');
    notice.className = 'no-copy-notice';
    notice.textContent = message;
    document.body.appendChild(notice);
    setTimeout(() => { if (notice.parentNode) notice.remove(); }, 2500);
  }

  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// Submit test handler
function submitTest() {
  if (window.app && window.app.testStarted && !window.app.testFinished) {
    if (confirm('क्या आप वाकई टेस्ट सबमिट करना चाहते हैं?\n(Are you sure you want to submit?)')) {
      window.app.finishTest();
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TypingSimulator();
});
