const nodeExternal = require('webpack-node-externals')
const UglifyESWebpackPlugin = require('uglify-es-webpack-plugin')
module.exports = {
  // 表明node环境
  target: 'node',
  entry: {
    'app': './src/app.ts'
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', 'json', '.ts', '.tsx']
  },
  mode: 'none',
  externals: [
    // 不打包node的部分
    nodeExternal(),
  ],
  plugins: [
    new UglifyESWebpackPlugin()
  ],
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  }
} 
