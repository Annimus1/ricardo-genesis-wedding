// La fecha objetivo se lee de data-wedding-date (ISO con offset explícito, ver src/data/wedding.ts).
// new Date(iso) resuelve al instante UTC correcto sin importar la zona horaria del visitante,
// así que no hace falta ningún cálculo manual de husos horarios aquí.
const root = document.getElementById('countdown-root');

if (root) {
  const targetISO = root.dataset.weddingDate;
  const target = targetISO ? new Date(targetISO).getTime() : NaN;
  const doneEl = document.getElementById('countdown-done');

  const unitEls = {
    months: root.querySelector<HTMLElement>('[data-unit="months"]'),
    days: root.querySelector<HTMLElement>('[data-unit="days"]'),
    hours: root.querySelector<HTMLElement>('[data-unit="hours"]'),
    minutes: root.querySelector<HTMLElement>('[data-unit="minutes"]'),
    seconds: root.querySelector<HTMLElement>('[data-unit="seconds"]'),
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  const tick = () => {
    const diff = target - Date.now();
    const targetDate = new Date(target);
    const nowDate = new Date(Date.now());

    if (diff <= 0) {
      root.hidden = true;
      if (doneEl) doneEl.hidden = false;
      clearInterval(intervalId);
      return;
    }

    const months = targetDate.getUTCMonth() - nowDate.getUTCMonth();
    const days = targetDate.getUTCDate() - nowDate.getUTCDate();
    const hours = targetDate.getUTCHours() - nowDate.getUTCHours();
    const minutes = 60 - nowDate.getUTCMinutes();
    const seconds = 60 - nowDate.getUTCSeconds();

    if (unitEls.months) unitEls.months.textContent = String(months);
    if (unitEls.days) unitEls.days.textContent = String(days);
    if (unitEls.hours) unitEls.hours.textContent = pad(hours);
    if (unitEls.minutes) unitEls.minutes.textContent = pad(minutes);
    if (unitEls.seconds) unitEls.seconds.textContent = pad(seconds);
  };

  tick();
  const intervalId: ReturnType<typeof setInterval> = setInterval(tick, 1000);
}
