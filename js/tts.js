// ═══════════════════════════════════════════
//  tts.js — Text to Speech Module
//  Uses Web Speech API (free, built-in browser)
//  Supports Hindi voice
// ═══════════════════════════════════════════

const TTS = (() => {

  let currentUtterance = null;
  let hindiVoice = null;

  /**
   * Load available voices and find Hindi voice
   */
  function loadVoices() {
    if (!window.speechSynthesis) return;

    const voices = window.speechSynthesis.getVoices();
    hindiVoice = voices.find(v =>
      v.lang.startsWith('hi') ||
      v.lang === 'hi-IN' ||
      v.name.toLowerCase().includes('hindi')
    );

    // Fallback to any Indian English voice
    if (!hindiVoice) {
      hindiVoice = voices.find(v => v.lang === 'en-IN') || null;
    }

    console.log('[TTS] Hindi voice:', hindiVoice ? hindiVoice.name : 'not found, using default');
  }

  // Voices load async — set up listener
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    // Try immediate load too
    setTimeout(loadVoices, 500);
  }

  /**
   * Speak text aloud
   * @param {string} text - text to speak
   */
  function speak(text) {
    if (!window.speechSynthesis) {
      App.showToast('⚠️ आपका ब्राउज़र TTS को सपोर्ट नहीं करता');
      return;
    }

    // Stop any current speech
    stop();

    const utterance = new SpeechSynthesisUtterance(text);

    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    utterance.lang  = 'hi-IN';
    utterance.rate  = 0.85;  // slightly slower for clarity
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      console.log('[TTS] Speaking...');
    };

    utterance.onerror = (e) => {
      console.warn('[TTS] Error:', e.error);
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Stop current speech
   */
  function stop() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    currentUtterance = null;
  }

  /**
   * Check if TTS is supported
   */
  function isSupported() {
    return !!window.speechSynthesis;
  }

  return { speak, stop, isSupported };
})();
