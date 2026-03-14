/* ─────────────────────────────────────────
   script.js — Portfolio Gracella
   Animasi: loader, cursor, scroll reveal,
             nav scroll, counter, parallax,
             project card tilt, modal sertifikat
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

  document.addEventListener('mousemove', (e) => {
    cursor.style.left   = e.clientX + 'px';
    cursor.style.top    = e.clientY + 'px';
    follower.style.left = e.clientX + 'px';
    follower.style.top  = e.clientY + 'px';
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






  // ── 8. SMOOTH SECTION HIGHLIGHT ─────────
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


  // ── 9. FORM INPUT RIPPLE ────────────────
  document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', function() {
      const label = this.parentElement.querySelector('.form-label');
      if (label) label.style.letterSpacing = '0.15em';
    });
    input.addEventListener('blur', function() {
      const label = this.parentElement.querySelector('.form-label');
      if (label) label.style.letterSpacing = '';
    });
  });


  // ── 10. MODAL SERTIFIKAT ────────────────
  const overlay     = document.getElementById('certModal');
  const modalClose  = document.getElementById('certModalClose');
  const modalImg    = document.getElementById('certModalImg');
  const modalYear   = document.getElementById('certModalYear');
  const modalTitle  = document.getElementById('certModalTitle');
  const modalIssuer = document.getElementById('certModalIssuer');
  const modalDesc   = document.getElementById('certModalDesc');

  // Buka modal saat card diklik
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const img    = card.dataset.img;
      const title  = card.dataset.title;
      const issuer = card.dataset.issuer;
      const year   = card.dataset.year;
      const desc   = card.dataset.desc;
      const link   = card.dataset.link;

      // Isi gambar modal — fallback emoji jika gambar belum ada
      modalImg.innerHTML = `<img src="${img}" alt="${title}"
        onerror="this.style.display='none'" />`;

      // Isi teks modal
      modalYear.textContent   = year;
      modalTitle.textContent  = title;
      modalIssuer.textContent = `🏛 ${issuer}`;
      modalDesc.textContent   = desc;

      // Tampilkan modal
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Tutup modal — tombol ✕
  modalClose.addEventListener('click', closeCertModal);

  // Tutup modal — klik area gelap di luar
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCertModal();
  });

  // Tutup modal — tekan Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
  });

  function closeCertModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

});