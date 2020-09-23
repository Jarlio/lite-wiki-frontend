import Vuex from "vuex";

export default Vuex.createStore({
  state: {
    backendAPIDep: "not available yet",
    backendAPIDev: "http://localhost:3000",
    deployment: false
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    getBackendAPI: state =>
      state.deployment ? state.backendAPIDep : state.backendAPIDev
  }
});
