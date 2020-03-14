const state = {
  visitedViews: [],
  cachedViews: []
};

const mutations = {
  // 添加 visitedView
  ADD_VISITED_VIEW(state, view) {
    if(state.visitedViews.some(v => v.path === view.path)) return;
    state.visitedViews.push(view)
  },
  // 添加 cachedView
  ADD_CACHED_VIEW(state, view) {
    if(state.cachedViews.includes(view.name)) return;
    if(!(view.meta && view.meta.noCache)) {
      state.cachedViews.push(view.name)
    }
  },
  // 关闭 visitedView
  DEL_VISITED_VIEW(state, view) {
    for(let [i, v] of state.visitedViews.entries()) {
      if(v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break
      }
    }
  },
  // 关闭 cachedView
  DEL_CACHED_VIEW(state, view) {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  // 关闭其他 visitedViews,     保留 默认显示的tag、当前tag
  DEL_OTHERS_VISITED_VIEWS(state, view) {
    state.visitedViews = state.visitedViews.filter(v => v.meta && v.meta.affix || v.path === view.path)
  },
  // 关闭其他 cachedViews
  DEL_OTHERS_CACHED_VIEWS(state, view) {
    state.cachedViews = state.cachedViews.filter(name => view.name === name)
  },
  // 关闭所有visitedViews，只留下默认显示的
  DEL_ALL_VISITED_VIEWS(state) {
    state.visitedViews = state.visitedViews.filter(view => view.meta && view.meta.affix)
  },
  DEL_ALL_CACHED_VIEWS(state) {
    state.cachedViews = [];
  }
};

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  // 添加 visitedView
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  // 添加 cachedView
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  // 关闭 View
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view);
      dispatch('delCachedView', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  // 关闭 visitedView
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view);
      resolve([...state.visitedViews]);
    })
  },
  // 关闭 cachedView
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.cachedViews])
    })
  },
  // 关闭其他tags
  delOthersViews({ dispatch }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view);
      dispatch('delOthersCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      });
    })
  },
  // 关闭其他 visitedView tags
  delOthersVisitedViews({ commit }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...state.visitedViews]);
    })
  },
  // 关闭其他 cachedView tags
  delOthersCachedViews({ commit }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view);
      resolve([...state.cachedViews]);
    })
  },
  // 关闭所有
  delAllViews({ dispatch, state }) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews');
      dispatch('delAllCachedViews');
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS');
      resolve([...state.visitedViews]);
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS');
      resolve([...state.cachedViews]);
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
