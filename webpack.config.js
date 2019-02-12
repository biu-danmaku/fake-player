module.exports = {
  mode: 'development',
  output: {
    filename: 'fake-player.min.js',
    publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
}