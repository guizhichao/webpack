const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = require('../config'); // 基础配置

const ENV = process.env.NODE_ENV || 'development';
const devMode = ENV === 'development';

module.exports = {
  // 开发模式/生产模式
  mode: devMode ? "development" : "production",
  // 此选项控制是否生成，以及如何生成 source map 为源文件
  devtool: devMode ? "#source-map" : "inline-source-map",
  // 模块如何被解析
  resolve: {
    // 自动解析确定的扩展
    extensions: ['.tsx', '.ts', '.js', '.json'],
    // 模块路径映射
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  // 项目主入口
  entry: './src/index.tsx',
  // 出口
  output: {
    /**
     * 所有输出文件的目标路径
     * 必须是绝对路径（使用 Node.js 的 path 模块）
     */
    path: devMode ?  config.dev.assetsRoot :  config.prod.assetsRoot,
    // 输出解析文件的目录，url 相对于 HTML 页面
    publicPath: devMode ? config.dev.assetsPublicPath : config.prod.assetsPublicPath,
    // 文件名,不加hash,以方便调试时使用，生产环境下可以设置为 [name]-bundle-[hash:8].js
    filename: `js/[name]${devMode ? '' : '-bundle-[hash:8]'}.js`,
  },
  // 关于模块配置 (配置 loader、解析器等选项)
  module: {
    // 尽可能使用 module.rules，因为这样可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader", // 源文件
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader", // 解析ts，tsx
      },
    ]
  },
  // 插件列表
  plugins: [
    // 生成html文件
    new HtmlWebpackPlugin({
      title: 'React + Typescript + webpack',
      template: './index.html',
      inject: false,
    }),
    // 编译时(compile time)插件
    new webpack.DefinePlugin({
      'process.env': devMode ? config.dev.env : config.prod.env
    }),
  ],
  // // 代理
  // devServer: {
  //   contentBase: path.join(__dirname, "dist"),
  //   compress: true,
  //   port: 9000
  // }

}
