/* ============================================
   recuerdos.js — Datos de la línea de tiempo de recuerdos.

   👉 PARA AGREGAR UN RECUERDO:
   Agrega un objeto al array "recuerdos" con año, fecha,
   título, descripción y (opcionalmente) una foto. La
   página los agrupa y ordena automáticamente por año.
   ============================================ */

// ⚠️ DATOS DE EJEMPLO — reemplaza con tus propios recuerdos
const recuerdos = [
  {
    anio: 2024,
    fecha: '15 de marzo, 2024',
    titulo: 'El día que llegó a casa',
    descripcion: 'Escribe aquí la historia de este recuerdo especial.',
    imagen: 'img/mascota1/foto1.jpg',
  },
  {
    anio: 2024,
    fecha: '2 de agosto, 2024',
    titulo: 'Su primera foto oficial',
    descripcion: 'Un pequeño momento que quedó guardado para siempre.',
    imagen: 'img/mascota2/foto1.jpg',
  },
  {
    anio: 2025,
    fecha: '20 de enero, 2025',
    titulo: 'Un día especial',
    descripcion: 'Describe qué pasó ese día y por qué fue memorable.',
    imagen: 'img/galeria/foto3.jpg',
  },
  {
    anio: 2026,
    fecha: '10 de junio, 2026',
    titulo: 'Nuestro momento favorito',
    descripcion: 'El recuerdo que más atesoras hasta ahora.',
    imagen: 'img/galeria/foto8.jpg',
  },
];

function agruparPorAnio(lista) {
  const grupos = {};
  lista.forEach((r) => {
    if (!grupos[r.anio]) grupos[r.anio] = [];
    grupos[r.anio].push(r);
  });
  return grupos;
}

function renderTimeline() {
  const contenedor = document.getElementById('timeline');
  if (!contenedor) return;

  const ordenados = [...recuerdos].sort((a, b) => a.anio - b.anio);
  const grupos = agruparPorAnio(ordenados);

  Object.keys(grupos)
    .sort()
    .forEach((anio) => {
      const tituloAnio = document.createElement('h2');
      tituloAnio.className = 'timeline-year reveal';
      tituloAnio.textContent = anio;
      contenedor.appendChild(tituloAnio);

      grupos[anio].forEach((recuerdo) => {
        const item = document.createElement('article');
        item.className = 'memory-item reveal';
        item.innerHTML = `
          <div class="memory-photo">
            <img src="${recuerdo.imagen}" alt="Foto del recuerdo: ${recuerdo.titulo}" loading="lazy">
          </div>
          <div>
            <p class="memory-date">${recuerdo.fecha}</p>
            <h3 class="memory-title">${recuerdo.titulo}</h3>
            <p class="memory-desc">${recuerdo.descripcion}</p>
          </div>
        `;
        contenedor.appendChild(item);
      });
    });

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
    contenedor.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    contenedor.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
}

document.addEventListener('DOMContentLoaded', renderTimeline);
