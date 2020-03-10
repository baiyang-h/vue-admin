const state = {
  cachedViews: []
};

const mutations = {
  ADD_CACHED_VIEW(state, route) {
    for(let item of state.cachedViews) {
      if(item.name === route.name) {
        return
      }
    }
    state.cachedViews.push(route);
  }
};

const actions = {
  addView({ commit }, route) {
    commit('ADD_CACHED_VIEW', route)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
