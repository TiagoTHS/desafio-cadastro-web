import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
    },
  },
});

export default store;
