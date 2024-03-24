<template>
  <Alert v-if="store.state.alert.state" />
  <Box />
  <FlyingButton />
</template>

<script setup>
import { useStore } from "vuex";
import Alert from "./alert/Alert.vue";
import FlyingButton from "./button/FlyingButton.vue";
import Box from "./container/Box.vue";

const store = useStore();

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "history-alert")
    store.commit("openAlert", { state: true, msg: message.msg });
});
</script>
