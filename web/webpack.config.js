/**
 * ref: https://dev.to/mikehamilton00/adding-web-support-to-a-react-native-project-in-2023-4m4l
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

const babelConfig = require('../babel.config');

// const compileNodeModules = [
//   // Add every react-native package that needs compiling
//   // 'react-native-gesture-handler',
//   'react-native-vector-icons', // ADD THIS LINE HERE
// ].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));


// Babel loader configuration
const babelLoaderConfiguration = {
  test: /\.(tsx|jsx|ts|js)?$/,
  exclude: [
    {
      and: [
        // babel will exclude these from transpling
        path.resolve(appDirectory, 'node_modules'),
        path.resolve(appDirectory, 'ios'),
        path.resolve(appDirectory, 'android'),
        // ...compileNodeModules
      ],
      // whitelisted modules to be transpiled by babel
      not: [],
    },
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // Presets and plugins imported from main babel.config.js in root dir
      presets: babelConfig.presets,
      plugins: ['react-native-web', ...(babelConfig.plugins || [])],
    },
  },
};

// Image loader configuration
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

const audioLoaderConfiguration = {
  test: /\.(mp3|wav)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
      // outputPath: path.resolve(appDirectory, 'src/assets/audio'),
    },
  },
}

// File loader configuration
const fileLoaderConfiguration = {
  test: /\.(woff(2)?|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
      },
    },
  ],
};

const ttfLoaderConfiguration = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: [
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
  ],
};

module.exports = argv => {
  return {
    entry: path.resolve(appDirectory, 'index'),
    output: {
      clean: true,
      path: path.resolve(appDirectory, 'web/dist'),
      filename: '[name].[chunkhash].js',
      sourceMapFilename: '[name].[chunkhash].map',
      chunkFilename: '[id].[chunkhash].js',
    },
    resolve: {
      extensions: [
        '.web.js',
        '.js',
        '.web.ts',
        '.ts',
        '.web.jsx',
        '.jsx',
        '.web.tsx',
        '.tsx',
      ],
    },
    module: {
      rules: [
        babelLoaderConfiguration,
        imageLoaderConfiguration,
        audioLoaderConfiguration,
        fileLoaderConfiguration,
        ttfLoaderConfiguration
      ],
    },
    plugins: [
      // Fast refresh plugin
      new ReactRefreshWebpackPlugin(),

      // Plugin that takes public/index.html and injects script tags with the built bundles
      new HtmlWebpackPlugin({
        template: path.resolve(appDirectory, 'web/public/index.html'),
      }),

      // Defines __DEV__ and process.env as not being null
      new webpack.DefinePlugin({
        __DEV__: argv.mode !== 'production' || true,
        process: {env: {}},
      }),
    ],
    optimization: {
      // Split into vendor and main js files
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  };
};