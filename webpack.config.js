const nodeExternal = require('webpack-node-externals')
// const UglifyJSWebpackPlugin = require('uglify-es')
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
  },
  plugins: [
    // new UglifyJSWebpackPlugin()
  ]
} 
