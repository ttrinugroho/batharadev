const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;

const plugins = [
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns:['js', 'css']
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash].css',
    chunkFilename: '[id].css'
  }),
  new AssetsPlugin({
    filename: 'webpack_assets.json',
    path: path.join(__dirname, './hugo/data/'),
    prettyPrint: true
  })
];

if (nodeEnv === 'production') {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
  );
}

module.exports = {
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  entry: {
    app: './design'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  externals: {
  },
  resolve: {
    extensions: ['.ts', '.scss', '.css', '.js'],
    modules: [
      path.resolve(__dirname, "node_modules"),
    ],
  },
  output: {
    publicPath: "/design/",
    filename: `js/[name].[chunkhash].js`,
    path: path.resolve(__dirname, 'hugo/static/design')
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins
};
