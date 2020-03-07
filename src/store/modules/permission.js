import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(roles, route) {
  if(route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if(hasPermission(roles, tmp)) {
      if(tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  });
  return res
}

const state = {
  // 所有路由
  routes: [],
  // 有权限判断部分的路由
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
      // 此处可进行权限判断，得到想要的路由。 超级管理员可以得到所有权限，其他登录人员相关有权限的部分可进入
      if(roles.includes('admin')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
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
