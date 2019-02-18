const path = require('path')

const development = process.env.NODE_ENV === 'development'

module.exports = {
  mode: development ? 'development' : 'production',
  output: {
    filename: 'fake-player.min.js',
    library: 'FakePlayer',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: development ? 'dist' : '/'
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
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg/,
        use: { loader: 'svg-url-loader' }
      },
      {
        test: /\.m?js$/,
        use: 'babel-loader'
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