<template>
  <Transition>
    <div
      class="fixed z-50 top-3 right-1/2 p-2 rounded"
      :class="background"
      v-if="state"
    >
      <p class="font-light text-gray-900 text-center">{{ msg }}</p>
    </div>
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.9s ease, transform 0.9s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const { state, msg, mode } = computed(() => store.state.alert);
const background = computed(() =>
  mode === "success"
    ? "bg-green-300 border-1 border-green-500"
    : "bg-red-300 border-1 border-red-500"
);

onMounted(() =>
  setTimeout(
    () => store.commit("openAlert", { state: false, msg: "", mode: "" }),
    1000
  )
);
</script>
