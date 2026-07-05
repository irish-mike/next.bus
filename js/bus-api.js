// Fetches and parses the EMT-style XML feed into plain arrival objects:
// each arrival is { route: string, destination: string, minutes: string }.
export async function fetchArrivals(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('HTTP ' + response.status);
  }
  return parseArrivals(await response.text());
}

function parseArrivals(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  if (doc.querySelector('parsererror')) {
    throw new Error('Invalid XML');
  }
  return Array.from(doc.querySelectorAll('bus')).map((bus) => ({
    route: text(bus, 'linea'),
    destination: text(bus, 'destino'),
    minutes: text(bus, 'minutos'),
  }));
}

function text(parent, selector) {
  const el = parent.querySelector(selector);
  return el ? el.textContent.trim() : '';
}
