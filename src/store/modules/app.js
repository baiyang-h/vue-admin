const state = {
  // 侧边栏 伸缩状态，默认展开
  sidebar: {
    opened: true
  }
};
const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar.opened = !state.sidebar.opened;
  }
};
const actions = {
  // 点击菜单伸缩按钮，切换菜单伸缩
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
