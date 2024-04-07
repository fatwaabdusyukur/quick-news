<template>
  <div
    v-if="status"
    class="w-[25rem] absolute -top-[3.3rem] left-1 bg-gray-800 rounded-xl p-3 flex items-center justify-between after:absolute after:-bottom-[10px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0 after:border-x-[.625rem] after:border-t-[.625rem] after:border-l-transparent after:border-r-transparent after:border-t-gray-800"
  >
    <p class="text-[10px] text-white w-full text-center">
      RPM (Request Per Minute) / RPD (Request Per Day) / TPM (Token Per Minute)
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const status = computed(() => store.state.tooltips);
</script>
