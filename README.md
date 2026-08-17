# Instalaciones ML — Landing page

Landing page de una sola página para **Instalaciones ML**, instalador de placas solares y autoconsumo fotovoltaico en Alhaurín de la Torre y provincia de Málaga.

## Estructura

```
Instalaciones ML/
├── index.html          # Página principal (todo el contenido)
├── css/style.css        # Estilos
├── js/main.js            # Animaciones GSAP/ScrollTrigger, formulario, menú, cookies
├── img/                   # Imágenes y placeholders
│   └── capas/             # Placeholders de las 5 capas del despiece + placa completa
└── legal/                 # Aviso legal, privacidad, cookies
```

Sin build ni dependencias de instalación: HTML, CSS y JS puros. GSAP y ScrollTrigger se cargan por CDN.

## Efecto estrella: despiece de la placa al hacer scroll

La sección `#despiece` usa GSAP ScrollTrigger con `scrub` para separar las 5 capas de la placa (cristal, células, EVA, backsheet, marco) según el usuario baja o sube. Al final de la sección se transiciona a la vista del sistema completo (`#sistema`) con líneas de flujo de energía animadas (sol → placa → inversor → casa/batería → red).

## Imágenes / renders pendientes de sustituir

Todas las imágenes actuales son **placeholders SVG generados**, marcados con texto "PLACEHOLDER". Para dar el acabado final, sustituir por fotografía/render real:

1. `img/hero-placas.svg` → Foto real de una instalación de placas en tejado, con cielo azul (imagen del hero).
2. `img/capas/cristal.svg` → Render/foto de la capa de cristal templado (vista de plano cenital, cuadrada).
3. `img/capas/celulas.svg` → Render/foto de las células fotovoltaicas.
4. `img/capas/eva.svg` → Render/foto de la lámina EVA.
5. `img/capas/backsheet.svg` → Render/foto del backsheet.
6. `img/capas/marco.svg` → Render/foto del marco de aluminio.
7. `img/capas/placa-completa.svg` → Render de la placa ya montada (usado en la sección "sistema completo").
8. `img/sistema-inversor.svg`, `img/sistema-bateria.svg`, `img/sistema-casa.svg` → Iconos/renders del inversor, batería y vivienda (opcional sustituir por ilustraciones de marca).
9. `img/og-image.svg` → Imagen para compartir en redes sociales (Open Graph), 1200x630, con foto real de instalación.
10. Logos de fabricantes y sellos de garantía en la sección "Confianza" (actualmente texto placeholder).
11. Reseñas de clientes reales en la sección "Confianza" (actualmente texto de ejemplo).

Todas las capas están en formato cuadrado (600x600) para que encajen bien en la animación de despiece; los renders reales deben mantener esa proporción para no romper el efecto.

Recomendado: mantener formato SVG o WebP optimizado para que la animación de scroll siga siendo fluida.

## Pendiente de confirmar (marcado en el código con `[confirmar]`)

- Horario exacto de atención.
- Importes de subvenciones/deducciones fiscales vigentes.
- Reseñas reales de clientes (sustituir los ejemplos).
- Logos de fabricantes/garantías.
- NIF/razón social para el aviso legal.

## Formulario de leads

El formulario de la sección "Calcula tu ahorro" abre WhatsApp (`wa.me/34640532175`) con un mensaje prerrellenado con los datos introducidos. No requiere backend. Si se prefiere recibir los leads también por email, se puede sustituir el `submit` en `js/main.js` por una integración con [Formspree](https://formspree.io) u otro servicio similar.

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub (por ejemplo `instalaciones-ml-web`).
2. Desde esta carpeta:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/instalaciones-ml-web.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub → Settings → Pages → Source: seleccionar la rama `main` y la carpeta `/ (root)`.
4. La web quedará publicada en `https://TU_USUARIO.github.io/instalaciones-ml-web/`.
5. Para usar un dominio propio, añadir un archivo `CNAME` con el dominio y configurar el DNS según la [documentación de GitHub Pages](https://docs.github.com/es/pages).

## Diseñado por

Lumetrix — [lumetrix.ai]
