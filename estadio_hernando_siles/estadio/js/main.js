/* ============================================================
   ESTADIO HERNANDO SILES — JavaScript Compartido
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Menú móvil ----
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ---- Marcar enlace activo ----
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ---- Scroll reveal con IntersectionObserver ----
  const revealEls = document.querySelectorAll(
    '.stat-card, .timeline-item, .match-card, .proceso-card'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger delay basado en posición
        const siblings = [...e.target.parentElement.children];
        const idx = siblings.indexOf(e.target);
        setTimeout(() => e.target.classList.add('visible'), idx * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---- Hero background zoom ----
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  // ---- Progress bars (modelo 3D) ----
  const bars = document.querySelectorAll('.progress-bar-fill');
  if (bars.length) {
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = e.target.dataset.width;
          e.target.style.width = target + '%';
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    bars.forEach(b => barObs.observe(b));
  }

  // ---- Counter animation para stats ----
  const statVals = document.querySelectorAll('.stat-value[data-count]');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const end = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const dec = el.dataset.dec || 0;
        const dur = 1800;
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const prog = Math.min((ts - start) / dur, 1);
          const val = prog * end;
          el.textContent = prefix + val.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
          if (prog < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statVals.forEach(v => countObs.observe(v));

  // ---- Smooth scroll para CTA ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Nav shrink on scroll ----
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 60
        ? '0 4px 30px rgba(0,0,0,0.6)'
        : '';
    });
  }
});
