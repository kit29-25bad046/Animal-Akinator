// ==========================================
// Animal Akinator - Decision Engine
// ==========================================

class AkinatorEngine {
  constructor() {
    const { ANIMALS, QUESTIONS } = window.AkinatorData;
    this.defaultAnimals = ANIMALS;
    this.questionsList = QUESTIONS;
    this.allAnimals = [...this.defaultAnimals];
    this.loadCustomAnimals();
    this.reset();
  }

  loadCustomAnimals() {
    try {
      const saved = localStorage.getItem("akinator_custom_animals");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          this.allAnimals = [...this.defaultAnimals, ...parsed];
        }
      }
    } catch (e) {
      console.warn("Could not load custom animals:", e);
    }
  }

  saveCustomAnimal(animal) {
    try {
      const saved = localStorage.getItem("akinator_custom_animals");
      let list = saved ? JSON.parse(saved) : [];
      list.push(animal);
      localStorage.setItem("akinator_custom_animals", JSON.stringify(list));
      this.allAnimals.push(animal);
    } catch (e) {
      console.warn("Could not save custom animal:", e);
    }
  }

  reset() {
    this.candidates = [...this.allAnimals];
    this.askedQuestions = new Set();
    this.history = [];
    this.questionCount = 0;
    this.estimatedMaxQuestions = 8;
  }

  /**
   * Evaluates the best next question using information gain / binary split entropy.
   * Also prioritizes iconic introductory questions for natural game flow.
   */
  getNextQuestion() {
    // If only 1 animal remains, no more questions needed
    if (this.candidates.length <= 1) {
      return null;
    }

    const unasked = this.questionsList.filter(q => !this.askedQuestions.has(q.id));
    if (unasked.length === 0) {
      return null;
    }

    // Preferred sequence for the first 2-3 questions if they divide candidates well
    const starterPriority = ["has_fur", "has_four_legs", "is_wild", "lives_in_water", "has_wings", "can_fly", "is_domestic"];

    let bestQuestion = null;
    let bestScore = -Infinity;

    for (const question of unasked) {
      const qId = question.id;
      let yesCount = 0;
      let noCount = 0;

      for (const animal of this.candidates) {
        if (animal.traits[qId] === true) {
          yesCount++;
        } else {
          noCount++;
        }
      }

      // If everyone has the same trait answer, this question provides zero discrimination
      if (yesCount === 0 || noCount === 0) {
        continue;
      }

      // Ideal split is 50/50. Entropy score: closer to 0 difference is better
      const diff = Math.abs(yesCount - noCount);
      let score = 100 - diff * 10;

      // Bonus if it's one of the friendly introductory starter questions early in game
      if (this.questionCount < 3 && starterPriority.includes(qId)) {
        score += 15;
      }

      if (score > bestScore) {
        bestScore = score;
        bestQuestion = question;
      }
    }

    // If no question discriminates remaining candidates, return null
    return bestQuestion;
  }

  /**
   * Process an answer: 'yes', 'no', or 'dont_know'
   */
  answerQuestion(questionId, answer) {
    this.history.push({
      questionId,
      answer,
      candidates: [...this.candidates],
      askedQuestions: new Set(this.askedQuestions),
      questionCount: this.questionCount
    });

    this.askedQuestions.add(questionId);
    this.questionCount++;

    if (answer === "yes") {
      this.candidates = this.candidates.filter(animal => animal.traits[questionId] === true);
    } else if (answer === "no") {
      this.candidates = this.candidates.filter(animal => animal.traits[questionId] === false);
    } else if (answer === "dont_know") {
      // Don't filter strictly on 'don't know', just let it narrow through other questions
    }

    return {
      candidatesLeft: this.candidates.length,
      confidence: this.getConfidence()
    };
  }

  /**
   * Undo previous answer
   */
  undo() {
    if (this.history.length === 0) return null;
    const previousState = this.history.pop();
    this.candidates = previousState.candidates;
    this.askedQuestions = previousState.askedQuestions;
    this.questionCount = previousState.questionCount;
    return previousState;
  }

  canUndo() {
    return this.history.length > 0;
  }

  /**
   * Calculates Genie Confidence (0 - 100%)
   */
  getConfidence() {
    const total = this.allAnimals.length;
    const left = this.candidates.length;

    if (left === 1) return 100;
    if (left === 0) return 0;
    if (left === 2) return 85;
    if (left === 3) return 70;

    const ratio = Math.max(0, (total - left) / total);
    return Math.min(95, Math.round(ratio * 100 * 0.9 + (this.questionCount * 6)));
  }

  /**
   * Returns current best candidate or null
   */
  getBestGuess() {
    if (this.candidates.length >= 1) {
      return this.candidates[0];
    }
    return null;
  }

  /**
   * Check if game is ready to guess
   */
  isReadyToGuess() {
    if (this.candidates.length === 1) return true;
    if (this.candidates.length === 0) return true;
    // If we've asked 9+ questions or confidence is high, make the best guess
    if (this.questionCount >= 9 || this.getNextQuestion() === null) {
      return true;
    }
    return false;
  }
}

if (typeof window !== "undefined") {
  window.AkinatorEngine = AkinatorEngine;
}
