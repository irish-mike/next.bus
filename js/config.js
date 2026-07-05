// All tweakable values live here.
const stopId = '589';

export const config = {
  stopId,
  stopName: 'Parada ' + stopId,
  // Same-origin path; the dev server proxies /EMT to www.emtvalencia.es
  // (see webpack.config.dev.js).
  arrivalsUrl:
    '/EMT/mapfunctions/MapUtilsPetitions.php?sec=getSAE&parada=' + stopId + '&adaptados=true',
  maxArrivals: 6,
  clockIntervalMs: 1000,
  arrivalsIntervalMs: 60 * 1000,
};
