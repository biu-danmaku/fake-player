const path = require('path')

module.exports = {
  mode: 'development',
  output: {
    filename: 'fake-player.min.js',
    library: 'FakePlayer',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: process.env.NODE_ENV === 'development' ? 'dist' : '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader'
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
  },
  devServer: {
    contentBase: path.join(__dirname, 'demo')
  }
}