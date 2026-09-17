// ==========================================
// Animal Akinator - Main Application Controller
// ==========================================

// Loaded via script tags: window.AkinatorData, window.AkinatorEngine

// --- Audio Synthesizer (Web Audio API - No external dependencies) ---
class SoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playPop() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playNext() {
    if (this.muted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = this.ctx.currentTime + idx * 0.12;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.35);
    });
  }

  playStumped() {
    if (this.muted) return;
    this.init();
    const notes = [440, 392, 349.23, 293.66]; // descending puzzled tones
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = this.ctx.currentTime + idx * 0.14;

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.2);
    });
  }
}

// --- Confetti Particle System ---
class ConfettiCannon {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 80) {
    const colors = ["#ff4d4d", "#f9ca24", "#6ab04c", "#22a6b3", "#be2edd", "#ff7979", "#f6e58d"];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: this.canvas.height / 2 + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        gravity: 0.35
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.alpha -= 0.008;

      if (p.alpha <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
    }
  }
}

// --- Game Master Application ---
class AnimalAkinatorApp {
  constructor() {
    this.engine = new AkinatorEngine();
    this.sound = new SoundManager();
    this.currentQuestion = null;

    // DOM Elements
    this.screens = {
      welcome: document.getElementById("welcome-screen"),
      game: document.getElementById("game-screen"),
      guess: document.getElementById("guess-screen"),
      fallback: document.getElementById("fallback-screen")
    };

    this.dom = {
      // Game Screen Elements
      questionNumber: document.getElementById("question-number"),
      questionCard: document.getElementById("question-card"),
      questionEmoji: document.getElementById("question-emoji"),
      questionText: document.getElementById("question-text"),
      questionHint: document.getElementById("question-hint"),
      confidenceBar: document.getElementById("confidence-bar"),
      confidenceValue: document.getElementById("confidence-val"),
      btnYes: document.getElementById("btn-yes"),
      btnNo: document.getElementById("btn-no"),
      btnDontKnow: document.getElementById("btn-dontknow"),
      btnUndo: document.getElementById("btn-undo"),

      // Mascot Elements
      mascot: document.getElementById("genie-mascot"),
      mascotBubble: document.getElementById("mascot-speech"),
      crystalBall: document.getElementById("crystal-ball"),

      // Guess Screen Elements
      guessEmoji: document.getElementById("guess-emoji"),
      guessName: document.getElementById("guess-name"),
      guessCategory: document.getElementById("guess-category"),
      guessFact: document.getElementById("guess-fact"),
      btnGuessYes: document.getElementById("btn-guess-yes"),
      btnGuessNo: document.getElementById("btn-guess-no"),
      btnPlayAgainGuess: document.getElementById("btn-play-again-guess"),

      // Fallback Screen Elements
      fallbackReason: document.getElementById("fallback-reason"),
      btnPlayAgainFallback: document.getElementById("btn-play-again-fallback"),
      btnTeachAkinator: document.getElementById("btn-teach-akinator"),

      // Global Controls
      btnStartGame: document.getElementById("btn-start-game"),
      btnMute: document.getElementById("btn-mute"),
      btnOpenBestiary: document.getElementById("btn-open-bestiary"),
      btnCloseBestiary: document.getElementById("btn-close-bestiary"),
      bestiaryModal: document.getElementById("bestiary-modal"),
      bestiaryGrid: document.getElementById("bestiary-grid"),
      bestiarySearch: document.getElementById("bestiary-search"),

      // Teach Modal
      teachModal: document.getElementById("teach-modal"),
      btnCloseTeach: document.getElementById("btn-close-teach"),
      teachForm: document.getElementById("teach-form"),
      inputAnimalName: document.getElementById("teach-name"),
      inputAnimalEmoji: document.getElementById("teach-emoji"),

      // Canvas
      confettiCanvas: document.getElementById("confetti-canvas")
    };

    this.confetti = new ConfettiCannon(this.dom.confettiCanvas);

    this.bindEvents();
    this.renderBestiary();
  }

  bindEvents() {
    // Start game
    this.dom.btnStartGame.addEventListener("click", () => {
      this.sound.playPop();
      this.startGame();
    });

    // Answer buttons
    this.dom.btnYes.addEventListener("click", () => this.handleAnswer("yes"));
    this.dom.btnNo.addEventListener("click", () => this.handleAnswer("no"));
    this.dom.btnDontKnow.addEventListener("click", () => this.handleAnswer("dont_know"));

    // Undo button
    this.dom.btnUndo.addEventListener("click", () => this.handleUndo());

    // Guess response buttons
    this.dom.btnGuessYes.addEventListener("click", () => {
      this.sound.playVictory();
      this.confetti.burst(100);
      this.setMascotMood("victory", "I knew it! The Great Animal Akinator never fails! 🏆✨");
      this.dom.btnGuessYes.style.display = "none";
      this.dom.btnGuessNo.style.display = "none";
      this.dom.btnPlayAgainGuess.style.display = "inline-flex";
    });

    this.dom.btnGuessNo.addEventListener("click", () => {
      this.sound.playStumped();
      this.setMascotMood("stumped", "Oh no! My crystal ball was clouded! 🔮💨");
      this.showScreen("fallback");
      this.dom.fallbackReason.textContent = "I made my best guess, but your animal remains a mystical mystery!";
    });

    this.dom.btnPlayAgainGuess.addEventListener("click", () => {
      this.sound.playPop();
      this.startGame();
    });

    this.dom.btnPlayAgainFallback.addEventListener("click", () => {
      this.sound.playPop();
      this.startGame();
    });

    // Mute toggle
    this.dom.btnMute.addEventListener("click", () => {
      this.sound.muted = !this.sound.muted;
      this.dom.btnMute.innerHTML = this.sound.muted
        ? '<span class="icon">🔇</span><span>Unmute</span>'
        : '<span class="icon">🔊</span><span>Mute</span>';
    });

    // Bestiary / Animal Library Modal
    this.dom.btnOpenBestiary.addEventListener("click", () => {
      this.sound.playPop();
      this.dom.bestiaryModal.classList.add("active");
    });

    this.dom.btnCloseBestiary.addEventListener("click", () => {
      this.sound.playPop();
      this.dom.bestiaryModal.classList.remove("active");
    });

    this.dom.bestiaryModal.addEventListener("click", (e) => {
      if (e.target === this.dom.bestiaryModal) {
        this.dom.bestiaryModal.classList.remove("active");
      }
    });

    this.dom.bestiarySearch.addEventListener("input", (e) => {
      this.renderBestiary(e.target.value.trim().toLowerCase());
    });

    // Teach Modal
    this.dom.btnTeachAkinator.addEventListener("click", () => {
      this.sound.playPop();
      this.dom.teachModal.classList.add("active");
    });

    this.dom.btnCloseTeach.addEventListener("click", () => {
      this.dom.teachModal.classList.remove("active");
    });

    this.dom.teachForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSaveLearnedAnimal();
    });

    // Keyboard navigation
    window.addEventListener("keydown", (e) => {
      if (this.screens.game.classList.contains("active")) {
        const key = e.key.toLowerCase();
        if (key === "y" || key === "1") {
          this.handleAnswer("yes");
        } else if (key === "n" || key === "2") {
          this.handleAnswer("no");
        } else if (key === "d" || key === "3") {
          this.handleAnswer("dont_know");
        } else if ((key === "u" || key === "backspace") && this.engine.canUndo()) {
          this.handleUndo();
        }
      }
    });
  }

  showScreen(screenKey) {
    Object.keys(this.screens).forEach(key => {
      this.screens[key].classList.remove("active");
    });
    this.screens[screenKey].classList.add("active");
  }

  setMascotMood(mood, dialogue) {
    this.dom.mascot.className = `genie-mascot mood-${mood}`;
    if (dialogue) {
      this.dom.mascotBubble.textContent = dialogue;
      this.dom.mascotBubble.classList.add("pulse");
      setTimeout(() => this.dom.mascotBubble.classList.remove("pulse"), 400);
    }
  }

  startGame() {
    this.engine.reset();
    this.showScreen("game");
    this.setMascotMood("thinking", "Close your eyes... Picture your animal clearly in your mind! 🧠✨");
    this.renderNextQuestion();
  }

  renderNextQuestion() {
    this.currentQuestion = this.engine.getNextQuestion();

    // Check if engine is ready to guess or out of questions
    if (!this.currentQuestion || this.engine.isReadyToGuess()) {
      this.makeGuess();
      return;
    }

    // Update Question counter
    const currentNum = this.engine.questionCount + 1;
    this.dom.questionNumber.textContent = `Question ${currentNum} of ${this.engine.estimatedMaxQuestions}`;

    // Update Undo button state
    this.dom.btnUndo.disabled = !this.engine.canUndo();

    // Smooth card transition
    this.dom.questionCard.classList.remove("active-card");
    void this.dom.questionCard.offsetWidth; // trigger reflow
    this.dom.questionCard.classList.add("active-card");

    // Populate question card
    this.dom.questionEmoji.textContent = this.currentQuestion.emoji;
    this.dom.questionText.textContent = this.currentQuestion.text;
    this.dom.questionHint.textContent = this.currentQuestion.hint || "";

    // Update confidence gauge
    const confidence = this.engine.getConfidence();
    this.dom.confidenceBar.style.width = `${confidence}%`;
    this.dom.confidenceValue.textContent = `${confidence}%`;

    // Dynamic Genie Dialogue
    if (currentNum === 1) {
      this.setMascotMood("thinking", "Let's begin! Answer truthfully so my crystal ball shines bright. 🔮");
    } else if (confidence >= 75) {
      this.setMascotMood("confident", "Aha! The ethereal animal spirits are whispering to me! 💫");
    } else if (confidence >= 45) {
      this.setMascotMood("thinking", "Fascinating... the clues are coming together nicely! 🔍");
    } else {
      this.setMascotMood("curious", "Hmm, tell me more about this creature... 🐾");
    }

    this.sound.playNext();
  }

  handleAnswer(answer) {
    if (!this.currentQuestion) return;

    this.sound.playPop();
    const result = this.engine.answerQuestion(this.currentQuestion.id, answer);

    if (result.candidatesLeft === 0) {
      // Stumped!
      this.handleStumped();
      return;
    }

    if (result.candidatesLeft === 1 || this.engine.isReadyToGuess()) {
      this.makeGuess();
    } else {
      this.renderNextQuestion();
    }
  }

  handleUndo() {
    if (!this.engine.canUndo()) return;
    this.sound.playPop();
    this.engine.undo();
    this.setMascotMood("thinking", "Rewinding time... let's rethink that step! ⏳");
    this.renderNextQuestion();
  }

  makeGuess() {
    const guess = this.engine.getBestGuess();

    if (!guess) {
      this.handleStumped();
      return;
    }

    this.sound.playVictory();
    this.confetti.burst(70);

    this.dom.guessEmoji.textContent = guess.emoji;
    this.dom.guessName.textContent = guess.name;
    this.dom.guessCategory.textContent = guess.category || "Wonder of Nature";
    this.dom.guessFact.textContent = guess.funFact || "A truly fascinating creature of the animal kingdom!";

    // Reset button states on guess screen
    this.dom.btnGuessYes.style.display = "inline-flex";
    this.dom.btnGuessNo.style.display = "inline-flex";
    this.dom.btnPlayAgainGuess.style.display = "none";

    this.setMascotMood("confident", `Behold! My crystal ball sees your thought clearly! Is this your animal? 🔮`);
    this.showScreen("guess");
  }

  handleStumped() {
    this.sound.playStumped();
    this.dom.fallbackReason.textContent = "I couldn't guess your animal with the clues given. You have stumped the great Akinator!";
    this.setMascotMood("stumped", "By the great whiskers! You've outsmarted me! 🎩💥");
    this.showScreen("fallback");
  }

  handleSaveLearnedAnimal() {
    const name = this.dom.inputAnimalName.value.trim();
    const emoji = this.dom.inputAnimalEmoji.value.trim() || "🐾";

    if (!name) return;

    // Use current traits from history to teach
    const newTraits = {};
    this.engine.history.forEach(h => {
      if (h.answer === "yes") newTraits[h.questionId] = true;
      if (h.answer === "no") newTraits[h.questionId] = false;
    });

    const newAnimal = {
      id: "custom_" + Date.now(),
      name: name,
      emoji: emoji,
      category: "User Taught Animal",
      funFact: `Taught to the Akinator by an observant human explorer!`,
      traits: newTraits
    };

    this.engine.saveCustomAnimal(newAnimal);
    this.dom.teachModal.classList.remove("active");
    this.dom.teachForm.reset();
    this.renderBestiary();
    this.confetti.burst(60);
    alert(`🎉 Awesome! The Akinator has memorized ${emoji} ${name}!`);
    this.startGame();
  }

  renderBestiary(filter = "") {
    const animals = this.engine.allAnimals.filter(a =>
      a.name.toLowerCase().includes(filter) ||
      (a.category && a.category.toLowerCase().includes(filter))
    );

    this.dom.bestiaryGrid.innerHTML = animals.map(a => `
      <div class="bestiary-card">
        <div class="card-emoji">${a.emoji}</div>
        <div class="card-info">
          <h4>${a.name}</h4>
          <span class="card-category">${a.category || "Creature"}</span>
          <p class="card-fact">${a.funFact || ""}</p>
        </div>
      </div>
    `).join("");
  }
}

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
  window.app = new AnimalAkinatorApp();
});
