/**
 * MUBEEN M. — GAME DEVELOPER / TECHNICAL ARTIST
 * Interactive Script
 * - Modal / Card Panel Switcher
 * - Hash deep-linking
 * - Keyboard ESC dismissal
 */

document.addEventListener('DOMContentLoaded', () => {

  const hubButtons = document.querySelectorAll('.hub-btn');
  const panelBackdrop = document.getElementById('panelBackdrop');
  const modalCards = document.querySelectorAll('.modal-card');
  const closeButtons = document.querySelectorAll('[data-close]');
  const contactScreenView = document.getElementById('contactScreenView');
  const contactBackBtn = document.getElementById('contactBackBtn');
  const aboutScreenView = document.getElementById('aboutScreenView');
  const aboutBackBtn = document.getElementById('aboutBackBtn');
  const aboutToContactBtn = document.getElementById('aboutToContactBtn');
  let activePanel = null;
  let isContactScreenOpen = false;
  let isAboutScreenOpen = false;

  function openContactScreen() {
    // If any modal or about screen is open, close it
    if (activePanel) closePanel();
    if (isAboutScreenOpen) closeAboutScreen();

    if (contactScreenView) {
      contactScreenView.hidden = false;
      contactScreenView.scrollTop = 0;
      void contactScreenView.offsetWidth; // Reflow
    }

    document.body.classList.add('contact-screen-active');
    isContactScreenOpen = true;
    window.location.hash = 'contact';
  }

  function closeContactScreen() {
    document.body.classList.remove('contact-screen-active');
    isContactScreenOpen = false;

    if (window.location.hash === '#contact') {
      history.replaceState(null, null, ' ');
    }

    setTimeout(() => {
      if (!isContactScreenOpen && contactScreenView) {
        contactScreenView.hidden = true;
      }
    }, 380);
  }

  function openAboutScreen() {
    // If any modal or contact screen is open, close it
    if (activePanel) closePanel();
    if (isContactScreenOpen) closeContactScreen();

    if (aboutScreenView) {
      aboutScreenView.hidden = false;
      aboutScreenView.scrollTop = 0;
      void aboutScreenView.offsetWidth; // Reflow
    }

    document.body.classList.add('about-screen-active');
    isAboutScreenOpen = true;
    window.location.hash = 'about';
  }

  function closeAboutScreen() {
    document.body.classList.remove('about-screen-active');
    isAboutScreenOpen = false;

    if (window.location.hash === '#about') {
      history.replaceState(null, null, ' ');
    }

    setTimeout(() => {
      if (!isAboutScreenOpen && aboutScreenView) {
        aboutScreenView.hidden = true;
      }
    }, 380);
  }

  function openPanel(panelId) {
    if (panelId === 'contact') {
      openContactScreen();
      return;
    }
    if (panelId === 'about') {
      openAboutScreen();
      return;
    }

    if (isContactScreenOpen) closeContactScreen();
    if (isAboutScreenOpen) closeAboutScreen();

    const targetCard = document.getElementById(`panel-${panelId}`);
    if (!targetCard) return;

    // Close any open card
    modalCards.forEach(card => {
      card.style.display = 'none';
      card.classList.remove('is-visible');
    });

    // Activate backdrop & stage
    document.body.classList.add('panel-active');

    // Display and animate target card
    targetCard.style.display = 'flex';
    void targetCard.offsetWidth; // Force reflow
    targetCard.classList.add('is-visible');

    activePanel = panelId;
    window.location.hash = panelId;
  }

  function closePanel() {
    modalCards.forEach(card => {
      card.classList.remove('is-visible');
    });

    document.body.classList.remove('panel-active');

    setTimeout(() => {
      modalCards.forEach(card => {
        card.style.display = 'none';
      });
      activePanel = null;
      if (window.location.hash && window.location.hash !== '#contact' && window.location.hash !== '#about') {
        history.replaceState(null, null, ' ');
      }
    }, 250);
  }

  // Bind Hub Nav Buttons
  hubButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panelName = btn.getAttribute('data-panel');
      if (panelName === 'contact') {
        openContactScreen();
      } else if (panelName === 'about') {
        openAboutScreen();
      } else if (panelName) {
        openPanel(panelName);
      }
    });
  });

  // Bind Close Buttons (X)
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closePanel);
  });

  // Bind Screen Back Buttons
  if (contactBackBtn) {
    contactBackBtn.addEventListener('click', closeContactScreen);
  }
  if (aboutBackBtn) {
    aboutBackBtn.addEventListener('click', closeAboutScreen);
  }

  // Bind cross-link button in About screen to open Contact screen directly
  if (aboutToContactBtn) {
    aboutToContactBtn.addEventListener('click', openContactScreen);
  }

  // Backdrop click closes modal
  if (panelBackdrop) {
    panelBackdrop.addEventListener('click', closePanel);
  }

  // Escape key closes modal or screens
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isContactScreenOpen) {
        closeContactScreen();
      } else if (isAboutScreenOpen) {
        closeAboutScreen();
      } else if (activePanel) {
        closePanel();
      }
    }
  });

  // Check URL hash on initial load (e.g. #work, #techart, #about, #contact)
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash === 'contact') {
    openContactScreen();
  } else if (initialHash === 'about') {
    openAboutScreen();
  } else if (initialHash && ['work', 'techart'].includes(initialHash)) {
    openPanel(initialHash);
  }

  // ---------------------------------------------------------------------------
  // CUSTOM CURSOR CONTROLLER (Smooth lerp + hover expansion)
  // ---------------------------------------------------------------------------
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover state expansion over clickable elements
    const hoverTargets = document.querySelectorAll('a, button, .hub-btn, .quick-icon-btn, .link-btn, .interactive-wave-canvas, input, textarea');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ---------------------------------------------------------------------------
  // UNIFIED INTERACTIVE SPRING PHYSICS & WAVE CANVAS
  // ---------------------------------------------------------------------------
  const waveCanvas = document.getElementById('interactiveWaveCanvas');
  if (waveCanvas) {
    const ctx = waveCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const numPoints = 64;
    let points = [];
    let mouse = { x: -1000, y: -1000 };

    function initPoints() {
      points = [];
      const step = width / (numPoints - 1);
      const midY = height * 0.5;
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: i * step,
          y: midY,
          targetY: midY,
          vy: 0
        });
      }
    }

    function resize() {
      const rect = waveCanvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      waveCanvas.width = width * dpr;
      waveCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initPoints();
    }

    resize();
    window.addEventListener('resize', resize);

    // Mouse Interactions
    waveCanvas.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    waveCanvas.addEventListener('mousemove', (e) => {
      const rect = waveCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // Displace nearby points towards mouse Y (elastic string pluck)
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const dist = Math.abs(pt.x - mouse.x);
        if (dist < 55) {
          const force = (1 - dist / 55) * 0.35;
          pt.vy += (mouse.y - pt.y) * force * 0.25;
        }
      }
    });

    waveCanvas.addEventListener('click', (e) => {
      const rect = waveCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      let closest = 0;
      let minDist = Infinity;
      for (let i = 0; i < points.length; i++) {
        const d = Math.abs(points[i].x - clickX);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      }
      for (let i = -5; i <= 5; i++) {
        const idx = closest + i;
        if (idx >= 0 && idx < points.length) {
          points[idx].vy += (Math.random() > 0.5 ? -1 : 1) * (18 - Math.abs(i) * 2.8);
        }
      }
    });

    // Touch support for mobile devices
    waveCanvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = waveCanvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          const dist = Math.abs(pt.x - touchX);
          if (dist < 55) {
            pt.vy += (touchY - pt.y) * 0.16;
          }
        }
      }
    }, { passive: true });

    let time = 0;
    const tension = 0.026;
    const damping = 0.042;
    const spread = 0.25;

    function animate() {
      time += 0.038;
      ctx.clearRect(0, 0, width, height);

      const midY = height * 0.5;

      // Update spring physics for each point
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        // Ambient organic harmonic wave
        const ambient = Math.sin(time + i * 0.18) * 4.5 + Math.cos(time * 0.65 + i * 0.09) * 2.5;
        pt.targetY = midY + ambient;

        const force = -tension * (pt.y - pt.targetY) - damping * pt.vy;
        pt.vy += force;
        pt.y += pt.vy;
      }

      // Propagate wave along adjacent points
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < points.length; i++) {
          if (i > 0) {
            points[i - 1].vy += spread * (points[i].y - points[i - 1].y);
          }
          if (i < points.length - 1) {
            points[i + 1].vy += spread * (points[i].y - points[i + 1].y);
          }
        }
      }

      // Draw subtle neon glow under-wave gradient fill
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(199, 255, 61, 0.12)');
      grad.addColorStop(1, 'rgba(199, 255, 61, 0)');

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const cx = (points[i].x + points[i + 1].x) * 0.5;
        const cy = (points[i].y + points[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cx, cy);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw glowing electric lime wave stroke line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length - 1; i++) {
        const cx = (points[i].x + points[i + 1].x) * 0.5;
        const cy = (points[i].y + points[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cx, cy);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.strokeStyle = '#C7FF3D';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(199, 255, 61, 0.65)';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw tiny crest micro-dots
      ctx.fillStyle = '#C7FF3D';
      for (let i = 2; i < points.length - 2; i += 4) {
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ---------------------------------------------------------------------------
  // CONTACT FORM SUBMISSION & RESET
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || '';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.style.color = '#ff6b6b';
        return;
      }

      // Encode mailto URL
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:mubeenm2005@gmail.com?subject=${subject}&body=${body}`;

      // Open mail client
      window.location.href = mailtoUrl;

      // Provide visual feedback
      formStatus.textContent = '✓ Opening email client to transmit message...';
      formStatus.style.color = 'var(--accent-lime)';

      setTimeout(() => {
        formStatus.textContent = 'Direct contact: mubeenm2005@gmail.com';
      }, 4000);
    });

    const resetBtn = document.getElementById('contactResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        formStatus.textContent = '';
      });
    }
  }

  // ---------------------------------------------------------------------------
  // CINEMATIC OPENING INTRO / BOOT DISMISSAL
  // ---------------------------------------------------------------------------
  const introCurtain = document.getElementById('introCurtain');
  const bootLaserLine = document.getElementById('bootLaserLine');

  // Trigger curtain slide-up after brief system initialize preview
  setTimeout(() => {
    if (introCurtain) {
      introCurtain.classList.add('curtain-vanish');
    }
  }, 450);

  // Mark intro complete so normal hover states are 100% unrestricted
  setTimeout(() => {
    document.body.classList.add('intro-complete');
    if (introCurtain && introCurtain.parentNode) {
      introCurtain.style.display = 'none';
    }
    if (bootLaserLine && bootLaserLine.parentNode) {
      bootLaserLine.style.display = 'none';
    }
  }, 1400);

});