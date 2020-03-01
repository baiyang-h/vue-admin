import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES(state, routes) {
    // 权限路由
    state.addRoutes = routes;
    // 权限路由+默认显示的路由
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes;
      // 此处可进行权限判断，得到想要的路由
      // if(roles.includes('admin')) {
      //
      // }
      accessedRoutes = asyncRoutes || [];
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
