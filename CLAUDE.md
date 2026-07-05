# CLAUDE.md

## Project Goal

This is a dead-simple static wall-panel app for an old Android phone/tablet. It should show a large current clock/date and the next few bus arrivals for one local stop. Keep it KISS, DRY, reliable, and readable from a distance, with a dark sleek “hacker-ish” UI.

## Tech Stack

Use plain HTML, vanilla CSS, and vanilla JavaScript only — no React, no shadcn, no Bootstrap, no framework. The project is scaffolded from HTML5 Boilerplate v9 and built with webpack 5. `js/app.js` is the single webpack entry point and bundles to `dist/js/app.js`.

## Build Rules

Only JavaScript goes through webpack. CSS and static assets are copied as files, so reference CSS with normal `<link>` tags in `index.html`; do not import CSS from JavaScript. Keep config values like stop ID, refresh interval, and max arrivals in one obvious place.

## Code Style

Prefer boring, clear code: small functions, meaningful names, minimal dependencies, and simple DOM updates using stable selectors like `data-js`. Avoid clever abstractions unless they make the app simpler.

## Behavior

Update the clock every second and bus arrivals about every 30 seconds. Handle failed bus requests gracefully by keeping the last good data visible and showing a short status like “Bus data unavailable” or “Last updated 14:32.”

## Deployment

The finished `dist/` folder should be copyable directly to the Android device and opened in a kiosk browser. Start with local file loading; only use Termux/localhost if `file://` causes problems.
