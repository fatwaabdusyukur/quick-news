<template>
  <ul class="w-full h-full py-2">
    <li
      class="relative w-full p-1 bg-gray-100 rounded mx-1 my-2"
      v-for="({ title, link }, index) in articles"
    >
      <p
        class="font-nunito whitespace-nowrap overflow-x-hidden text-ellipsis text-lg"
      >
        {{ title }}
      </p>
      <div
        class="absolute right-0 top-0 flex justify-center items-center w-[10%] h-full bg-gray-100 rounded-r shadow-md"
      >
        <button
          class="w-full h-full inline-flex justify-center items-center"
          @click="openDropdown(index)"
          :data-index="index"
        >
          <EllipsisHorizontalIcon class="w-4 h-4 fill-black" />
        </button>
        <Dropdown v-if="active === index" :link="link" />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Dropdown from "../container/Dropdown.vue";

const store = useStore();
const articles = computed(() => store.state.news);
const active = ref(null);
const openDropdown = (index) =>
  (active.value = active.value === index ? null : index);
</script>
