import "@/assets/css/index.css";
import store from "@/components/wokflows/store";
import { createApp } from "vue";
import App from "../components/App.vue";

const container = document.createElement("div");
container.id = "qn-extension-container";
document.body.appendChild(container);

createApp(App).use(store).mount("#qn-extension-container");
