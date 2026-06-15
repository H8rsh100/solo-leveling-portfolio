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

  // Shadow soldier eyes
  let soldiers = [];
  function spawnSoldiers() {
    const count = Math.floor(aW / 60);
    for (let i = 0; i < count; i++) {
      soldiers.push({
        x: (aW / (count + 1)) * (i + 1) + (Math.random() - 0.5) * 30,
        targetY: aH * 0.45 + Math.random() * (aH * 0.3),
        y: aH + 50,
        eyeGap: 5 + Math.random() * 3,
        eyeSize: 2 + Math.random() * 2,
        speed: 0.8 + Math.random() * 1.2,
        delay: Math.random() * 40,
        frame: 0,
        height: 50 + Math.random() * 60
      });
    }
  }

  let ariseAnimating = false;
  function animateArise() {
    if (!ariseAnimating) return;
    aCtx.clearRect(0, 0, aW, aH);

    // Spawn smoke
    if (Math.random() > 0.3) smokeParticles.push(new SmokeParticle());
    smokeParticles.forEach(p => { p.update(); p.draw(); });
    smokeParticles = smokeParticles.filter(p => p.life > 0);

    // Draw soldiers
    soldiers.forEach(s => {
      s.frame++;
      if (s.frame < s.delay) return;
      if (s.y > s.targetY) s.y -= s.speed;

      // Shadow body
      aCtx.save();
      const bodyGrad = aCtx.createLinearGradient(s.x, s.y - s.height, s.x, s.y + 20);
      bodyGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      bodyGrad.addColorStop(0.3, 'rgba(20, 10, 40, 0.4)');
      bodyGrad.addColorStop(1, 'rgba(10, 5, 20, 0.6)');
      aCtx.fillStyle = bodyGrad;
      aCtx.beginPath();
      aCtx.ellipse(s.x, s.y, 15, s.height, 0, 0, Math.PI * 2);
      aCtx.fill();

      // Eyes
      const eyeY = s.y - s.height * 0.55;
      const alpha = Math.min(1, (s.frame - s.delay) / 30);
      aCtx.globalAlpha = alpha;
      aCtx.shadowColor = '#4A90FF';
      aCtx.shadowBlur = 12;
      aCtx.fillStyle = '#4A90FF';
      aCtx.beginPath();
      aCtx.arc(s.x - s.eyeGap, eyeY, s.eyeSize, 0, Math.PI * 2);
      aCtx.arc(s.x + s.eyeGap, eyeY, s.eyeSize, 0, Math.PI * 2);
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

// ═══ INIT ON GATE OPEN ═══
const origInit = window.initMainContent;
window.initMainContent = function() {
  if (origInit) origInit();
  setTimeout(() => {
    initSectionToasts();
    initCardTilt();
    initProximityGlow();
    initArise();
  }, 500);
};

})();
