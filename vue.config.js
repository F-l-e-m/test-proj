/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');

const { NODE_ENV } = process.env;

module.exports = {
  devServer: {
    host: 'localhost',
    port: '8088',
    contentBase: path.resolve(__dirname, 'dist'),
    watchOptions: {
      poll: true,
    },
    historyApiFallback: true,
  },
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6,
      }),
    ],
  },
  css: {
    sourceMap: NODE_ENV !== 'production',
  },
  chainWebpack: (config) => {
    const api = process.env.VUE_APP_API_URL;
    config.resolve.alias.set(
      'api',
      path.resolve(__dirname, `src/api/${api}`),
    );
  },
};
