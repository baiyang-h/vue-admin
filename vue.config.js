module.exports = {
  // publicPath: '/'，
  // outputDir: 'aaa',       // 生成的生产环境构建文件的目录，即打包后的文件，名字为aaa，默认是dist
  // assetsDir: '',           // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // indexPath: '',           // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // filenameHashing: '',     // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
  // pages: {},               // 多页面应用
  // lintOnSave: boolean | 'warning' | 'default' | 'error'    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // runtimeCompiler: boolean           // 是否使用包含运行时编译器的 Vue 构建版本
  // transpileDependencies:             // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
  // productionSourceMap: boolean       // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  // crossorigin
  // integrity
  // configureWebpack: Object | Function         // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  // chainWebpack: Function                     // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。 (链式操作)
  /*
  css: {
    requireModuleExtension: boolean             // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块,设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS
    extract: boolean | Object                   // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: boolean                          // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    loaderOptions: Object                       // 向 CSS 相关的 loader 传递选项
  }

  devServer: {
    proxy: string | Object                      // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器
  }
   */
  // pwa: Object                                // 向 PWA 插件传递选项
  /*
  pluginOptions: Object                      // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
  pluginOptions: {
    foo: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    }
  }
   */



  css: {
    loaderOptions: {
      scss: {
        //全局样式
        prependData: `@import "~@/assets/styles/variables.scss";`
      }
    }
  },
  configureWebpack: config => {
    /*if (process.env.NODE_ENV === 'production') {
      config.entry.app = ['babel-polyfill', './src/main.js'];
      config.externals = {
        'jquery': 'jquery'
      };
    } else {
      // 为开发环境修改配置...
    }*/
  },
  devServer: {
    /*proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }*/
  }
};
