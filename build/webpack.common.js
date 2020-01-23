'use strict';
const CircularDependencyPlugin = require('circular-dependency-plugin');

const path = require('path');
const dist = path.resolve(__dirname, '../dist');
const src = path.resolve(__dirname, '../src');

module.exports = {
  devtool: 'source-map',
  entry: ['./src/index.js'],
  output: {
    path: dist,
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'lib_template'    
  },
  resolve: {
    alias: {
      src: src
    },
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    })
  ]
};
