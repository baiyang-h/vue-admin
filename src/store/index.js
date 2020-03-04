import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'


Vue.use(Vuex)

// https://webpack.docschina.org/guides/dependency-management/#require-context   webpack的内置方法
const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app' , 将路径转为一个该文件的文件名
  const moduleName = modulePath.replace(/\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  modules,
  getters
})
