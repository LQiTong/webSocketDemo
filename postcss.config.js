const autoprefixer = require('autoprefixer')

// 在使用postcss后处理CSS时使用autoprefixer添加浏览器内核前缀-webkit-
module.exports = {
  plugins: [
    autoprefixer({
      browsers: 'last 5 version'
    })
  ]
}
