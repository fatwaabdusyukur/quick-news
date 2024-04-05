<template>
  <div
    v-if="state"
    class="fixed z-50 top-3 right-1/2 py-2 px-3 rounded bg-red-300 border-2 border-red-500 inline-flex justify-between items-center"
  >
    <ExclamationTriangleIcon class="w-4 h-4 fill-gray-900 mr-1" />
    <p class="font-light text-gray-900 text-center text-sm">{{ msg }}</p>
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
  setTimeout(() => store.commit("openAlert", { state: false, msg: "" }), 1200)
);
</script>
