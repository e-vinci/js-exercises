const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const DEVELOPMENT_API_BASE_URL = '/api'; // base URL of your local API. Use /api if you want to use webpack proxy, else use http://localhost:3000 (frontend origin http://localhost:8080 shall then be authorized by the API cors)
const PRODUCTION_API_BASE_URL = 'https://mymovies.azurewebsites.net'; // to be changed to point to the URL of your API
const DEVELOPMENT_PATH_PREFIX = '/'; // normally not to be changed, your assets should be provided directly within /dist/ (and not /dist/mymovies/ e.g.)
const PRODUCTION_PATH_PREFIX = '/mymovies/'; // e.g. '/mymovies/' if you deploy to GitHub Pages as a Project site : mymovies would be the repo name

const buildMode = process.argv[process.argv.indexOf('--mode') + 1];
const isProductionBuild = buildMode === 'production';

const API_BASE_URL = isProductionBuild ? PRODUCTION_API_BASE_URL : DEVELOPMENT_API_BASE_URL;
const PATH_PREFIX = isProductionBuild ? PRODUCTION_PATH_PREFIX : DEVELOPMENT_PATH_PREFIX;

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: PATH_PREFIX,
  },
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    port: 8080,
    host: 'localhost',
    allowedHosts: 'all',
    open: true, // open the default browser
    hot: true,
    historyApiFallback: true, // serve index.html instead of routes leading to no specific ressource
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      // emits a separate file and exports the URLs => works for import in JS and url in CSS
      // default condition: a file with size less than 8kb will be treated as a inline
      // module type and resource module type otherwise
      {
        test: /\.(png|jpg|gif|svg|mp3|mpe?g)$/,
        type: 'asset/resource',
      },
      // in html file, emits files in output directory
      // and replace the src with the final path (to deal with svg, img...)
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      publicPath: PATH_PREFIX,
    }),
    new ESLintPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUILD_MODE': JSON.stringify(buildMode),
      'process.env.API_BASE_URL': JSON.stringify(API_BASE_URL),
      'process.env.PATH_PREFIX': JSON.stringify(PATH_PREFIX),
    }),
  ],
};
