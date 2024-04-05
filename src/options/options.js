import "@/assets/css/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import store from "@/components/wokflows/store";

createApp(App).use(store).mount("#app");
