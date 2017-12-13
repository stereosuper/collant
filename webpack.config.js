const path = require('path');
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
                presets: ['es2015', 'stage-0']
              }
            }
          }
        ]
    }
};