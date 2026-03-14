/* ─────────────────────────────────────────
   script.js — Portfolio Gracella
   Animasi: loader, cursor, scroll reveal,
             nav scroll, counter, parallax,
             modal sertifikat, dark mode,
             back to top
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. PAGE LOADER ──────────────────────
  const loader = document.getElementById('loader');
  const chars  = loader.querySelectorAll('.loader-name span');

  chars.forEach((c, i) => {
    c.style.animationDelay = `${i * 0.05}s`;
  });

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1800);

  document.body.style.overflow = 'hidden';


  // ── 2. CUSTOM CURSOR ────────────────────
  const cursor   = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left   = e.clientX + 'px';
    cursor.style.top    = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
  });

  const hoverTargets = document.querySelectorAll(
    'a, button, .btn, .skill-tag, .stat, .social-btn, .project-card, .cert-card'
  );
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });


  // ── 3. NAV SCROLL EFFECT ────────────────
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });


  // ── 4. SCROLL REVEAL ────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  // ── 5. ANIMATED COUNTERS ────────────────
  function animateCounter(el, target, duration = 1200) {
    let start = 0;
    const step = target / (duration / 16);
    const tick = () => {
      start += step;
      if (start < target) {
        el.textContent = Math.floor(start) + (el.dataset.suffix || '');
        requestAnimationFrame(tick);
      } else {
        el.textContent = target + (el.dataset.suffix || '');
      }
    };
    tick();
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const val = parseInt(el.dataset.target);
        animateCounter(el, val);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


  // ── 6. PARALLAX ORBS ────────────────────
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('#hero');
    if (hero) hero.style.setProperty('--scroll-y', window.scrollY * 0.15 + 'px');
  });


  // ── 7. SMOOTH SECTION HIGHLIGHT ─────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) a.style.color = 'var(--accent)';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  // ── 8. MODAL SERTIFIKAT ────────────────
  const overlay     = document.getElementById('certModal');
  const modalClose  = document.getElementById('certModalClose');
  const modalImg    = document.getElementById('certModalImg');
  const modalYear   = document.getElementById('certModalYear');
  const modalTitle  = document.getElementById('certModalTitle');
  const modalIssuer = document.getElementById('certModalIssuer');
  const modalDesc   = document.getElementById('certModalDesc');

  function closeCertModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const img    = card.dataset.img;
      const title  = card.dataset.title;
      const issuer = card.dataset.issuer;
      const year   = card.dataset.year;
      const desc   = card.dataset.desc;

      modalImg.innerHTML = `<img src="${img}" alt="${title}" onerror="this.style.display='none'" />`;
      modalYear.textContent   = year;
      modalTitle.textContent  = title;
      modalIssuer.textContent = `🏛 ${issuer}`;
      modalDesc.textContent   = desc;

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose.addEventListener('click', closeCertModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCertModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
  });


  // ── 9. DARK MODE TOGGLE ────────────────
  const darkToggle = document.getElementById('darkToggle');
  const darkIcon   = darkToggle.querySelector('.dark-toggle-icon');

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    darkIcon.textContent = '☀️';
  }

  darkToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    darkIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDark);
  });


  // ── 10. BACK TO TOP ─────────────────────
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});