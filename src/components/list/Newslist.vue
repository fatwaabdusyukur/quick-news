<template>
  <ul class="w-full h-full py-2">
    <li
      class="relative w-full p-1 bg-[#ececec] rounded mx-1 my-2"
      v-for="{ title, link } in articles"
    >
      <p class="whitespace-nowrap overflow-x-hidden text-ellipsis text-lg">
        {{ title }}
      </p>
      <div
        class="absolute right-0 top-0 flex justify-center items-center w-[10%] h-full bg-[#ececec] rounded-r shadow-md"
      >
        <button>
          <EllipsisHorizontalIcon class="w-4 h-4 fill-black" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const articles = computed(() => store.state.news.data);
console.log(articles);
</script>
