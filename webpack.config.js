const path = require('path')

module.exports = {
  mode: 'development',
  output: {
    filename: 'fake-player.min.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
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