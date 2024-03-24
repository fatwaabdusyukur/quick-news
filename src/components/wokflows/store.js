import CNN from "@/services/cnn";
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      open: false,
      input: false,
      popovers: false,
      cnn: new CNN(),
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
