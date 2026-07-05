// Tiny static + proxy server for the built app.
//
// The EMT API sends no CORS headers, so the browser can't call it directly
// (and fetch() doesn't work over file:// at all). This serves dist/ over
// http and forwards /EMT/* to www.emtvalencia.es, same-origin to the page.
//
// Usage: node server.js [port]   (default 8080)
// Runs anywhere Node does, including Termux on the Android panel.

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.argv[2]) || 8080;
const ROOT = path.join(__dirname, 'dist');
const EMT_HOST = 'www.emtvalencia.es';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

http
  .createServer((req, res) => {
    if (req.url.startsWith('/EMT/')) {
      proxyToEmt(req, res);
    } else {
      serveFile(req, res);
    }
  })
  .listen(PORT, () => {
    console.log('next.bus running at http://localhost:' + PORT);
  });

function proxyToEmt(req, res) {
  const proxyReq = https.request(
    {
      hostname: EMT_HOST,
      path: req.url,
      method: 'GET',
      // EMT rejects requests that don't look like they come from its site.
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        Referer: 'https://www.emtvalencia.es/ciudadano/index.php',
      },
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, {
        'Content-Type': proxyRes.headers['content-type'] || 'text/xml',
      });
      proxyRes.pipe(res);
    }
  );
  proxyReq.on('error', () => {
    res.writeHead(502);
    res.end('EMT request failed');
  });
  proxyReq.setTimeout(15000, () => proxyReq.destroy());
  proxyReq.end();
}

function serveFile(req, res) {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.normalize(
    path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath)
  );
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end();
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream',
    });
    res.end(data);
  });
}
