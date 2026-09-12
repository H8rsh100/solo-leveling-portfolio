// ─── System Voice — cold TTS for System announcements (mute by default) ───
(function () {
  const KEY = 'sl-voice';
  let enabled = false;
  try { enabled = localStorage.getItem(KEY) === '1'; } catch (e) {}

  function pickVoice() {
    try {
      const vs = window.speechSynthesis.getVoices() || [];
      return vs.find(v => /en/i.test(v.lang) && /google uk english male|daniel|david|alex/i.test(v.name))
        || vs.find(v => /^en/i.test(v.lang)) || null;
    } catch (e) { return null; }
  }

  function speak(text) {
    if (!enabled) return;
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.82;   // slow, cold delivery
      u.pitch = 0.55;
      u.volume = 1;
      const v = pickVoice();
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  // Warm up voice list (loads async in some browsers)
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  } catch (e) {}

  function render(btn) {
    btn.textContent = enabled ? '🔊 VOICE: ON' : '🔇 VOICE: OFF';
    btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
  }

  const btn = document.createElement('button');
  btn.id = 'voice-toggle';
  btn.type = 'button';
  btn.title = 'Toggle System voice';
  render(btn);
  btn.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem(KEY, enabled ? '1' : '0'); } catch (e) {}
    render(btn);
    if (enabled) speak('System voice online.');
    else { try { window.speechSynthesis.cancel(); } catch (e) {} }
  });
  document.body.appendChild(btn);

  // Speak when the ARISE section summons (observed, no coupling to effects.js)
  const obs = new MutationObserver(() => {
    const t = document.getElementById('arise-text');
    if (t && t.classList.contains('summoning')) {
      speak('Arise.');
      obs.disconnect();
    }
  });
  obs.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

  window.SystemVoice = {
    speak,
    isEnabled: () => enabled
  };
})();
