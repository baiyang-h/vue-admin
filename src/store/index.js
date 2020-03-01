import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'


Vue.use(Vuex)

// https://webpack.docschina.org/guides/dependency-management/#require-context   webpack的内置方法
const modulesFiles = require.context('./modules', true, /\.js$/);



const modules = {}

export default new Vuex.Store({
  modules,
  getters
})
