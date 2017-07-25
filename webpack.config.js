var path = require('path');
var webpack = require('webpack');
var precss = require('precss');

module.exports = {
     entry: {
        vendor: ['jquery', 'react', 'react-dom'],
        traffic_vendor: ['echarts', 'leaflet', 'moment'],
        login: path.resolve(__dirname, './app/login/login.js'),
        traffic: path.resolve(__dirname, './app/traffic/traffic.js')
    },
    // 输出配置
    output: {
        path: path.resolve(__dirname, './output'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {

        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime', 'transform-react-jsx',[
                        "import", 
                        {
                          "libraryName": "antd",
                          "style": 'css',   // or 'css' 
                        }
                    ]],
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
            },
            {
                test: /\.png$/,
                loader: 'url',
                query: {
                    'mimetype': 'image/png',
                },
            },
            {
                test: /\.ttf$/,
                loader: 'url?limit=128000&context=./public/&name=[path][name].[ext]',
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss: function () {
        return [precss]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
          name: ['vendor'],
          minChunks: Infinity,
          filename: 'vendor.js'
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false,  // remove all comments
          },
          compressor: {
            warnings: false,
          },
          minimize: true
        })
    ]
}
