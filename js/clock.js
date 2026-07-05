// Keeps the big clock and date up to date.
export function startClock({ timeEl, secondsEl, dateEl }, intervalMs) {
  function update() {
    const now = new Date();
    timeEl.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
    secondsEl.textContent = pad(now.getSeconds());
    dateEl.textContent = formatDate(now);
  }

  update();
  setInterval(update, intervalMs);
}

function formatDate(date) {
  return date.toLocaleDateString('en-IE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

function pad(n) {
  return String(n).padStart(2, '0');
}
