const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  target: 'node',
  externals: [
    nodeExternals(),
  ],
  output: {
    libraryTarget: 'commonjs',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      }
    ]
  }
}
