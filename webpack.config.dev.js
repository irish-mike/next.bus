const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
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
