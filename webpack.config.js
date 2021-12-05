var path = require('path')
const webpack = require('webpack')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
/** 上网搜了搜，感觉对于webpack5以上的版本，用extract-text-webpack-plugin已经不行了，只能用mini-css-extract-plugin代替 */
const MiniCssExtractTextPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// 启动脚本设置的变量都存在 process.env 对象中
const isDev = process.env.NODE_ENV !== 'production'
console.log(isDev, '是否本地开发环境')

const config = {
  mode: isDev ? 'development' : 'production',
  target: 'web', // 设置运行环境为web浏览器端
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: isDev ? 'scripts/bundle.js' : 'scripts/bundle.[chunkhash:8].js' // 打包时使用chunkhash ,之前开发时使用hash或者使用文件名本身亦可
    // publicPath: './'
  },
  resolve: {
    // 设置别名
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src') // 这样配置后 @ 可以指向 src 目录
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader'
      }]
    },
    {
      test: /\.html$/,
      use: 'html-loader'
    },
    {
      test: /\.(jpg|png|svg|gif|jpeg)$/,
      use: {
        loader: 'url-loader',
        options: {
          // 单位是b，500kb = 512000b
          limit: 512000,
          name: 'img/[name].[hash:8].[ext]',
          esModule: false // 添加这个防止vue文件img标签中的图片显示不了
        }
      }
    },
    {
      test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          // 单位是b，500kb = 512000b
          limit: 512000,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    },
    {
      test: /\.jsx?$/,
      use: 'babel-loader'
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // 根据不同环境区分打包
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    })
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  }, {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }, {
    test: /\.styl(us)?$/,
    use: ['style-loader', 'css-loader', {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }, 'stylus-loader']
  })
  config.devServer = {
    port: '7001',
    host: 'localhost',
    overlay: {
      errors: true // 编译时网站实现错误
    },
    disableHostCheck: true,
    historyApiFallback: true, // 表示任何的404页面都会跳转到入口页面index.html
    hot: true // 开启了热更新模块 , 当未开始时，局部数据改变会导致整个页面刷新，当开启时需要配合插件HotModuleReplacementPlugin使用，否则将会显示空白页面
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
  // config.devtool = '#cheap-module-eval-source-map'
} else {
  // config.output.filename = 'scripts/bundle.[chunkhash:8].js' // 打包时使用chunkhash ,之前开发时使用hash或者使用文件名本身亦可
  config.module.rules.push({
    test: /\.css$/,
    use: [MiniCssExtractTextPlugin.loader, 'css-loader']
  }, {
    test: /\.scss$/,
    use: [MiniCssExtractTextPlugin.loader, 'css-loader', 'sass-loader']
  }, {
    test: /\.styl(us)?$/,
    use: [MiniCssExtractTextPlugin.loader, 'css-loader', {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }]
  })
  config.entry = {
    app: path.join(__dirname, 'src/main.js'),
    vendor: ['vue']
  }
  config.plugins.push(
    new MiniCssExtractTextPlugin({
      filename: 'style.[hash:8].css',
      chunkFilename: 'chunk[id].css'
    })
  )
  config.optimization = {
    splitChunks: {
      name: 'vendor'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
}

module.exports = config
