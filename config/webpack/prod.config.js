const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const dotenv = require('dotenv')
  .config({ path: path.resolve(__dirname, '../../.env') });

const env = {
  ...dotenv.parsed,
  MOCK_API: process.env.MOCK_API,
  PUBLIC_PATH: process.env.PUBLIC_PATH,
  ASSETS_PATH: process.env.ASSETS_PATH,
  API_URL: process.env.API_URL,
};

const BUILD_FOLDER = 'build';

module.exports = {
  mode: 'production',

  entry: {
    polyfill: '@babel/polyfill',
    bundle: './src/index.js',
  },

  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../../', BUILD_FOLDER),
    publicPath: env.ASSETS_PATH || '/',
  },

  performance: {
    hints: false,
  },

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: 'url-loader?limit=30000&name=[path][name].[ext]',
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      title: 'Identifo Admin',
      template: path.resolve(__dirname, '../..', 'index.template.html'),
    }),
    new CleanPlugin([BUILD_FOLDER], {
      root: path.resolve(__dirname, '../../'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, '../../404.html'),
        to: path.resolve(__dirname, '../../build'),
      },
    ]),
  ],
};
