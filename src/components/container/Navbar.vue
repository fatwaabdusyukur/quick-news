<template>
  <div class="bg-[hsl(0,0%,100%)] w-full py-2 pl-5 flex items-center gap-2">
    <img :src="img" alt="Logo" class="w-[1.125rem] h-[1.125rem]" />
    <h1 class="text-bold text-lg text-gray-800">QUICK NEWS</h1>
  </div>
  <div
    class="bg-blue-300 w-full h-24 py-2 pl-5 inline-flex justify-center flex-col gap-2"
  >
    <h1 class="text-medium text-3xl text-gray-800">Extension Settings</h1>
    <p class="text-sm font-light">
      API key bisa didapatkan di openai.com baik berbayar maupun gratis!
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const img = computed(() => store.state.logo);
</script>
