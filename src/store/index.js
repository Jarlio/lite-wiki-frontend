import Vuex from "vuex";
import axios from "axios";

export default Vuex.createStore({
  state: {
    tags: []
  },
  mutations: {
    setTags: (state, tags) => (state.tags = tags)
  },
  actions: {
    fetchTags({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BACKEND_API}/tag/all`)
          .then(response => {
            commit("setTags", response.data);
            resolve();
          });
      });
    }
  },
  modules: {},
  getters: {
    allTags: state => state.tags
  }
});
