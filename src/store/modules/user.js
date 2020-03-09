import { request_login, request_getInfo } from '@/api/user'
import { Message } from 'element-ui';
import { getToken, setToken, removeToken } from '@/utils/token'
import { resetRouter } from '@/router'


const state = {
  token: getToken(),
  roles: [],
  admin: {}
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ADMIN: (state, admin) => {
    state.admin = admin
  }
};
const actions = {
  // 登录获取token
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      request_login({ username, password }).then(res => {
        const { data } = res;
        if(data.success) {
          commit('SET_TOKEN', data.data.token);
          setToken(data.data.token);
          resolve()
        } else {
          Message.error(data.message);
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登录
  logout({ commit, dispatch }) {
    return new Promise(resolve => {
      // 清空 用户信息
      dispatch('resetToken');
      // 清空 路由信息
      commit('permission/REMOVE_ROUTES', null, {root: true});
      // 重置路由
      resetRouter();

      resolve();
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      request_getInfo(state.token).then(res => {
        const data = res.data;
        if(data.success) {
          commit('SET_ROLES', data.data.roles);
          commit('SET_ADMIN', data.data);
          resolve(data.data.roles)
        } else {
          Message.error(data.message);
        }
      }) .catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      commit('SET_ADMIN', []);
      removeToken();
      resolve();
    })
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
