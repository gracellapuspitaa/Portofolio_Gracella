/* ─────────────────────────────────────────
   script.js — Portfolio Gracella
   Animasi: loader, cursor, scroll reveal,
             nav scroll, counter, parallax
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. PAGE LOADER ──────────────────────
  const loader = document.getElementById('loader');
  const chars  = loader.querySelectorAll('.loader-name span');

  // Stagger tiap huruf muncul
  chars.forEach((c, i) => {
    c.style.animationDelay = `${i * 0.05}s`;
  });

  // Sembunyikan loader setelah 1.8 detik
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }, 1800);

  // Sembunyikan scroll saat loader aktif
  document.body.style.overflow = 'hidden';


  // ── 2. CUSTOM CURSOR ────────────────────
  const cursor   = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    // follower mengikuti dengan sedikit lag via CSS transition
    follower.style.left = mouseX + 'px';
    follower.style.top  = mouseY + 'px';
  });

  // Efek hover pada elemen interaktif
  const hoverTargets = document.querySelectorAll(
    'a, button, .btn, .btn-send, .skill-tag, .stat, .social-btn, .project-card, .cert-card'
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
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
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
        const el = entry.target;
        const val = parseInt(el.dataset.target);
        animateCounter(el, val);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


  // ── 6. PARALLAX ORBS ────────────────────
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.querySelector('#hero');
    if (!hero) return;
    hero.style.setProperty('--scroll-y', scrollY * 0.15 + 'px');
  });


  // ── 7. PROJECT CARD TILT ────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateY(-10px) scale(1.01) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ── 8. SMOOTH SECTION HIGHLIGHT ─────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  // ── 9. FORM INPUT RIPPLE ────────────────
  document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.querySelector('.form-label').style.letterSpacing = '0.15em';
    });
    input.addEventListener('blur', function() {
      this.parentElement.querySelector('.form-label').style.letterSpacing = '';
    });
  });

});