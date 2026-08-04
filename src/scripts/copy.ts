// Copiar dato al portapapeles con confirmación doble: visual (icono cambia a check)
// y anunciada (región aria-live junto al botón), como pide el plan de accesibilidad.
const buttons = document.querySelectorAll<HTMLButtonElement>('.copy-button');

for (const button of buttons) {
  const value = button.dataset.copyValue ?? '';
  const copyIcon = button.querySelector<SVGElement>('[data-icon="copy"]');
  const checkIcon = button.querySelector<SVGElement>('[data-icon="check"]');
  const status = button.parentElement?.querySelector<HTMLElement>('[data-copy-status]');
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  button.addEventListener('click', async () => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }

    copyIcon?.classList.add('hidden');
    checkIcon?.classList.remove('hidden');
    if (status) status.textContent = 'Copiado';

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copyIcon?.classList.remove('hidden');
      checkIcon?.classList.add('hidden');
      if (status) status.textContent = '';
    }, 1500);
  });
}
