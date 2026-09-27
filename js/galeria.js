/* ============================================
   galeria.js — Datos de la galería, filtros y Lightbox.

   👉 PARA AGREGAR FOTOGRAFÍAS:
   Coloca el archivo dentro de img/galeria/ y agrega un
   nuevo objeto al array "galeria" con su ruta y categoría.
   Las categorías deben coincidir con los valores usados
   en los botones de filtro (ver galeria.html).
   ============================================ */

// ⚠️ RUTAS DE EJEMPLO — coloca tus fotos en img/galeria/ y reemplaza aquí
const galeria = [
  { imagen: 'img/galeria/foto1.jpg', categoria: 'mascota1', tamano: 'big' },
  { imagen: 'img/galeria/foto2.jpg', categoria: 'mascota2', tamano: 'tall' },
  { imagen: 'img/galeria/foto3.jpg', categoria: 'momentos', tamano: '' },
  { imagen: 'img/galeria/foto4.jpg', categoria: 'mascota1', tamano: 'wide' },
  { imagen: 'img/galeria/foto5.jpg', categoria: 'momentos', tamano: '' },
  { imagen: 'img/galeria/foto6.jpg', categoria: 'mascota2', tamano: '' },
  { imagen: 'img/galeria/foto7.jpg', categoria: 'mascota1', tamano: 'tall' },
  { imagen: 'img/galeria/foto8.jpg', categoria: 'momentos', tamano: 'wide' },
  { imagen: 'img/galeria/foto9.jpg', categoria: 'mascota2', tamano: '' },
  { imagen: 'img/galeria/foto10.jpg', categoria: 'momentos', tamano: '' },
];

let fotosFiltradas = [...galeria];
let indiceActual = 0;

function crearBotonGaleria(foto, index) {
  const btn = document.createElement('button');
  btn.className = `collage-item reveal ${foto.tamano ? 'size-' + foto.tamano : ''}`;
  btn.dataset.categoria = foto.categoria;
  btn.setAttribute('aria-label', `Ver fotografía ${index + 1} en tamaño completo`);
  btn.innerHTML = `<img src="${foto.imagen}" alt="Fotografía ${index + 1} de la galería" loading="lazy">`;
  btn.addEventListener('click', () => abrirLightbox(index));
  return btn;
}

function renderGaleria(lista = galeria) {
  const grid = document.getElementById('galeria-grid');
  if (!grid) return;
  grid.innerHTML = '';
  lista.forEach((foto, i) => grid.appendChild(crearBotonGaleria(foto, i)));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    grid.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    grid.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
}

/* -------- Filtros -------- */
function initFiltros() {
  const botones = document.querySelectorAll('.filter-btn');
  botones.forEach((btn) => {
    btn.addEventListener('click', () => {
      botones.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const categoria = btn.dataset.filter;
      fotosFiltradas = categoria === 'todas'
        ? [...galeria]
        : galeria.filter((f) => f.categoria === categoria);

      renderGaleria(fotosFiltradas);
    });
  });
}

/* -------- Lightbox -------- */
function abrirLightbox(index) {
  indiceActual = index;
  const lightbox = document.getElementById('lightbox');
  actualizarLightbox();
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightbox-close').focus();
}

function cerrarLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

function actualizarLightbox() {
  const img = document.getElementById('lightbox-img');
  const contador = document.getElementById('lightbox-counter');
  const foto = fotosFiltradas[indiceActual];
  img.src = foto.imagen;
  img.alt = `Fotografía ${indiceActual + 1} de ${fotosFiltradas.length}`;
  contador.textContent = `${indiceActual + 1} / ${fotosFiltradas.length}`;
}

function siguienteFoto() {
  indiceActual = (indiceActual + 1) % fotosFiltradas.length;
  actualizarLightbox();
}

function anteriorFoto() {
  indiceActual = (indiceActual - 1 + fotosFiltradas.length) % fotosFiltradas.length;
  actualizarLightbox();
}

function initLightboxControles() {
  document.getElementById('lightbox-close').addEventListener('click', cerrarLightbox);
  document.getElementById('lightbox-next').addEventListener('click', siguienteFoto);
  document.getElementById('lightbox-prev').addEventListener('click', anteriorFoto);

  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') cerrarLightbox();
  });

  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') cerrarLightbox();
    if (e.key === 'ArrowRight') siguienteFoto();
    if (e.key === 'ArrowLeft') anteriorFoto();
  });

  // Soporte táctil (swipe) para móvil
  let touchStartX = 0;
  const contenido = document.querySelector('.lightbox-content');
  contenido.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  contenido.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? anteriorFoto() : siguienteFoto();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderGaleria();
  initFiltros();
  initLightboxControles();
});
