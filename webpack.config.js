const path = require('path')

module.exports = {
    entry: {
      main: "./index.js",
      "events.mob": "./files/events.mob.js",
      "workshops.mob": "./files/workshops.mob.js",
      "events.pc": "./files/events.pc.js",
      "workshops.pc": "./files/workshops.pc.js",
      team: "./files/team.js",
      timeline: './files/timeline.js',
      pronite: './files/pronite.js',
      payment: './files/payment.js',
      destho: './files/destho.js',
      pdf: './files/pdf.js',
      workshops: "./files/workshops.js",
      datavis: "./files/datavis.js"
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            'file-loader?name=[path][name].[ext]',
            'extract-loader',
            {
              loader: 'html-loader',
              options: {
                attrs: ["img:src", "link:href", "source:src", "video:src"]
              }
            }
          ]
        }, {
          test: /\.css$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'css/[name].[ext]',
                mimetype: 'text/css'
              }
            },
            'extract-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }, {
              loader: 'postcss-loader', options: {
                ident: 'postcss',
                plugins: [
                  require('postcss-preset-env'),
                  require('cssnano')
                ]
              }
            }
          ]
        }, {
          test: /\.(png|jpg|gif|svg|JPG|jpeg|JPEG|ico)/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'images/[hash].[ext]'
              }
            // },
            // {
            //   loader: 'image-webpack-loader',
            //   options: {
            //     enforce: 'pre'
            //   }
            }
          ]
        }, {
          //  To support all font types
          test: /\.(woff2|woff|otf|ttf|eot)/,
          use: [
            'file-loader'
          ]
          /*test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, // woff2 and woff + stuff like woff?v=1.1.1
          use: [
            {loader: 'url-loader', options: {
              limit: 5000,
              mimetype: "application/font-woff",
              name: './dist/fonts/[name].[ext]'
            }}
          ]*/
        }, {
          test: /\.mp4/,
          use: [
            'file-loader?name=[name].[ext]',
          ]
        }, {
          test: /\.pdf/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'pdf/[name].[ext]'
              }
            }
          ]
        }
      ]
    }
}
