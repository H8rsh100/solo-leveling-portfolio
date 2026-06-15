// ─── Main.js — Content Builder & Interactions (Solo Leveling Enhanced) ───
function initMainContent() {
  buildHero();
  buildSkills();
  buildProjects();
  buildFooter();
  initScrollAnimations();
  initScanlines();
}

// ─── Hero Section — Status Window Style ───
function buildHero() {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div class="status-window">
      <div class="sw-corner tl"></div>
      <div class="sw-corner tr"></div>
      <div class="sw-corner bl"></div>
      <div class="sw-corner br"></div>

      <div class="hero-badge" id="hero-badge">
        <div class="badge-hex"></div>
        <span class="badge-rank">S</span>
      </div>

      <h1 class="hero-name glitch" data-text="${PROFILE.name}">${PROFILE.name}</h1>
      <p class="hero-handle">@${PROFILE.handle}</p>
      <p class="level-badge">Lv. 99 ━ National-Level Hunter</p>
      <p class="hero-role">${PROFILE.role}</p>

      <div class="vitals-row" id="vitals">
        <div class="vital-bar">
          <span class="vital-label hp">HP</span>
          <div class="vital-track"><div class="vital-fill hp" id="hp-bar" style="width:0%"></div></div>
          <span class="vital-value">9999 / 9999</span>
        </div>
        <div class="vital-bar">
          <span class="vital-label mp">MP</span>
          <div class="vital-track"><div class="vital-fill mp" id="mp-bar" style="width:0%"></div></div>
          <span class="vital-value">8500 / 8500</span>
        </div>
        <div class="vital-bar">
          <span class="vital-label exp">EXP</span>
          <div class="vital-track"><div class="vital-fill exp" id="exp-bar" style="width:0%"></div></div>
          <span class="vital-value">87,420 / 100,000</span>
        </div>
      </div>

      <div class="hero-stats">
        ${PROFILE.stats.map(s => `
          <div class="stat-item">
            <span class="stat-value">${s.value}</span>
            <span class="stat-label">${s.label}</span>
          </div>
        `).join('')}
      </div>

      <div class="hero-links">
        <a href="${PROFILE.links.github}" target="_blank" rel="noopener" class="sl-btn" id="github-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a href="${PROFILE.links.instagram}" target="_blank" rel="noopener" class="sl-btn sl-btn--accent" id="insta-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          Instagram
        </a>
      </div>

      <p class="arise-text">A R I S E</p>
    </div>
  `;
}

// ─── Skills Section — with Korean rune watermarks ───
function buildSkills() {
  const section = document.getElementById('skills');
  section.style.position = 'relative';
  const runes = ['力', '知', '速', '運', '魔'];
  let html = `
    <span class="section-rune" style="top:10%;left:5%;">力</span>
    <span class="section-rune" style="top:60%;right:5%;">魔</span>
    <div class="section-header">
      <div class="bracket">[</div>
      <h2>HUNTER STATS</h2>
      <div class="bracket">]</div>
    </div>
    <div class="skills-grid">
  `;

  let runeIdx = 0;
  for (const [category, skills] of Object.entries(SKILLS)) {
    const rune = runes[runeIdx % runes.length];
    runeIdx++;
    html += `
      <div class="skill-card reveal" id="skill-${category.replace(/[\s\/]/g, '-').toLowerCase()}">
        <div class="card-corner tl"></div>
        <div class="card-corner tr"></div>
        <div class="card-corner bl"></div>
        <div class="card-corner br"></div>
        <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:1.2rem;">
          <span style="font-size:1.4rem;color:rgba(74,144,255,0.3);">${rune}</span>
          <h3 class="skill-category" style="margin-bottom:0;">${category}</h3>
        </div>
        <div class="skill-list">
          ${skills.map(s => `
            <div class="skill-row">
              <span class="skill-name">${s.name}</span>
              <span class="skill-rank rank-${s.rank.toLowerCase()}">${s.rank}</span>
              <div class="skill-bar-wrap">
                <div class="skill-bar" data-level="${s.level}" style="width:0%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  html += '</div>';
  section.innerHTML = html;
}

// ─── Projects Section — Dungeon Gate Cards ───
function buildProjects() {
  const section = document.getElementById('projects');
  section.style.position = 'relative';
  let html = `
    <span class="section-rune" style="top:5%;right:8%;">門</span>
    <div class="section-header">
      <div class="bracket">[</div>
      <h2>DUNGEON CLEARS</h2>
      <div class="bracket">]</div>
    </div>
    <div class="projects-grid">
  `;

  PROJECTS.forEach((p, i) => {
    const gateType = p.rank === 'S' ? 'S-RANK GATE' : 'A-RANK GATE';
    const isS = p.rank === 'S';
    html += `
      <div class="project-card reveal ${isS ? 's-rank-card' : ''}" style="--delay: ${i * 0.1}s" id="project-${p.name.replace(/\s+/g, '-').toLowerCase()}">
        <div class="card-corner tl"></div>
        <div class="card-corner tr"></div>
        <div class="card-corner bl"></div>
        <div class="card-corner br"></div>
        <p class="dungeon-label">⬡ ${gateType} ━━ CLEARED</p>
        <div class="project-rank rank-${p.rank.toLowerCase()}">${p.rank}</div>
        <h3 class="project-name">${p.name}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <a href="${p.github}" target="_blank" rel="noopener" class="project-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    `;
  });

  html += '</div>';
  section.innerHTML = html;
}

// ─── Footer ───
function buildFooter() {
  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <div class="footer-rune">始</div>
    <p class="footer-text">「 System Notice: This hunter's data is classified 」</p>
    <p class="footer-copy">&copy; 2025 ${PROFILE.handle} — All Dungeons Cleared</p>
  `;
}

// ─── Scroll Reveal + Bar Animations ───
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        const bars = entry.target.querySelectorAll('.skill-bar');
        bars.forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.level + '%';
          }, i * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Hero entrance
  gsap.from('.status-window', { opacity: 0, scale: 0.9, duration: 1, ease: 'power2.out', delay: 0.1 });
  gsap.from('#hero-badge', { scale: 0, rotation: 720, duration: 1.2, ease: 'back.out(1.7)', delay: 0.3 });
  gsap.from('.hero-name', { y: 60, opacity: 0, duration: 0.8, delay: 0.6 });
  gsap.from('.hero-handle', { y: 30, opacity: 0, duration: 0.6, delay: 0.8 });
  gsap.from('.level-badge', { y: 20, opacity: 0, duration: 0.5, delay: 0.9 });
  gsap.from('.hero-role', { y: 30, opacity: 0, duration: 0.6, delay: 1.0 });

  // Animate HP/MP/EXP bars
  setTimeout(() => {
    const hp = document.getElementById('hp-bar');
    const mp = document.getElementById('mp-bar');
    const exp = document.getElementById('exp-bar');
    if (hp) hp.style.width = '100%';
    if (mp) mp.style.width = '100%';
    if (exp) exp.style.width = '87.4%';
  }, 1200);

  gsap.from('.stat-item', { y: 40, opacity: 0, duration: 0.5, stagger: 0.15, delay: 1.3 });
  gsap.from('.hero-links a', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, delay: 1.6 });
  gsap.from('.arise-text', { opacity: 0, y: 20, duration: 0.8, delay: 2.0 });
}

// ─── Scanline overlay ───
function initScanlines() {
  const sl = document.createElement('div');
  sl.className = 'scanlines';
  document.body.appendChild(sl);
}
