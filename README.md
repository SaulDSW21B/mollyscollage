# 🐾 Mis Mascotas

Álbum digital personal dedicado a tus mascotas: un sitio web hecho con **HTML5, CSS3 y JavaScript puro** (sin frameworks), con estilo tipo scrapbook/collage.

## 1. Estructura del proyecto

```
mascotas/
│
├── index.html         → Página de inicio (portada)
├── mascotas.html       → Tarjetas individuales de cada mascota
├── galeria.html        → Galería de fotos con filtros y lightbox
├── recuerdos.html       → Línea de tiempo de momentos especiales
│
├── css/
│   ├── style.css        → Variables, navegación, pie de página, animaciones
│   ├── home.css          → Estilos de la portada
│   ├── mascotas.css      → Estilos de las tarjetas de mascotas
│   ├── galeria.css       → Estilos de la galería y el lightbox
│   └── recuerdos.css    → Estilos de la línea de tiempo
│
├── js/
│   ├── main.js           → Menú móvil, modo oscuro, animaciones al scroll, volver arriba
│   ├── mascotas.js       → Datos de las mascotas + renderizado de tarjetas
│   ├── galeria.js        → Datos de la galería + filtros + lightbox
│   └── recuerdos.js      → Datos de los recuerdos + línea de tiempo
│
├── img/
│   ├── mascota1/         → Fotos de la mascota 1
│   ├── mascota2/         → Fotos de la mascota 2
│   ├── mascota3/         → Fotos de la mascota 3 (opcional)
│   └── galeria/          → Fotos de la galería general
│
└── README.md
```

Todas las imágenes incluidas actualmente son **marcadores de posición de ejemplo** (fondos de color con una etiqueta). Reemplázalas por tus propias fotografías manteniendo el mismo nombre de archivo, o actualiza las rutas en los archivos `.js` correspondientes.

## 2. Dónde colocar las fotografías

- Fotos de cada mascota → `img/mascota1/`, `img/mascota2/`, `img/mascota3/` (o crea una carpeta nueva `img/mascota4/`, etc.)
- Fotos de la galería general → `img/galeria/`

Usa formato `.jpg`, `.jpeg`, `.png` o `.webp`. Si usas otra extensión, actualiza la ruta correspondiente en el archivo `.js`.

## 3. Cómo agregar una mascota

1. Crea una carpeta nueva dentro de `img/`, por ejemplo `img/mascota4/`, y coloca ahí sus fotos.
2. Abre `js/mascotas.js`.
3. Copia uno de los objetos del array `mascotas` y pégalo al final, separado por una coma.
4. Cambia sus valores: `nombre`, `especie`, `edad`, `imagen` (ruta a la foto principal), `descripcion`, `personalidad` y `gustos` (lista de textos cortos).
5. Guarda el archivo — la tarjeta aparecerá automáticamente en `mascotas.html`, no necesitas tocar el HTML.

## 4. Cómo agregar fotografías a la galería

1. Coloca la imagen dentro de `img/galeria/`.
2. Abre `js/galeria.js`.
3. Agrega un objeto al array `galeria` con:
   - `imagen`: ruta del archivo, por ejemplo `"img/galeria/foto11.jpg"`.
   - `categoria`: una de `"mascota1"`, `"mascota2"` o `"momentos"` (o una categoría nueva, ver el punto 5).
   - `tamano` (opcional): `""`, `"wide"`, `"tall"` o `"big"` para variar el tamaño en el collage.

## 5. Cómo agregar categorías de filtro

1. En `galeria.html`, dentro de `<div class="filters">`, agrega un nuevo botón:
   ```html
   <button class="filter-btn" data-filter="mi-categoria">Mi categoría</button>
   ```
2. Usa ese mismo texto (`mi-categoria`) como valor de `categoria` en los objetos de `js/galeria.js` que quieras incluir en ese filtro.

## 6. Cómo modificar los recuerdos

1. Abre `js/recuerdos.js`.
2. Agrega un objeto al array `recuerdos` con `anio`, `fecha`, `titulo`, `descripcion` e `imagen`.
3. La línea de tiempo se ordena y agrupa automáticamente por año — no necesitas ordenarlos tú mismo.

## 7. Cómo cambiar los colores

Todos los colores están centralizados como variables CSS en `css/style.css`, dentro de `:root` (modo claro) y `[data-theme="dark"]` (modo oscuro):

```css
:root {
  --paper: #faf3e6;   /* fondo principal */
  --coral: #d67c56;   /* color de acento cálido */
  --teal: #2b6777;    /* color de acento frío */
  --ink: #3d2c22;     /* color de texto */
  ...
}
```

Cambia estos valores hexadecimales para ajustar la paleta de todo el sitio a la vez.

## 8. Cómo ejecutar el proyecto localmente

**Opción rápida:** haz doble clic en `index.html` para abrirlo directamente en el navegador.

**Opción recomendada (evita problemas de rutas en algunos navegadores):** levanta un servidor local desde la carpeta del proyecto:

```bash
# Con Python 3
python -m http.server 8000

# Luego abre en el navegador:
# http://localhost:8000
```

o, si tienes Node.js instalado:

```bash
npx serve .
```

## Notas

- El modo oscuro se guarda en `localStorage`, por lo que se recuerda entre visitas.
- Los contadores del pie de página ("🐾 3 mascotas", "📷 10 recuerdos") son texto fijo en cada HTML — actualízalos manualmente si agregas o quitas mascotas o recuerdos.
- El sitio respeta `prefers-reduced-motion` para quienes prefieren menos animaciones.
