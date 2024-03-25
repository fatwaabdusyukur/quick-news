<template>
  <Popovers />
  <Transition>
    <div
      class="fixed right-[4.375rem] bottom-[.625rem] w-[18.75rem] h-[21.875rem] rounded bg-[#f9f9f9] shadow-md overflow-hidden"
      v-if="open"
    >
      <div
        class="relative p-[.625rem] bg-[#7bb4e3] rounded-t-[.25rem] flex flex-col items-center"
      >
        <div class="flex justify-between items-center w-full">
          <div class="flex justify-between items-center basis-[30%]">
            <button @click="() => store.commit('openPopovers')">
              <ArrowLeftOnRectangleIcon
                class="w-[1.4rem] h-[1.4rem] text-[#e0d7f9] hover:text-blue-300 stroke-2"
              />
            </button>
            <button @click="() => store.commit('openInput')">
              <MagnifyingGlassIcon
                class="w-[1.4rem] h-[1.4rem] text-[#e0d7f9] hover:text-blue-300 stroke-2"
              />
            </button>
            <button>
              <Cog6ToothIcon
                class="w-[1.4rem] h-[1.4rem] text-[#e0d7f9] hover:text-blue-300 stroke-2"
              />
            </button>
          </div>
          <h1 class="font-marcellus text-2xl text-gray-200 justify-self-end">
            Quick News
          </h1>
        </div>
        <SearchInput />
      </div>
      <div
        class="px-2 overflow-y-auto overscroll-contain w-full h-full max-h-[calc(100% - 40px)] flex justify-center items-center"
      >
        <Loading v-if="loading" />
        <Newslist v-else />
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
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";
import Popovers from "../container/Popovers.vue";
import SearchInput from "../input/SearchInput.vue";
import Loading from "../loading/Loading.vue";

import { computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

import Newslist from "../list/Newslist.vue";

const store = useStore();
const open = computed(() => store.state.open);
const category = computed(() => store.state.category);
const loading = computed(() => store.state.loading);

onMounted(async () => await store.dispatch("getNews", category));
watch(
  category,
  async (newCat, oldCat) => await store.dispatch("getNews", newCat)
);
</script>
