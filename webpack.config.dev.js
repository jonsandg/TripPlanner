var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath : '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise',
      'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: [
        path.join(__dirname, 'src')
      ]
    }
  ]},
  devServer: {
    contentBase: './dist',
    hot: true
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      model: path.resolve(__dirname, 'src/model'),
      firebase: path.resolve(__dirname, 'src/firebase'),
    }
  }
};
