<template>
  <Transition>
    <div
      v-if="state"
      class="fixed z-10 top-0 right-0 w-full h-full overflow-auto bg-black/50 flex justify-center items-center"
    >
      <div
        class="w-[30rem] h-[27rem] p-5 bg-[#fefefe] border-1 border-gray-700"
      >
        <div class="py-2 text-center border-1 border-b-gray-900">
          <h1 class="font-roboto text-xl">Summary News</h1>
        </div>
        <div class="p-3 h-3/4">
          <div class="overflow-y-auto h-full max-h-[calc(100%-10px)]">
            <p class="font-roboto text-sm">{{ summary }}</p>
          </div>
        </div>
        <div class="p-3 border-1 border-t-gray-900 text-center">
          <button
            @click="store.commit('openModal', { state: false, summary: '' })"
            class="px-3 py-2 bg-red-600 border-1 border-red-900 text-slate-900 hover:bg-red-400 hover:text-slate-950"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
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
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const state = computed(() => store.state.modal.state);
const summary = computed(() => store.state.modal.summary);
</script>
