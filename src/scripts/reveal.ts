// Revelado al scroll (progressive enhancement). Ver src/styles/global.css para el estado
// inicial/visible gobernado por CSS, y Base.astro para el script inline que activa .js-reveal-enabled.
const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (targets.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' },
  );

  for (const el of targets) observer.observe(el);
} else {
  // Sin soporte de IntersectionObserver: no ocultamos nada vía JS, así que no hace falta fallback.
  for (const el of targets) el.classList.add('reveal-visible');
}
