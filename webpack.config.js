module.exports = {
  entry: '/browser/app.js',
  output: {
    path: __dirname,
    filename: '/public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        //for requiring in css files
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
