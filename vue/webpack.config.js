const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    libraryTarget: 'umd', 
    filename: 'microfrontend.js',
    library: 'microfrontend',
    path: path.resolve(__dirname, '../service/public'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  devtool: 'source-map',
  externals: [],
}
