<template>
  <Alert />
  <Modal />
  <Box />
  <FlyingButton />
</template>

<script setup>
import Alert from "./alert/Alert.vue";
import FlyingButton from "./button/FlyingButton.vue";
import Box from "./container/Box.vue";
import Modal from "./container/Modal.vue";

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "history-alert")
    store.commit("openAlert", { state: true, msg: message.msg });
});
</script>
