# Solo Leveling Portfolio ⚔️

> A visceral, anime-inspired developer portfolio built with the aesthetic of Solo Leveling's System UI.

![Status](https://img.shields.io/badge/Status-S--Rank-gold?style=flat-square)
![Stack](https://img.shields.io/badge/Stack-Vanilla_JS%20%7C%20Three.js%20%7C%20GSAP-blue?style=flat-square)

## ✨ Features

### 🌀 Dungeon Gate Intro
Full-screen canvas animation with plasma rift cracks, status messages ("Class S Developer detected"), Korean rune (始) shatter effect with particle burst.

### 📊 Status Window
Holographic hero card inspired by Solo Leveling's iconic System UI — hexagonal S-Rank badge, HP/MP/EXP bars, and hunter stats.

### ⚔️ ARISE — Shadow Army Summoning
Scroll-triggered cinematic section: shadow smoke rises from the ground, shadow soldier silhouettes emerge with glowing blue eyes, and "ARISE" slams onto screen with energy pulse and screen shake.

### 🌐 Skill Constellation
Three.js 3D globe with orbiting tech stack labels. Interactive raycasting tooltips show proficiency levels.

### 👻 Shadow Monarch Cursor Trail
Persistent blue/purple shadow particles follow your mouse cursor — like Sung Jin-Woo's shadow energy.

### 🔔 System Notifications
Scroll-triggered toast notifications that mimic the System's alerts from the anime.

### 🏰 Dungeon Clear Cards
Project cards styled as dungeon gate clearance reports with S-Rank / A-Rank difficulty badges.

### 🎨 Aesthetic Details
- Floating mana particles across the entire page
- Korean rune watermarks on sections
- Rift crack section dividers
- 3D card tilt on hover
- Mouse proximity glow effect
- Scanline overlay & noise texture
- Glitch effect on hunter name

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Core | HTML5, CSS3, Vanilla JavaScript |
| 3D Engine | Three.js r128 |
| Animation | GSAP 3.12.5 |
| Typography | Google Fonts (Rajdhani, Share Tech Mono) |
| Deployment | GitHub Pages |

## 📁 File Structure

```
solo-leveling-portfolio/
├── index.html          # Root HTML with CDN deps
├── css/
│   ├── style.css       # Core design system
│   └── effects.css     # Enhanced Solo Leveling UI effects
├── js/
│   ├── gate.js         # Dungeon gate intro animation
│   ├── globe.js        # Three.js 3D orbiting globe
│   ├── effects.js      # Mana particles, cursor trail, ARISE, toasts
│   ├── data.js         # Skills, projects, profile data
│   └── main.js         # Content builders & scroll animations
└── README.md
```

## 🚀 Getting Started

```bash
# Clone
git clone https://github.com/H8rsh100/solo-leveling-portfolio.git

# Open locally (no build step needed)
# Just open index.html in a browser, or use Live Server
```

## 📜 License

MIT — Built by [@H8rsh100](https://github.com/H8rsh100)

---

*「 System Notice: This hunter's data is classified 」*
