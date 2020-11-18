/*
 * @Descripttion: 
 * @Author: cross.Carol
 * @Date: 2020-11-18 16:40:50
 * @LastEditors: cross.Carol
 * @LastEditTime: 2020-11-18 16:40:50
 */
 const path = require('path');
 module.exports = {
    dev: {
      env: require('./dev.env'),
      host: 'localhost',
      port: 8080,
      assetsRoot: path.resolve(__dirname, '../dist'),
      assetsPublicPath: '/',
    },
    prod: {
      env: require('./prod.env'),
      assetsRoot: path.resolve(__dirname, '../dist'),
      assetsPublicPath: '/',
    }
 }