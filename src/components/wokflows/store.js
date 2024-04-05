import CNN from "@/services/cnn";
import { getRecommendations } from "@/services/recommendation";
import { removeDataFromStorage, setDataToStorage } from "@/services/storage";
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
      flyingImg: chrome.runtime.getURL("/img/logo.png"),
      turn: false,
      radio: [
        { id: "free", label: "FREE", RPM: 200, RPD: 3, TPM: 40000 },
        { id: "tier1", label: "TIER 1", RPM: 3500, RPD: 10000, TPM: 60000 },
        {
          id: "tier2",
          label: "TIER 2",
          RPM: 3500,
          RPD: "Unlimited",
          TPM: 80000,
        },
        {
          id: "tier3",
          label: "TIER 3",
          RPM: 3500,
          RPD: "Unlimited",
          TPM: 160000,
        },
        {
          id: "tier4",
          label: "TIER 4",
          RPM: 10000,
          RPD: "Unlimited",
          TPM: 1000000,
        },
        {
          id: "tier5",
          label: "TIER 5",
          RPM: 10000,
          RPD: "Unlimited",
          TPM: 2000000,
        },
      ],
      news: [],
      logo: chrome.runtime.getURL("/img/logo.png"),
      closeImg: chrome.runtime.getURL("/img/close.png"),
      options: { status: false, api: "", radio: {} },
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
    setTurn(state, value) {
      state.turn = value;
    },
    setImg(state) {
      state.flyingImg =
        state.flyingImg === state.logo ? state.closeImg : state.logo;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    fillNews(state, value) {
      state.news = value;
    },
    setOptions(state, value) {
      state.options = value;
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
    async submitOptions({ commit }, options) {
      const { api, choice } = options;
      if (api !== "" && choice !== "") {
        const [tier, RPM, RPD, TPM] = choice.split(":");
        await setDataToStorage("api", api);
        commit("setOptions", {
          status: true,
          api: api,
          radio: { tier: tier, rpm: RPM, rpd: RPD, tpm: TPM },
        });
      } else {
        commit("openAlert", { state: true, msg: "Please fill the form!!!" });
      }
    },
    async removeOptions({ commit }) {
      await removeDataFromStorage("api");
      commit("setOptions", { status: false, api: "", radio: {} });
    },
    async changeFlyingImg({ commit }) {
      commit("setTurn", true);
      setTimeout(() => {
        commit("setImg");
        commit("setTurn", false);
      }, 1400);
    },
  },
});
