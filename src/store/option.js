export default {
  namespaced: true,
  state: {
    visibleSidebar: true,
  },
  mutations: {
    SHOW_SIDEBAR(state, status) {
      state.visibleSidebar = status;
    },
  },
};
