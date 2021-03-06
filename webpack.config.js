var path = require('path')
var webpack = require('webpack')
var CopyPlugin = require('copy-webpack-plugin')


module.exports = {
  entry: ['./src/main.js', './src/sass/styles.scss'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  optimization: {
    minimize: true //Update this to true or false
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/images/*.svg'),
          to: "images/[name].[ext]",
        },
        {
          from: path.resolve(__dirname, './src/images/*.png'),
          to: "images/[name].[ext]",
        },
        {
          from: path.resolve(__dirname, './src/images/obras/*.png'),
          to: "images/obras/[name].[ext]",
        },
        {
          from: path.resolve(__dirname, './src/images/obras/*.jpg'),
          to: "images/obras/[name].[ext]",
        },
        {
          from: path.resolve(__dirname, './src/descargables/*.zip'),
          to: "descargables/[name].[ext]",
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json', '.zip']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    overlay: true,
    port: 9000,
    open: true,
    hot: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ])
}
