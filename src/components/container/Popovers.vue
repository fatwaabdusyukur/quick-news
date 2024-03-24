<template>
  <div
    v-if="show"
    class="absolute p-2 w-52 z-10 bg-[#f9f9f9] rounded border-1 border-gray-400 shadow-md right-[24.7rem] bottom-44 after:content-[''] after:absolute after:top-[10%] after:-right-[17.5px] after:w-0 after:h-0 after:border-x-[.625rem] after:border-x-transparent after:border-b-[.94rem] after:border-b-[#f9f9f9] after:rotate-90 before:content-[''] before:absolute before:top-[10%] before:-right-[20.5px] before:w-0 before:h-0 before:border-x-[.69rem] before:border-x-transparent before:border-b-[1rem] before:border-b-[#e3e3e3] before:rotate-90"
  >
    <ul v-for="({ text, icon }, index) in contents">
      <li>
        <button
          class="inline-flex w-full justify-between"
          @click="changeCategory(index)"
        >
          <p :class="{ 'text-blue-400': active === index }">{{ text }}</p>
          <component
            :is="icon"
            class="w-4 h-4"
            :class="{
              'fill-blue-400': active === index,
              'fill-gray-800': active !== index,
            }"
          />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  FilmIcon,
  FlagIcon,
  GlobeAltIcon,
  HandThumbUpIcon,
  ShoppingCartIcon,
  TrophyIcon,
} from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const show = computed(() => store.state.popovers && store.state.open);
const active = ref(0);

const contents = [
  { text: "Berita Rekomendasi", icon: HandThumbUpIcon },
  { text: "Berita Nasional", icon: FlagIcon },
  { text: "Berita Internasional", icon: GlobeAltIcon },
  { text: "Berita Ekonomi", icon: CurrencyDollarIcon },
  { text: "Berita  Olahraga", icon: TrophyIcon },
  { text: "Berita Gaya Hidup", icon: ShoppingCartIcon },
  { text: "Berita Teknologi", icon: ComputerDesktopIcon },
  { text: "Berita Hiburan", icon: FilmIcon },
];

function changeCategory(index) {
  store.commit("setCategory", index);
  active.value = index;
}
</script>
