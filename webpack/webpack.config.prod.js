const config = require('./config.json')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractSass = new ExtractTextPlugin({ filename: path.join('css', config.cssFilename) })
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: config.entry,
  output: {
    path: path.join(__dirname, '..', config.distPath),
    filename: path.join('js', config.jsFilename)
  },

  module: {
    rules: [

      { // HTML
        test: /.html$/i,
        loader: 'html-loader',
        options: {
          minimize: false
        }
      },

      { // JS
        test: /.js$/i,
        use: [{ loader: 'babel-loader', query: { presets: ['es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3'] } }],
        exclude: /node_modules/
      },

      { // SCSS
        test: /.scss$/i,
        loader: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'resolve-url-loader' },
            { loader: 'postcss-loader', options: { plugins: () => [require('autoprefixer')] } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ],

          fallback: 'style-loader'
        }),

        exclude: /node_modules/
      },

      { // CSS
        test: /\.css$/i,
        loaders: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: false } }
        ],
        exclude: /style.css/
      },

      { // Audio
        test: /\.(wav|mp3)$/i,
        use: [
          { loader: 'file-loader', options: { useRelativePath: true, publicPath: 'audio/', outputPath: 'audio/' } }
        ]
      },

      { // Fonts
        test: /\.(eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        query: { useRelativePath: false, publicPath: 'fonts/', outputPath: 'fonts/' }
      },

      { // Images (Optimized)
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          { loader: 'file-loader', query: { useRelativePath: false, publicPath: '/images/', outputPath: '/images/' } },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { quality: 75 },
              pngquant: { quality: '65-90', speed: 4 },
              svgo: { plugins: [ { removeViewBox: false }, { removeEmptyAttrs: false } ] },
              gifsicle: { optimizationLevel: 7, interlaced: false },
              optipng: { optimizationLevel: 7, interlaced: false }
            }
          }
        ]
      }

    ]
  },

  plugins: [
    extractSass,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: { screw_ie8: true, keep_fnames: true },
      compress: { screw_ie8: true, warnings: false }
    }),
    new HtmlWebpackPlugin({
      title: 'Wanderlust',
      filename: 'index.html',
      template: 'index.html'
    })
  ]
}
