'use strict';

//require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve('./client/pages/app.js')
//      path.join(__dirname, '../../client/pages/app.js')
    ]
  },
  output: {
    path: path.join(__dirname, '../../client/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ExtractTextPlugin("[name].css"),
    new ManifestPlugin(),
  ],
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        "plugins": [
          ["react-transform", {
            "transforms": [{
              "transform": "react-transform-hmr",
              "imports": ["react"],
              "locals": ["module"]
            }]
          }],
          "add-module-exports",
          "transform-decorators-legacy",
          "jsx-control-statements"
        ],
        "presets": [
          "env",
          "react",
          "stage-0"
        ]
      }
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: ["css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]", "less-loader"]
      })
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: "css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]"
      })
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=image/svg+xml"
    }]
  }
};
