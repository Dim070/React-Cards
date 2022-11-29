const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const cssnano = require('cssnano');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

process.traceDeprecation = true;
module.exports = {
  entry: [path.resolve(__dirname, '../src/index.tsx')],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: path.resolve(__dirname, '../public'),
        exclude: path.resolve(__dirname, '../node_modules'),
        options: {
          minimize: true
        }
      },
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, '../src'),
        exclude: [path.resolve(__dirname, '../node_modules'), path.resolve(__dirname, '../dist')],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          ExtractTextPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              },
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [cssnano()]
              }
            }
          },
          'sass-loader'
        ],
        exclude: [path.resolve(__dirname, '../node_modules'), /\.global\.scss$/]
      },
      {
        test: /\.global\.scss$/,
        use: [ExtractTextPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        include: path.resolve(__dirname, '../src/common/ui-kit/fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              dimensions: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ]
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['index.js', 'index.jsx', 'index.ts', 'index.ts', '.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@root': path.resolve(__dirname, '../src/'),
      '@icons': path.resolve(__dirname, '../src/assets/icons'),
      '@scss': path.resolve(__dirname, '../src/assets/scss'),
      '@images': path.resolve(__dirname, '../src/assets/images')
    }
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ]
};
