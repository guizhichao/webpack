const webpack = require('webpack');
// 合并webpack 配置选项
const webpackMerge = require('webpack-merge');
// 基础配置项
const baseConfig = require('./webpack.base.conf');
const config = require('../config');

// 开发中配置选项
const devConfig = {
  // 开发环境服务设置
  devServer: {
    /**
     * 任意的 404 响应都可能需要被替代为 index.html
     * 在开发单页应用时非常有用，它依赖于HTML5 history API
     */
    historyApiFallback: true,
    //  关闭 Host 检查，同网段其他设备，可通过内网 IP 访问本机服务（需要配合 host: '0.0.0.0'）使用
    disableHostCheck: true,
    // 模块热更新，取决于HotModuleReplacementPlugin
    hot: true,
    host: config.dev.host,
    port: config.dev.port,
    // 自动打开浏览器
    open: true,
    /**
     * 推荐使用模块热替换的内联模式
     * 因为它包含来自 websocket 的 HMR 触发器。轮询模式可以作为替代方案
     * 但需要一个额外的入口点
     */
    inline: true,
    // 编译报错时候展示
    overlay: {
      warnings: true,
      errors: true
    },
    // 请求代理服务
    proxy: {
      '/api': {
        // 这里改为项目后端 API 接口 Host
        target: 'http://localhost:3000',
        // 支持跨域调用
        changeOrigin: true,
        // 代理websocket
        ws: true,
        // // 如果你不想始终传递 /api ，则需要重写路径
        // pathRewrite: {"^/api" : ""},
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ]
  }
}

module.exports = webpackMerge(devConfig, baseConfig);
