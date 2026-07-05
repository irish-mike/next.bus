const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    // Watch the project root for html/css edits, but ignore noisy dirs —
    // the IDE rewrites .idea/workspace.xml constantly, and each change
    // would trigger a full page reload.
    static: [
      {
        directory: './',
        watch: {
          ignored: ['**/.git/**', '**/.idea/**', '**/node_modules/**', '**/dist/**'],
        },
      },
    ],
    // The EMT API sends no CORS headers, so the browser can't call it
    // directly; the dev server fetches it for us instead.
    proxy: [
      {
        context: ['/EMT'],
        target: 'https://www.emtvalencia.es',
        changeOrigin: true,
      },
    ],
  },
});
