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
    overlay.innerHTML = '<canvas id="arise-easter-canvas"></canvas><div class="easter-word">ARISE</div><div class="easter-sub">「 Shadow Extraction Complete 」</div>';
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
    const embers = [];
    const soldiers = [];
    const count = Math.floor(W / 60);
    for (let i = 0; i < count; i++) {
      soldiers.push({
        x: (W / (count + 1)) * (i + 1) + (Math.random() - 0.5) * 30,
        targetY: H * 0.42 + Math.random() * H * 0.3,
        y: H + 60,
        delay: Math.random() * 40,
        frame: 0,
        height: 60 + Math.random() * 70,
        width: 13 + Math.random() * 8,
        eyeGap: 5 + Math.random() * 3,
        horns: Math.random() < 0.3,
        pillar: Math.random() < 0.45,
        purple: Math.random() < 0.25,
        phase: Math.random() * Math.PI * 2
      });
    }

    let alive = true;
    setTimeout(() => { alive = false; }, 3000);

    (function loop() {
      if (!alive || !canvas.isConnected) return;
      const t = performance.now() / 1000;
      ctx.clearRect(0, 0, W, H);
      if (Math.random() > 0.3) {
        smokes.push({
          x: Math.random() * W, y: H + 20,
          size: Math.random() * 40 + 20,
          vy: -(Math.random() * 1.5 + 0.5),
          life: 1
        });
      }
      for (let i = 0; i < 2; i++) {
        embers.push({
          x: Math.random() * W, y: H + 5,
          vy: -(0.6 + Math.random() * 1.4),
          sway: Math.random() * Math.PI * 2,
          size: 0.8 + Math.random() * 1.6,
          life: 1,
          col: Math.random() < 0.12 ? '255,215,0' : (Math.random() < 0.5 ? '74,144,255' : '155,89,255')
        });
      }
      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.y += p.vy; p.sway += 0.05; p.x += Math.sin(p.sway) * 0.4; p.life -= 0.004;
        if (p.life <= 0 || p.y < -10) { embers.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.life * (0.4 + 0.6 * Math.abs(Math.sin(p.sway * 2)));
        ctx.shadowColor = 'rgba(' + p.col + ',0.9)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = 'rgba(' + p.col + ',1)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (embers.length > 220) embers.splice(0, embers.length - 220);
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
        if (s.y > s.targetY) s.y -= Math.max(0.35, (s.y - s.targetY) * 0.035);
        const rise = Math.min(1, (s.frame - s.delay) / 40);
        const col = s.purple ? '155,89,255' : '74,144,255';
        const top = s.y - s.height, w = s.width;

        ctx.save();
        ctx.globalAlpha = rise;
        if (s.pillar) {
          const pg = ctx.createLinearGradient(0, 0, 0, s.y);
          pg.addColorStop(0, 'rgba(' + col + ',0)');
          pg.addColorStop(1, 'rgba(' + col + ',0.20)');
          ctx.fillStyle = pg;
          ctx.fillRect(s.x - 3, 0, 6, s.y);
        }
        const bg = ctx.createLinearGradient(s.x, top, s.x, s.y + 20);
        bg.addColorStop(0, 'rgba(4, 2, 12, 0.1)');
        bg.addColorStop(0.4, 'rgba(16, 8, 34, 0.75)');
        bg.addColorStop(1, 'rgba(6, 3, 14, 0.9)');
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.moveTo(s.x, top - 8);
        ctx.bezierCurveTo(s.x + w, top + 6, s.x + w * 0.9, top + s.height * 0.5, s.x + w * 0.7, s.y + 18);
        ctx.lineTo(s.x - w * 0.7, s.y + 18);
        ctx.bezierCurveTo(s.x - w * 0.9, top + s.height * 0.5, s.x - w, top + 6, s.x, top - 8);
        ctx.fill();
        ctx.strokeStyle = 'rgba(' + col + ',0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
        if (s.horns) {
          ctx.fillStyle = 'rgba(8, 4, 18, 0.95)';
          ctx.beginPath();
          ctx.moveTo(s.x - 6, top + 4); ctx.lineTo(s.x - 13, top - 12); ctx.lineTo(s.x - 2, top - 1);
          ctx.moveTo(s.x + 6, top + 4); ctx.lineTo(s.x + 13, top - 12); ctx.lineTo(s.x + 2, top - 1);
          ctx.fill();
        }
        const flick = 0.72 + 0.28 * Math.sin(t * 6 + s.phase);
        const ey = top + s.height * 0.28;
        ctx.globalAlpha = rise * flick;
        ctx.shadowColor = 'rgb(' + col + ')';
        ctx.shadowBlur = 14;
        ctx.fillStyle = 'rgb(' + col + ')';
        ctx.beginPath();
        ctx.ellipse(s.x - s.eyeGap, ey, 3, 2.2, 0, 0, Math.PI * 2);
        ctx.ellipse(s.x + s.eyeGap, ey, 3, 2.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.arc(s.x - s.eyeGap, ey, 0.9, 0, Math.PI * 2);
        ctx.arc(s.x + s.eyeGap, ey, 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(loop);
    })();
  }
})();
