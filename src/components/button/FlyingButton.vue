<template>
  <button
    class="fixed right-6 bottom-[0.625rem] p-2 w-10 h-10 rounded-full bg-[#7bb4e3] flex justify-center items-center hover:bg-[#4e97d1]"
    @click="changeImage"
  >
    <img
      class="w-5 h-5"
      :class="{ 'animate-[turn_1.5s_linear_forwards]': turn }"
      alt="logo app"
      :src="image"
    />
  </button>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const turn = ref(true);
const image = ref(getImageFromUrl("/img/logo.png"));

function getImageFromUrl(path) {
  return chrome.runtime.getURL(path);
}

function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = (error) => reject(error);
    img.src = path;
  });
}

function changeImage() {
  store.commit("openBox");
  turn.value = false;

  loadImage(image.value)
    .then(() => {
      image.value =
        image.value === getImageFromUrl("/img/logo.png")
          ? getImageFromUrl("/img/close.png")
          : getImageFromUrl("/img/logo.png");

      turn.value = true;
    })
    .catch((e) => console.error("Error when getting image for button: " + e));
}
</script>
