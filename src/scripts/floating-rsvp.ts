// Botón flotante de RSVP: visible entre el hero y la sección de confirmación.
// Usa el atributo `hidden` (no opacidad) para que el enlace nunca quede
// enfocable/anunciado mientras está oculto.
const floatingRsvp = document.getElementById('floating-rsvp');
const hero = document.getElementById('hero');
const rsvpSection = document.getElementById('confirmacion');

if (floatingRsvp && hero && rsvpSection && 'IntersectionObserver' in window) {
  let heroVisible = true;
  let rsvpVisible = false;

  const update = () => {
    floatingRsvp.hidden = heroVisible || rsvpVisible;
  };

  const heroObserver = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    update();
  });

  const rsvpObserver = new IntersectionObserver(([entry]) => {
    rsvpVisible = entry.isIntersecting;
    update();
  });

  heroObserver.observe(hero);
  rsvpObserver.observe(rsvpSection);
}
