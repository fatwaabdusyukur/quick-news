import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      open: false,
      input: false,
      popovers: false,
    };
  },
  mutations: {
    openBox(state) {
      state.open = !state.open;
    },
    openInput(state) {
      state.input = !state.input;
    },
    openPopovers(state) {
      state.popovers = !state.popovers;
    },
  },
});
