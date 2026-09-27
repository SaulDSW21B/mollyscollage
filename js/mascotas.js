/* ============================================
   mascotas.js — Datos de las mascotas y renderizado
   de las tarjetas en mascotas.html.

   👉 PARA AGREGAR O EDITAR UNA MASCOTA:
   Modifica el array "mascotas" de más abajo. Cada objeto
   es una mascota. Coloca sus fotos en una carpeta nueva
   dentro de img/ (por ejemplo img/mascota4/) y actualiza
   la propiedad "imagen".
   ============================================ */

// ⚠️ DATOS DE EJEMPLO — reemplaza con la información real de tus mascotas
const mascotas = [
  {
    nombre: 'Nombre de mascota 1',
    especie: 'Perro',
    edad: '3 años',
    imagen: 'img/mascota1/foto1.jpg', // reemplazar por tu foto
    descripcion: 'Escribe aquí una pequeña descripción de tu mascota: cómo llegó a la familia, alguna anécdota o lo que la hace especial.',
    personalidad: '🐾 Juguetón, cariñoso y un poco travieso',
    gustos: ['Las siestas al sol', 'Perseguir la pelota', 'Los paseos largos'],
  },
  {
    nombre: 'Nombre de mascota 2',
    especie: 'Gato',
    edad: '2 años',
    imagen: 'img/mascota2/foto1.jpg', // reemplazar por tu foto
    descripcion: 'Escribe aquí una pequeña descripción de tu mascota. Puedes contar su comida favorita, su lugar preferido de la casa o su rutina diaria.',
    personalidad: '🐾 Curiosa, independiente y muy observadora',
    gustos: ['Las cajas de cartón', 'Dormir en la ventana', 'Los mimos por la noche'],
  },
  {
    nombre: 'Nombre de mascota 3',
    especie: 'Otra especie',
    edad: 'Edad',
    imagen: 'img/mascota3/foto1.jpg', // reemplazar por tu foto
    descripcion: 'Este es un espacio extra por si tienes una tercera mascota. Si no la necesitas, simplemente elimina este objeto del array.',
    personalidad: '🐾 Describe aquí su personalidad',
    gustos: ['Gusto 1', 'Gusto 2', 'Gusto 3'],
  },
];

function crearTarjetaMascota(mascota) {
  const card = document.createElement('article');
  card.className = 'mascota-card reveal';

  card.innerHTML = `
    <div class="mascota-photo">
      <img src="${mascota.imagen}" alt="Foto de ${mascota.nombre}" loading="lazy">
      <span class="mascota-species-tag">${mascota.especie}</span>
    </div>
    <div class="mascota-body">
      <h2>${mascota.nombre} <span class="mascota-age">· ${mascota.edad}</span></h2>
      <p class="mascota-desc">${mascota.descripcion}</p>
      <p class="mascota-personalidad">${mascota.personalidad}</p>
      <ul class="mascota-gustos" aria-label="Cosas que le gustan a ${mascota.nombre}">
        ${mascota.gustos.map((g) => `<li>${g}</li>`).join('')}
      </ul>
    </div>
  `;

  return card;
}

function renderMascotas() {
  const contenedor = document.getElementById('mascotas-grid');
  if (!contenedor) return;

  mascotas.forEach((mascota) => {
    contenedor.appendChild(crearTarjetaMascota(mascota));
  });

  // Vuelve a activar el observer de scroll para las tarjetas recién creadas
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

document.addEventListener('DOMContentLoaded', renderMascotas);
