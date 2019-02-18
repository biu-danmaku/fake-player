const path = require('path')

module.exports = {
  mode: 'development',
  output: {
    filename: 'fake-player.min.js',
    library: 'FakePlayer',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.svg/,
        use: { loader: 'svg-url-loader' }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
}