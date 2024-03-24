<template>
  <div
    class="absolute top-6 right-0 z-10 p-1 w-[4.375rem] bg-[#f9f9f9] rounded"
  >
    <button
      @click="
        store.commit('openAlert', {
          state: true,
          msg: 'Ini tombol detail',
        })
      "
      class="w-full text-left text-sm text-red-300 hover:text-red-500"
    >
      Detail
    </button>
    <button
      @click="
        store.commit('openAlert', {
          state: true,
          msg: 'Ini tombol summary',
        })
      "
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

const store = useStore();
</script>
