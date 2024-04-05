<template>
  <div class="relative w-full h-full">
    <span
      v-for="index in 5"
      class="absolute top-[60%] right-1/2 w-5 h-5 bg-blue-500 rounded-full animate-[loading_1s_linear_infinite]"
      :style="{ ...position(index), ...delay(index) }"
    ></span>
  </div>
</template>

<script setup>
const position = (index) => {
  const angle = (index / 5) * 2 * Math.PI;
  const x = 40 * Math.cos(angle);
  const y = 40 * Math.sin(angle);
  return { transform: `translateX(${x}px) translateY(${y}px)` };
};

const delay = (index) => {
  const second = index === 4 ? "0s" : `0.${4 - index}s`;
  return { "animation-delay": second };
};
</script>
