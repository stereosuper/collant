const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'collant',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'stage-0']
              }
            }
          }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};