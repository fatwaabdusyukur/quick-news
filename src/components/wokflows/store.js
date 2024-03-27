import CNN from "@/services/cnn";
import { getRecommendations } from "@/services/recommendation";
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      open: false,
      input: false,
      popovers: false,
      alert: { state: false, msg: "" },
      modal: { state: false, summary: "" },
      category: 0,
      loading: true,
      news: [],
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
    openAlert(state, value) {
      state.alert = value;
    },
    openModal(state, value) {
      state.modal = value;
    },
    setCategory(state, value) {
      state.category = value;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    fillNews(state, value) {
      state.news = value;
    },
  },
  actions: {
    async getNews({ commit }, category) {
      const cnn = new CNN();
      commit("setLoading", true);
      let newsData = [];
      try {
        switch (category) {
          case 0:
            newsData = await getRecommendations(cnn);
            break;
          case 1:
            newsData = await cnn.national_news();
            break;
          case 2:
            newsData = await cnn.international_news();
            break;
          case 3:
            newsData = await cnn.economy_news();
            break;
          case 4:
            newsData = await cnn.sports_news();
            break;
          case 5:
            newsData = await cnn.lifestyle_news();
            break;
          case 6:
            newsData = await cnn.technology_news();
            break;
          case 7:
            newsData = await cnn.entertaiment_news();
            break;
          default:
            newsData = await cnn.index();
            break;
        }
        commit("setLoading", false);
        commit("fillNews", newsData);
      } catch (e) {
        commit("setLoading", false);
        commit("openAlert", { state: true, msg: e.message });
      }
    },
    async searchNews({ commit }, keyword) {
      commit("setLoading", true);
      const cnn = new CNN();
      try {
        const result = await cnn.search(keyword);
        commit("setLoading", false);
        commit("fillNews", result);
      } catch (error) {
        commit("setLoading", false);
        commit("openAlert", { state: true, msg: e.message });
      }
    },
  },
});
