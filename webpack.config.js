const nodeExternal = require('webpack-node-externals')
module.exports = {
  // 表明node环境
  target: 'node',
  entry: {
    'app': './src/app.ts'
  },
  output: {
    filename: '[name].bundle.js'
  },
  mode: 'development',
  externals: [
    // 不打包node的部分
    nodeExternal()
  ],
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  }
} 
