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
  { text: '「 System 」 Dungeon records accessed.', icon: '🏰' },
  { text: '「 System 」 Shadow extraction complete.', icon: '👁️' }
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

// ═══ ARISE — SHADOW ARMY SUMMONING ═══
let ariseTriggered = false;
function initArise() {
  const section = document.getElementById('arise-section');
  const ariseText = document.getElementById('arise-text');
  const ariseCanvas = document.getElementById('arise-canvas');
  if (!section || !ariseCanvas) return;

  const aCtx = ariseCanvas.getContext('2d');
  let aW, aH;
  function resizeA() { aW = ariseCanvas.width = section.clientWidth; aH = ariseCanvas.height = section.clientHeight; }
  resizeA();
  window.addEventListener('resize', resizeA);

  // Shadow smoke particles
  let smokeParticles = [];
  class SmokeParticle {
    constructor() {
      this.x = Math.random() * aW;
      this.y = aH + Math.random() * 20;
      this.size = Math.random() * 40 + 20;
      this.speedY = -(Math.random() * 1.5 + 0.5);
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.life = 1;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.life -= 0.005;
      this.size += 0.3;
    }
    draw() {
      if (this.life <= 0) return;
      aCtx.save();
      aCtx.globalAlpha = this.opacity * this.life;
      const grad = aCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, 'rgba(74, 144, 255, 0.15)');
      grad.addColorStop(0.5, 'rgba(155, 89, 255, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      aCtx.fillStyle = grad;
      aCtx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      aCtx.restore();
    }
  }

  // Shadow soldiers — hooded variants with pillars, horns, eye flicker
  let soldiers = [];
  let embers = [];
  function spawnSoldiers() {
    const count = Math.floor(aW / 55);
    for (let i = 0; i < count; i++) {
      soldiers.push({
        x: (aW / (count + 1)) * (i + 1) + (Math.random() - 0.5) * 30,
        targetY: aH * 0.42 + Math.random() * (aH * 0.3),
        y: aH + 60,
        eyeGap: 5 + Math.random() * 3,
        eyeSize: 2 + Math.random() * 2,
        delay: Math.random() * 40,
        frame: 0,
        height: 60 + Math.random() * 70,
        width: 13 + Math.random() * 8,
        horns: Math.random() < 0.3,
        pillar: Math.random() < 0.45,
        purple: Math.random() < 0.25,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  let ariseAnimating = false;
  function animateArise() {
    if (!ariseAnimating) return;
    const t = performance.now() / 1000;
    aCtx.clearRect(0, 0, aW, aH);

    // Spawn smoke
    if (Math.random() > 0.3) smokeParticles.push(new SmokeParticle());
    smokeParticles.forEach(p => { p.update(); p.draw(); });
    smokeParticles = smokeParticles.filter(p => p.life > 0);

    // Rising embers
    for (let i = 0; i < 2; i++) {
      embers.push({
        x: Math.random() * aW,
        y: aH + 5,
        vy: -(0.6 + Math.random() * 1.4),
        sway: Math.random() * Math.PI * 2,
        size: 0.8 + Math.random() * 1.6,
        life: 1,
        col: Math.random() < 0.12 ? '255,215,0' : (Math.random() < 0.5 ? '74,144,255' : '155,89,255')
      });
    }
    for (let i = embers.length - 1; i >= 0; i--) {
      const e = embers[i];
      e.y += e.vy; e.sway += 0.05; e.x += Math.sin(e.sway) * 0.4; e.life -= 0.004;
      if (e.life <= 0 || e.y < -10) { embers.splice(i, 1); continue; }
      const tw = 0.4 + 0.6 * Math.abs(Math.sin(e.sway * 2));
      aCtx.save();
      aCtx.globalAlpha = e.life * tw;
      aCtx.shadowColor = 'rgba(' + e.col + ',0.9)';
      aCtx.shadowBlur = 8;
      aCtx.fillStyle = 'rgba(' + e.col + ',1)';
      aCtx.beginPath();
      aCtx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      aCtx.fill();
      aCtx.restore();
    }
    if (embers.length > 220) embers.splice(0, embers.length - 220);

    // Ground fog band
    const fogA = 0.10 + 0.03 * Math.sin(t * 0.8);
    const fog = aCtx.createLinearGradient(0, aH * 0.68, 0, aH);
    fog.addColorStop(0, 'rgba(74,144,255,0)');
    fog.addColorStop(1, 'rgba(74,144,255,' + fogA.toFixed(3) + ')');
    aCtx.fillStyle = fog;
    aCtx.fillRect(0, aH * 0.68, aW, aH * 0.32);

    // Draw soldiers
    soldiers.forEach(s => {
      s.frame++;
      if (s.frame < s.delay) return;
      if (s.y > s.targetY) s.y -= Math.max(0.35, (s.y - s.targetY) * 0.035);
      const rise = Math.min(1, (s.frame - s.delay) / 40);
      const col = s.purple ? '155,89,255' : '74,144,255';
      const top = s.y - s.height, w = s.width;

      aCtx.save();
      aCtx.globalAlpha = rise;

      // Light pillar behind chosen soldiers
      if (s.pillar) {
        const pg = aCtx.createLinearGradient(0, 0, 0, s.y);
        pg.addColorStop(0, 'rgba(' + col + ',0)');
        pg.addColorStop(1, 'rgba(' + col + ',0.20)');
        aCtx.fillStyle = pg;
        aCtx.fillRect(s.x - 3, 0, 6, s.y);
      }

      // Hooded cloak silhouette
      const bg = aCtx.createLinearGradient(s.x, top, s.x, s.y + 20);
      bg.addColorStop(0, 'rgba(4, 2, 12, 0.1)');
      bg.addColorStop(0.4, 'rgba(16, 8, 34, 0.75)');
      bg.addColorStop(1, 'rgba(6, 3, 14, 0.9)');
      aCtx.fillStyle = bg;
      aCtx.beginPath();
      aCtx.moveTo(s.x, top - 8);
      aCtx.bezierCurveTo(s.x + w, top + 6, s.x + w * 0.9, top + s.height * 0.5, s.x + w * 0.7, s.y + 18);
      aCtx.lineTo(s.x - w * 0.7, s.y + 18);
      aCtx.bezierCurveTo(s.x - w * 0.9, top + s.height * 0.5, s.x - w, top + 6, s.x, top - 8);
      aCtx.fill();
      aCtx.strokeStyle = 'rgba(' + col + ',0.35)';
      aCtx.lineWidth = 1;
      aCtx.stroke();

      // Horns on elites
      if (s.horns) {
        aCtx.fillStyle = 'rgba(8, 4, 18, 0.95)';
        aCtx.beginPath();
        aCtx.moveTo(s.x - 6, top + 4); aCtx.lineTo(s.x - 13, top - 12); aCtx.lineTo(s.x - 2, top - 1);
        aCtx.moveTo(s.x + 6, top + 4); aCtx.lineTo(s.x + 13, top - 12); aCtx.lineTo(s.x + 2, top - 1);
        aCtx.fill();
      }

      // Eyes — flickering glow with white-hot core
      const flick = 0.72 + 0.28 * Math.sin(t * 6 + s.phase);
      const eyeY = top + s.height * 0.28;
      aCtx.globalAlpha = rise * flick;
      aCtx.shadowColor = 'rgb(' + col + ')';
      aCtx.shadowBlur = 14;
      aCtx.fillStyle = 'rgb(' + col + ')';
      aCtx.beginPath();
      aCtx.ellipse(s.x - s.eyeGap, eyeY, s.eyeSize + 0.8, s.eyeSize * 0.7, 0, 0, Math.PI * 2);
      aCtx.ellipse(s.x + s.eyeGap, eyeY, s.eyeSize + 0.8, s.eyeSize * 0.7, 0, 0, Math.PI * 2);
      aCtx.fill();
      aCtx.shadowBlur = 0;
      aCtx.fillStyle = 'rgba(255,255,255,0.9)';
      aCtx.beginPath();
      aCtx.arc(s.x - s.eyeGap, eyeY, s.eyeSize * 0.35, 0, Math.PI * 2);
      aCtx.arc(s.x + s.eyeGap, eyeY, s.eyeSize * 0.35, 0, Math.PI * 2);
      aCtx.fill();
      aCtx.restore();
    });

    requestAnimationFrame(animateArise);
  }

  // Scroll trigger
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !ariseTriggered) {
        ariseTriggered = true;
        triggerArise();
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  obs.observe(section);

  function triggerArise() {
    // Start smoke & soldiers
    ariseAnimating = true;
    spawnSoldiers();
    animateArise();

    // Screen shake
    setTimeout(() => {
      section.style.animation = 'screenShake 0.4s ease-out';
    }, 600);

    // ARISE text slam
    gsap.to(ariseText, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      delay: 0.6,
      ease: 'back.out(2)',
      onStart: () => ariseText.classList.add('summoning')
    });

    // Energy pulse ring
    gsap.fromTo(ariseText, {
      textShadow: '0 0 20px rgba(74,144,255,0.8), 0 0 60px rgba(74,144,255,0.5), 0 0 120px rgba(155,89,255,0.3)'
    }, {
      textShadow: '0 0 40px rgba(74,144,255,1), 0 0 100px rgba(74,144,255,0.8), 0 0 200px rgba(155,89,255,0.6), 0 0 300px rgba(155,89,255,0.2)',
      duration: 0.5,
      delay: 0.7,
      yoyo: true,
      repeat: 2,
      ease: 'power2.inOut'
    });
  }
}

// Add screen shake keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes screenShake {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-4px, -2px); }
  20% { transform: translate(4px, 2px); }
  30% { transform: translate(-3px, 3px); }
  40% { transform: translate(3px, -3px); }
  50% { transform: translate(-2px, 2px); }
  60% { transform: translate(2px, -1px); }
  70% { transform: translate(-1px, 1px); }
}`;
document.head.appendChild(shakeStyle);

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
    initArise();
    initCursorTrail();
  }, 500);
};

})();
