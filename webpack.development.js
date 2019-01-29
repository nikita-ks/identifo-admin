const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const BUILD_FOLDER = 'build';

module.exports = {
  mode: 'development',

  entry: {
    bundle: './src/index.js',
  },

  devtool: 'inline-source-map',

  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../src'),
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
      title: 'Identifo Admin Panel',
      template: path.resolve(__dirname, './template.html'),
    }),
    new CleanPlugin([BUILD_FOLDER], {
      root: path.resolve(__dirname, '..'),
    }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/'),
    port: 3000,
  },
};

