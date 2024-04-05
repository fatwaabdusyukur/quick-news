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
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const turn = computed(() => store.state.turn);
const image = computed(() => store.state.flyingImg);

async function changeImage() {
  await store.dispatch("changeFlyingImg");
  store.commit("openBox");
}
</script>
