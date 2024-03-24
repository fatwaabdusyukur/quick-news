<template>
  <div
    class="relative w-40 h-40 nth-child(1):delay-0"
    v-for="index in 5"
    :key="index"
    v-if="loading"
  >
    <div class="circle" :style="position(index)"></div>
  </div>
</template>

<script setup>
const props = defineProps({ loading: Boolean });

const position = (index) => {
  const angle = (index / 5) * 2 * Math.PI;
  const x = 40 * Math.cos(angle);
  const y = 40 * Math.sin(angle);
  return { transform: `translateX(${x}px) translateY(${y}px)` };
};
</script>
