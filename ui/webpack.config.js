// Reference:
// https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658

/*
 * Webpack-dev-server builds and runs the server in memory!
 * If you want to actually build files, use "npm build"
 * which uses webpack itself.
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    //hotOnly: true,
    publicPath: 'http://localhost:3000/dist/',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
