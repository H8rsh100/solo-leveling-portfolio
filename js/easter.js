// ─── Rune Easter Egg — type ARISE anywhere to trigger a shadow burst ───
(function () {
  const SEQ = 'arise';
  const COOLDOWN = 10000;
  let buf = [];
  let cooling = false;

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (typeof e.key !== 'string' || e.key.length !== 1) return;
    buf.push(e.key.toLowerCase());
    if (buf.length > SEQ.length) buf.shift();
    if (buf.join('') === SEQ) { buf = []; triggerBurst(); }
  });

  function triggerBurst() {
    if (cooling) return;
    cooling = true;
    setTimeout(() => { cooling = false; }, COOLDOWN);

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const overlay = document.createElement('div');
    overlay.id = 'arise-easter';
    overlay.innerHTML = '<canvas id="arise-easter-canvas"></canvas><div class="easter-word">ARISE</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));

    if (!reduced) {
      try { overlay.style.animation = 'screenShake 0.4s ease-out'; } catch (e) {}
      runSmoke(overlay.querySelector('canvas'));
    }

    setTimeout(() => {
      overlay.classList.remove('show');
      overlay.classList.add('fade');
      setTimeout(() => overlay.remove(), 600);
    }, 2600);
  }

  // Rising shadow smoke + glowing eyes, self-contained on the overlay canvas
  function runSmoke(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    function rs() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    rs();
    window.addEventListener('resize', rs);

    const smokes = [];
    const soldiers = [];
    const count = Math.floor(W / 70);
    for (let i = 0; i < count; i++) {
      soldiers.push({
        x: (W / (count + 1)) * (i + 1) + (Math.random() - 0.5) * 30,
        targetY: H * 0.45 + Math.random() * H * 0.3,
        y: H + 50,
        speed: 1 + Math.random() * 1.5,
        delay: Math.random() * 40,
        frame: 0,
        height: 50 + Math.random() * 70,
        eyeGap: 5 + Math.random() * 3
      });
    }

    let alive = true;
    setTimeout(() => { alive = false; }, 3000);

    (function loop() {
      if (!alive || !canvas.isConnected) return;
      ctx.clearRect(0, 0, W, H);
      if (Math.random() > 0.3) {
        smokes.push({
          x: Math.random() * W, y: H + 20,
          size: Math.random() * 40 + 20,
          vy: -(Math.random() * 1.5 + 0.5),
          life: 1
        });
      }
      for (let i = smokes.length - 1; i >= 0; i--) {
        const p = smokes[i];
        p.y += p.vy; p.life -= 0.008; p.size += 0.3;
        if (p.life <= 0) { smokes.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = 0.35 * p.life;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        g.addColorStop(0, 'rgba(74, 144, 255, 0.18)');
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
        ctx.restore();
      }
      soldiers.forEach(s => {
        s.frame++;
        if (s.frame < s.delay) return;
        if (s.y > s.targetY) s.y -= s.speed;

        // Shadow body
        ctx.save();
        const bodyGrad = ctx.createLinearGradient(s.x, s.y - s.height, s.x, s.y + 20);
        bodyGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        bodyGrad.addColorStop(0.3, 'rgba(20, 10, 40, 0.4)');
        bodyGrad.addColorStop(1, 'rgba(10, 5, 20, 0.6)');
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, 15, s.height, 0, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        const eyeY = s.y - s.height * 0.55;
        const alpha = Math.min(1, (s.frame - s.delay) / 30);
        ctx.globalAlpha = alpha;
        ctx.shadowColor = '#4A90FF';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#4A90FF';
        ctx.beginPath();
        ctx.arc(s.x - s.eyeGap, eyeY, 2.5, 0, Math.PI * 2);
        ctx.arc(s.x + s.eyeGap, eyeY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(loop);
    })();
  }
})();
