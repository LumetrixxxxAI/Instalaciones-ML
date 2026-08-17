// ==========================================================
// Instalaciones ML — main.js
// ==========================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Header scroll state ---------- */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mainNav.classList.remove('open'));
});

/* ---------- Cookie banner ---------- */
const cookieBanner = document.getElementById('cookieBanner');
const cookieKey = 'ml-cookie-consent';
if (!localStorage.getItem(cookieKey)) {
  setTimeout(() => cookieBanner.classList.add('show'), 800);
}
document.getElementById('cookieAccept').addEventListener('click', () => {
  localStorage.setItem(cookieKey, 'accepted');
  cookieBanner.classList.remove('show');
});
document.getElementById('cookieDecline').addEventListener('click', () => {
  localStorage.setItem(cookieKey, 'declined');
  cookieBanner.classList.remove('show');
});

/* ---------- Lead form -> WhatsApp ---------- */
const leadForm = document.getElementById('leadForm');
leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const vivienda = document.getElementById('vivienda').value;
  const factura = document.getElementById('factura').value;

  const msg =
    `Hola, quiero calcular mi ahorro con placas solares.%0A` +
    `Nombre: ${encodeURIComponent(nombre)}%0A` +
    `Teléfono: ${encodeURIComponent(telefono)}%0A` +
    `Tipo de vivienda: ${encodeURIComponent(vivienda)}%0A` +
    `Factura media: ${encodeURIComponent(factura)} €/mes`;

  window.open(`https://wa.me/34640532175?text=${msg}`, '_blank');
});

/* ---------- Animated counters ---------- */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    counterObserver.unobserve(el);
    const staticVal = el.getAttribute('data-static');
    if (staticVal) {
      el.textContent = staticVal + (el.getAttribute('data-suffix') || '');
      return;
    }
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ---------- GSAP ScrollTrigger: Despiece (exploded view) ---------- */
gsap.registerPlugin(ScrollTrigger);

const isMobile = window.matchMedia('(max-width: 768px)').matches;
const layers = gsap.utils.toArray('.despiece-panel .layer');
const capSteps = gsap.utils.toArray('.cap-step');
const progressBar = document.getElementById('despieceProgressBar');

// Layer target depth (Z) offsets when exploded: the panel is tilted in 3D,
// so moving along Z separates the layers like pulling apart a real stack.
// data-layer: 1=cristal(top) 2=celulas 3=eva 4=backsheet 5=marco(bottom)
// Desktop gets a wider, more dramatic separation; mobile keeps the original compact spacing.
// Each layer also gets a small local Y stagger (in the panel's own un-tilted plane)
// so nearer layers never fully eclipse the ones behind them — every layer keeps
// its own hoverable sliver on screen, including the middle one (EVA).
const explodeOffset = isMobile
  ? { 1: { x: -22, y: -46, z: 104.5 }, 2: { x: -11, y: -23, z: 52.25 }, 3: { x: 0, y: 0, z: 0 }, 4: { x: 11, y: 23, z: -52.25 }, 5: { x: 22, y: 46, z: -104.5 } }
  : { 1: { x: -55, y: -110, z: 260 }, 2: { x: -28, y: -55, z: 130 }, 3: { x: 0, y: 0, z: 0 }, 4: { x: 28, y: 55, z: -130 }, 5: { x: 55, y: 110, z: -260 } };

layers.forEach(layer => {
  gsap.set(layer, { transformOrigin: '50% 50%', x: 0, y: 0, z: 0 });
});

const layerCover = document.getElementById('layerCover');
gsap.set(layerCover, { opacity: 1, z: 1 });

function setCaptionStep(index) {
  capSteps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}
setCaptionStep(0);

// Desktop only: hovering a layer with the cursor shows its description directly
// (mobile has no cursor, so it keeps the scroll-driven captions as before)
if (!isMobile) {
  layers.forEach(layer => {
    const stepIndex = parseInt(layer.getAttribute('data-layer'), 10) - 1;
    layer.addEventListener('mouseenter', () => {
      setCaptionStep(stepIndex);
      layer.classList.add('layer-hovered');
    });
    layer.addEventListener('mouseleave', () => {
      layer.classList.remove('layer-hovered');
    });
  });
}

const despieceTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.despiece-pin',
    start: 'top top',
    end: 'bottom bottom',
    scrub: isMobile ? 0.6 : 1,
    onUpdate: (self) => {
      progressBar.style.width = (self.progress * 100) + '%';
      const stepIndex = Math.min(5, Math.floor(self.progress * 6));
      setCaptionStep(stepIndex);
    }
  }
});

// Cover fades out right at the start, revealing the exploding layers beneath
despieceTimeline.to(layerCover, {
  opacity: 0,
  ease: 'power1.out',
  duration: 0.6
}, 0);

// Steps: explode apart along the tilted depth axis by ~70% progress, then hold, then reassemble near the end
layers.forEach(layer => {
  const n = layer.getAttribute('data-layer');
  const offset = explodeOffset[n];
  despieceTimeline.to(layer, {
    z: offset.z,
    y: offset.y,
    x: offset.x,
    ease: 'power2.out',
    duration: 1
  }, 0);
});

// Hold explosion, then reassemble fully at the very end to hint "sistema completo"
despieceTimeline.to(layers, {
  z: 0,
  y: 0,
  x: 0,
  ease: 'power2.inOut',
  duration: 1
}, 4.2);

// Bring back the whole-panel cover once layers have reassembled
despieceTimeline.to(layerCover, {
  opacity: 1,
  ease: 'power1.in',
  duration: 0.6
}, 4.8);

/* ---------- Sistema diagram: animated energy flow lines ---------- */
const flowPaths = document.querySelectorAll('.sistema-lines path');
flowPaths.forEach(path => {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
});

gsap.to(flowPaths, {
  strokeDashoffset: 0,
  duration: 1.6,
  stagger: 0.25,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.sistema-diagram',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.sistema-node', {
  y: 20,
  opacity: 0,
  duration: 0.7,
  stagger: 0.12,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.sistema-diagram',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  }
});

/* ---------- Generic fade-up reveal for section headers/cards ---------- */
gsap.utils.toArray('.beneficio-card, .proceso-step, .faq-item, .testimonial, .confianza-rating').forEach(el => {
  gsap.from(el, {
    y: 24,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  });
});
