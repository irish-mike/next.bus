import { config } from './config.js';
import { startClock } from './clock.js';
import { fetchArrivals } from './bus-api.js';
import { renderArrivals } from './arrivals.js';

const els = {
  dashboard: document.querySelector('[data-js="dashboard"]'),
  clockTime: document.querySelector('[data-js="clock-time"]'),
  clockSeconds: document.querySelector('[data-js="clock-seconds"]'),
  clockDate: document.querySelector('[data-js="clock-date"]'),
  stopName: document.querySelector('[data-js="stop-name"]'),
  arrivalsList: document.querySelector('[data-js="arrivals-list"]'),
  status: document.querySelector('[data-js="status"]'),
};

els.stopName.textContent = config.stopName;

startClock(
  { timeEl: els.clockTime, secondsEl: els.clockSeconds, dateEl: els.clockDate },
  config.clockIntervalMs
);

// On failure the last good list stays on screen; only the status line changes.
let lastUpdatedAt = null;

async function refreshArrivals() {
  try {
    const arrivals = await fetchArrivals(config.arrivalsUrl);
    renderArrivals(els.arrivalsList, arrivals.slice(0, config.maxArrivals));
    lastUpdatedAt = currentTime();
    els.status.textContent = 'Updated ' + lastUpdatedAt;
    els.dashboard.classList.remove('is-stale');
  } catch (err) {
    els.status.textContent = lastUpdatedAt
      ? 'Bus data unavailable — last updated ' + lastUpdatedAt
      : 'Bus data unavailable';
    els.dashboard.classList.add('is-stale');
  }
}

function currentTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return pad(now.getHours()) + ':' + pad(now.getMinutes());
}

refreshArrivals();
setInterval(refreshArrivals, config.arrivalsIntervalMs);
