<template>
  <div class="absolute top-6 right-0 z-10 p-1 w-[4.375rem] bg-gray-200 rounded">
    <a
      class="w-full text-left text-sm text-red-300 hover:text-red-500 hover:no-underline"
      :href="link"
      target="_blank"
    >
      Detail
    </a>
    <button
      @click="getSummary(link)"
      class="w-full text-left text-sm text-green-300 hover:text-green-500"
    >
      Summary
    </button>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { useStore } from "vuex";

const props = defineProps({ link: String });
const store = useStore();

const getSummary = async (url) => await store.dispatch("getSummary", url);
</script>
