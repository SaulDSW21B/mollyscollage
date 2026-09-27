/* ============================================
   main.js — Funciones compartidas por todas las páginas:
   menú móvil, modo oscuro, animaciones al hacer scroll,
   botón "volver arriba" y datos del pie de página.
   ============================================ */

/* -------- Menú hamburguesa -------- */
function initMobileNav() {
  const toggle = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al elegir un enlace (útil en móvil)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* -------- Modo oscuro con localStorage -------- */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('mascotas-theme');

  if (saved === 'dark') {
    root.setAttribute('data-theme', 'dark');
  }
  updateThemeIcon();

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('mascotas-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('mascotas-theme', 'dark');
    }
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    toggle.textContent = isDark ? '☀️' : '🌙';
    toggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
}

/* -------- Animaciones al hacer scroll (IntersectionObserver) -------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* -------- Botón "volver arriba" -------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 420);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------- Fecha actual en el pie de página -------- */
function initFooterDate() {
  const el = document.querySelector('.footer-date');
  if (!el) return;
  const hoy = new Date();
  const formato = hoy.toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  el.textContent = `Hoy es ${formato}`;
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initThemeToggle();
  initScrollReveal();
  initBackToTop();
  initFooterDate();
});
