const path = require('path');
const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./common');

module.exports = merge(common, {
  mode: 'production',
  performance: {
    maxAssetSize: 3000 * 1024,
    maxEntrypointSize: 3000 * 1024
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.jsx|\.tsx|\.ts|\.svg|\.png|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public/locales'),
          to: path.resolve(__dirname, '../dist/locales')
        }
      ]
    })
  ]
});
