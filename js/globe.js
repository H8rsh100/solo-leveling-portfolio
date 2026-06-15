// ─── 3D Globe — Three.js Tech Stack Orbiter ───
(function() {
  let scene, camera, renderer, globe, labels = [], raycaster, mouse;
  let globeGroup;
  const container = document.getElementById('globe-container');
  if (!container) return;

  const tooltip = document.createElement('div');
  tooltip.className = 'globe-tooltip';
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Wireframe sphere
    const sphereGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x4A90FF,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    globe = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globe);

    // Inner glow sphere
    const glowGeo = new THREE.SphereGeometry(1.75, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x9B59FF,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide
    });
    globeGroup.add(new THREE.Mesh(glowGeo, glowMat));

    // Latitude rings
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(1.82 + i * 0.15, 1.83 + i * 0.15, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x4A90FF,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (i - 1) * 0.5;
      globeGroup.add(ring);
    }

    // Tech stack labels
    createLabels();

    // Raycaster
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Events
    container.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    animate();
  }

  function createTextSprite(text, color) {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.font = 'bold 28px "Share Tech Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Glow
    ctx.shadowColor = color || '#4A90FF';
    ctx.shadowBlur = 12;
    ctx.fillStyle = color || '#4A90FF';
    ctx.fillText(text, size / 2, 32);
    // Second pass for brightness
    ctx.fillText(text, size / 2, 32);

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.2, 0.3, 1);
    return sprite;
  }

  function createLabels() {
    TECH_STACK.forEach((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / TECH_STACK.length);
      const theta = Math.sqrt(TECH_STACK.length * Math.PI) * phi;
      const radius = 2.6;

      const color = tech.rank === 'S' ? '#FFD700' : tech.rank === 'A' ? '#4A90FF' : '#9B59FF';
      const sprite = createTextSprite(tech.name, color);
      sprite.userData = {
        tech: tech,
        phi: phi,
        theta: theta + i * 0.4,
        radius: radius,
        baseScale: 1.2,
        orbitSpeed: 0.0003 + Math.random() * 0.0002,
        orbitOffset: i * ((Math.PI * 2) / TECH_STACK.length)
      };

      globeGroup.add(sprite);
      labels.push(sprite);
    });
  }

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(labels);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const tech = hit.userData.tech;
      tooltip.innerHTML = `
        <div class="tt-name">${tech.name}</div>
        <div class="tt-rank rank-${tech.rank.toLowerCase()}">${tech.rank} Rank</div>
        <div class="tt-bar-wrap">
          <div class="tt-bar" style="width:${tech.proficiency}%"></div>
        </div>
        <div class="tt-prof">${tech.proficiency}%</div>
      `;
      tooltip.style.display = 'block';
      tooltip.style.left = e.clientX + 15 + 'px';
      tooltip.style.top = e.clientY - 10 + 'px';
      hit.scale.set(1.6, 0.45, 1);
    } else {
      tooltip.style.display = 'none';
      labels.forEach(l => l.scale.set(l.userData.baseScale, 0.3, 1));
    }
  }

  function onResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    const t = performance.now();

    // Slow globe rotation
    globeGroup.rotation.y += 0.002;
    globeGroup.rotation.x = Math.sin(t * 0.0001) * 0.1;

    // Orbit labels
    labels.forEach(label => {
      const d = label.userData;
      const angle = t * d.orbitSpeed + d.orbitOffset;
      label.position.x = Math.sin(d.phi) * Math.cos(angle) * d.radius;
      label.position.y = Math.cos(d.phi) * d.radius * 0.7;
      label.position.z = Math.sin(d.phi) * Math.sin(angle) * d.radius;
    });

    renderer.render(scene, camera);
  }

  // Wait for fonts then init
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
  } else {
    window.addEventListener('load', init);
  }
})();
