<template>
  <div class="relative w-full mx-4 mt-1" v-if="state">
    <input
      type="text"
      placeholder="Search news..."
      class="w-full p-2 rounded border-1 border-gray-400 placeholder-slate-700 focus:outline-none focus:border-1 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-gray-800"
      v-model="text"
      @keyup.enter="search(text)"
    />
    <button
      class="absolute top-[.25rem] right-[.625rem]"
      v-if="show"
      @click="closeInput"
    >
      <XCircleIcon class="fill-red-600 w-8 h-8" />
    </button>
  </div>
</template>

<script setup>
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { ref, watch } from "vue";

import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const state = computed(() => store.state.input);

const text = ref("");
const show = ref(false);

const closeInput = () => store.commit("openInput");
const search = async (keyword) => await store.dispatch("searchNews", keyword);

watch(text, (newText, oldText) => (show.value = newText !== ""));
</script>
