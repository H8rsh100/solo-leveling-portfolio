// ─── Solo Leveling Effects — Mana Particles, System Toasts, Parallax ───
(function() {

// ═══ FLOATING MANA PARTICLES ═══
const manaCanvas = document.createElement('canvas');
manaCanvas.id = 'mana-particles';
manaCanvas.style.cssText = 'position:fixed;inset:0;z-index:1;pointer-events:none;';
document.body.appendChild(manaCanvas);
const mCtx = manaCanvas.getContext('2d');
let mW, mH;
function resizeMana() { mW = manaCanvas.width = window.innerWidth; mH = manaCanvas.height = window.innerHeight; }
resizeMana();
window.addEventListener('resize', resizeMana);

class ManaParticle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * mW;
    this.y = init ? Math.random() * mH : mH + 10;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedY = -(Math.random() * 0.4 + 0.15);
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6 ? '#4A90FF' : (Math.random() > 0.5 ? '#9B59FF' : '#6C63FF');
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(this.pulse) * 0.1;
    this.pulse += 0.02;
    if (this.y < -10) this.reset(false);
  }
  draw() {
    const a = this.opacity * (0.7 + Math.sin(this.pulse) * 0.3);
    mCtx.save();
    mCtx.globalAlpha = a;
    mCtx.shadowColor = this.color;
    mCtx.shadowBlur = 8;
    mCtx.fillStyle = this.color;
    mCtx.beginPath();
    mCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    mCtx.fill();
    mCtx.restore();
  }
}

const manaParticles = [];
for (let i = 0; i < 60; i++) manaParticles.push(new ManaParticle());

function animateMana() {
  mCtx.clearRect(0, 0, mW, mH);
  manaParticles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateMana);
}
animateMana();

// ═══ SYSTEM NOTIFICATION TOASTS ═══
const systemMessages = [
  { text: '「 System 」 New hunter profile loaded.', icon: '⚔️' },
  { text: '「 System 」 Skill data synchronized.', icon: '📊' },
  { text: '「 System 」 Dungeon records accessed.', icon: '🏰' }
];
let toastIndex = 0;
let toastContainer = null;

function createToastContainer() {
  toastContainer = document.createElement('div');
  toastContainer.id = 'system-toasts';
  toastContainer.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9990;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
  document.body.appendChild(toastContainer);
}

function showSystemToast(msg) {
  if (!toastContainer) createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'system-toast';
  toast.innerHTML = `<span class="toast-icon">${msg.icon}</span><span class="toast-text">${msg.text}</span>`;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ═══ SECTION SCROLL TRIGGERS ═══
function initSectionToasts() {
  // First message greets on arrival — no scroll needed
  setTimeout(() => {
    if (toastIndex === 0) {
      showSystemToast(systemMessages[0]);
      toastIndex = 1;
    }
  }, 2200);
  const sections = document.querySelectorAll('#skills, #projects, #globe-section, #footer');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && toastIndex < systemMessages.length) {
        showSystemToast(systemMessages[toastIndex]);
        toastIndex++;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(s => obs.observe(s));
}

// ═══ SHADOW MONARCH CURSOR TRAIL ═══
function initCursorTrail() {
  const trailCanvas = document.createElement('canvas');
  trailCanvas.style.cssText = 'position:fixed;inset:0;z-index:9996;pointer-events:none;';
  document.body.appendChild(trailCanvas);
  const tCtx = trailCanvas.getContext('2d');
  let tW, tH;
  function resizeTrail() { tW = trailCanvas.width = window.innerWidth; tH = trailCanvas.height = window.innerHeight; }
  resizeTrail();
  window.addEventListener('resize', resizeTrail);

  const trail = [];
  let mouseX = -100, mouseY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    for (let i = 0; i < 2; i++) {
      trail.push({
        x: mouseX + (Math.random() - 0.5) * 8,
        y: mouseY + (Math.random() - 0.5) * 8,
        size: Math.random() * 6 + 2,
        life: 1,
        decay: 0.015 + Math.random() * 0.01,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        color: Math.random() > 0.5 ? '74,144,255' : '155,89,255'
      });
    }
  });

  function animateTrail() {
    tCtx.clearRect(0, 0, tW, tH);
    for (let i = trail.length - 1; i >= 0; i--) {
      const p = trail[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.size *= 0.98;
      if (p.life <= 0) { trail.splice(i, 1); continue; }
      tCtx.save();
      tCtx.globalAlpha = p.life * 0.6;
      tCtx.shadowColor = `rgba(${p.color},0.8)`;
      tCtx.shadowBlur = 10;
      tCtx.fillStyle = `rgba(${p.color},${p.life})`;
      tCtx.beginPath();
      tCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      tCtx.fill();
      tCtx.restore();
    }
    if (trail.length > 150) trail.splice(0, trail.length - 150);
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
}

// ─── Quest tracker removed (was dead code: never called, no styles) ───

// ─── ARISE section removed — constellation follows the status window ───

// ═══ CARD 3D TILT ON HOVER ═══
function initCardTilt() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const inCard = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (inCard) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      } else {
        card.style.transform = '';
      }
    });
  });
}

// ═══ MOUSE PROXIMITY GLOW ═══
function initProximityGlow() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      const maxDist = 300;
      if (dist < maxDist) {
        const intensity = 1 - dist / maxDist;
        const relX = ((e.clientX - rect.left) / rect.width) * 100;
        const relY = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--glow-x', relX + '%');
        card.style.setProperty('--glow-y', relY + '%');
        card.style.setProperty('--glow-intensity', intensity);
      } else {
        card.style.setProperty('--glow-intensity', 0);
      }
    });
  });
}

// ═══ INIT ON GATE OPEN ═══
const origInit = window.initMainContent;
window.initMainContent = function() {
  if (origInit) origInit();
  setTimeout(() => {
    initSectionToasts();
    initCardTilt();
    initProximityGlow();
    initCursorTrail();
  }, 500);
};

})();
