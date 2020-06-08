// TODO: Add resolve.alias.

const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const env = process.env.NODE_ENV;

// We’re not using webpack’s `env` argument because we might need to pass an
// environment variable to our Babel config, too.
module.exports = {
  devServer: {
    historyApiFallback: true,
    open: 'Google Chrome'
  },
  devtool: env === 'development' ? 'eval-source-map' : 'none',
  entry: {
    main: './src/main.js'
  },
  mode: env,
  output: {
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1'
      },
      template: './src/index.html',
      title: 'v-comment-in-context'
    }),
    new VueLoaderPlugin()
  ]
};
