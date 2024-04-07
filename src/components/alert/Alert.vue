<template>
  <div
    v-if="state"
    class="fixed z-50 top-5 left-2 rounded-lg bg-gray-50 shadow-lg w-52 break-words"
  >
    <div
      class="px-2 py-3 bg-red-400 text-gray-100 rounded-t-lg flex items-center gap-2"
    >
      <ExclamationTriangleIcon class="w-5 h-5 fill-gray-100 mr-1" />
      <h1 class="text-lg text-gray-100 font-roboto">Warning</h1>
    </div>
    <div class="p-5 text-pretty">
      <p class="text-sm font-light">{{ msg }}</p>
    </div>
  </div>
</template>

<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/24/solid";
import { computed, onUpdated } from "vue";
import { useStore } from "vuex";

const store = useStore();
const msg = computed(() => store.state.alert.msg);
const state = computed(() => store.state.alert.state);

onUpdated(() =>
  setTimeout(() => store.commit("openAlert", { state: false, msg: "" }), 3000)
);
</script>
