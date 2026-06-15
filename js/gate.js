// ─── Gate Intro — Dungeon Rift Animation ───
(function() {
  const overlay = document.getElementById('gate-overlay');
  const canvas = document.getElementById('gate-canvas');
  const ctx = canvas.getContext('2d');
  const statusText = document.getElementById('gate-status');
  const progressBar = document.getElementById('gate-progress-fill');
  const runeEl = document.getElementById('gate-rune');

  let W, H, particles = [], riftParticles = [];
  let animFrame;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ─── Rift Particle class ───
  class RiftParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = W / 2 + (Math.random() - 0.5) * 4;
      this.y = H / 2 + (Math.random() - 0.5) * H * 0.6;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.life = Math.random() * 60 + 30;
      this.maxLife = this.life;
      this.size = Math.random() * 3 + 1;
      this.color = Math.random() > 0.5 ? '#4A90FF' : '#9B59FF';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
      if (this.life <= 0) this.reset();
    }
    draw() {
      const alpha = this.life / this.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha * 0.8;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 15;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ─── Burst Particle class ───
  class BurstParticle {
    constructor(x, y) {
      this.x = x; this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = Math.random() * 40 + 20;
      this.maxLife = this.life;
      this.size = Math.random() * 4 + 1;
      this.color = ['#4A90FF', '#9B59FF', '#FFD700', '#fff'][Math.floor(Math.random() * 4)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.97;
      this.vy *= 0.97;
      this.life--;
    }
    draw() {
      const alpha = this.life / this.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Init rift particles
  for (let i = 0; i < 80; i++) {
    riftParticles.push(new RiftParticle());
  }

  // ─── Draw rift crack ───
  function drawRift(openness) {
    ctx.save();
    ctx.translate(W / 2, H / 2);
    // Glow
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 200 * openness);
    grad.addColorStop(0, 'rgba(74, 144, 255, 0.4)');
    grad.addColorStop(0.5, 'rgba(155, 89, 255, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(-300, -H / 2, 600, H);

    // Rift line
    ctx.strokeStyle = '#4A90FF';
    ctx.lineWidth = 2 + openness * 3;
    ctx.shadowColor = '#4A90FF';
    ctx.shadowBlur = 30 + openness * 20;
    ctx.beginPath();
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * H * 0.7;
      const wobble = Math.sin(t * 8 + performance.now() * 0.003) * (8 * openness);
      if (i === 0) ctx.moveTo(wobble, y);
      else ctx.lineTo(wobble, y);
    }
    ctx.stroke();

    // Second rift line (purple)
    ctx.strokeStyle = '#9B59FF';
    ctx.shadowColor = '#9B59FF';
    ctx.lineWidth = 1 + openness * 2;
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * H * 0.7;
      const wobble = Math.sin(t * 6 + performance.now() * 0.004 + 1) * (6 * openness);
      if (i === 0) ctx.moveTo(wobble + 3, y);
      else ctx.lineTo(wobble + 3, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  // ─── Rift animation loop ───
  let riftOpenness = 0;
  function animateRift() {
    ctx.clearRect(0, 0, W, H);
    riftOpenness = Math.min(riftOpenness + 0.008, 1);
    drawRift(riftOpenness);
    riftParticles.forEach(p => { p.update(); p.draw(); });
    particles.forEach(p => { p.update(); p.draw(); });
    particles = particles.filter(p => p.life > 0);
    animFrame = requestAnimationFrame(animateRift);
  }
  animateRift();

  // ─── Sequence ───
  const messages = [
    "Scanning anomaly...",
    "Mana signature detected...",
    "Threat level: IMMEASURABLE",
    "Class S Developer detected"
  ];

  const tl = gsap.timeline({ delay: 0.5 });

  // Status messages
  messages.forEach((msg, i) => {
    tl.to(statusText, {
      duration: 0.05,
      onStart: () => { statusText.textContent = msg; },
      onComplete: () => {}
    }, i * 1.0);
  });

  // Progress bar
  tl.to(progressBar, {
    width: '100%',
    duration: 3.5,
    ease: 'power1.inOut'
  }, 0);

  // Show rune after progress
  tl.to(runeEl, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: 'back.out(1.7)',
    onStart: () => { runeEl.style.display = 'block'; }
  }, 3.8);

  // Rune shatter — burst particles
  tl.to(runeEl, {
    opacity: 0,
    scale: 3,
    filter: 'blur(10px)',
    duration: 0.6,
    ease: 'power3.in',
    onStart: () => {
      for (let i = 0; i < 200; i++) {
        particles.push(new BurstParticle(W / 2, H / 2));
      }
    }
  }, 5.2);

  // Flash
  tl.to(overlay, {
    backgroundColor: 'rgba(74, 144, 255, 0.3)',
    duration: 0.1,
    yoyo: true,
    repeat: 1
  }, 5.5);

  // Fade out overlay
  tl.to(overlay, {
    opacity: 0,
    duration: 1.2,
    ease: 'power2.inOut',
    onComplete: () => {
      cancelAnimationFrame(animFrame);
      overlay.style.display = 'none';
      document.body.classList.add('gate-open');
      // Trigger main content animations
      if (typeof initMainContent === 'function') initMainContent();
    }
  }, 5.8);
})();
