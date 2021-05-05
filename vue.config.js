const isProd = process.env.NODE_ENV === 'production' // 是否生产环境

let externals = {
    'vue': 'Vue',
    'element-ui': 'ELEMENT',
    'quill': 'Quill'
  }

// 添加cdn的用户自定义
let cdn = {
    css: [
        // element-ui css
        'https://unpkg.com/element-ui/lib/theme-chalk/index.css',// 样式表
        // 富文本框插件样式
        'https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.4/quill.bubble.css'
    ],
    js: [
        // vue must at first!
        'https://unpkg.com/vue/dist/vue.js', // vuejs
        // element-ui js
        'https://unpkg.com/element-ui/lib/index.js', // elementUI
        // 富文本框插件
        'https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.4/quill.js'
    ]
}

cdn = isProd ? cdn : { css: [], js: [] }
externals = isProd ? externals : {}

// 添加包的排除
module.exports = {
    configureWebpack: {
        externals:externals
    },
    // 将cdn的资源挂载到插件上
  chainWebpack (config) {
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}

