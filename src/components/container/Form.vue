<template>
  <div
    class="relative rounded-[3px] border-1 border-black shadow-md p-2 w-96 mt-4 mx-auto bg-gray-100"
  >
    <div class="inline-flex items-center w-full gap-2 overflow-x-hidden">
      <label for="api" class="text-sm">API</label>
      <p
        class="text-[16px] text-gray-500 font-normal truncate"
        v-if="options.status"
      >
        {{ options.api }}
      </p>
      <input
        class="w-full p-1 rounded border-[1.5px] border-slate-900 placeholder-slate-700 focus:outline-none focus:border-1 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-gray-800"
        type="text"
        id="api"
        v-model="text"
        placeholder="API token from openai..."
        v-else
      />
    </div>
    <div class="inline-flex items-center w-full gap-2 mt-2">
      <label for="prompt" class="text-sm">Prompt</label>
      <input
        class="w-full p-1 rounded border-[1.5px] border-slate-900 placeholder-slate-700 focus:outline-none focus:border-1 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-gray-800"
        type="text"
        id="prompt"
        :value="options.prompt"
        disabled
        v-if="options.status"
      />
      <input
        class="w-full p-1 rounded border-[1.5px] border-slate-900 placeholder-slate-700 focus:outline-none focus:border-1 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-gray-800"
        type="text"
        id="prompt"
        v-model="questions"
        placeholder="Questions to ask..."
        v-else
      />
    </div>
    <div class="flex items-center gap-2" v-if="options.status">
      <CheckBadgeIcon class="w-5 h-5 fill-slate-900 mb-4" />
      <div class="inline-block">
        <h1 class="text-xl font-medium">Tier: {{ options.radio.tier }}</h1>
        <p class="text-sm font-light">
          RPM: {{ options.radio.rpm }} / RPD: {{ options.radio.rpd }} / TPM:
          {{ options.radio.tpm }}
        </p>
      </div>
    </div>
    <div class="flex flex-col justify-center mt-2" v-else>
      <div class="relative flex gap-2 items-center mb-2">
        <p class="text-gray-700 text-sm">Choice the tier of your API key</p>
        <ExclamationCircleIcon
          class="relative w-[20px] h-[20px] text-black"
          @mouseenter="store.commit('openTooltips', true)"
          @mouseleave="store.commit('openTooltips', false)"
        />
        <Tooltips />
      </div>
      <div
        v-for="{ id, label, RPM, RPD, TPM } in radio"
        class="inline-flex gap-2"
      >
        <div class="items-center">
          <input type="radio" name="tier" :id="id" class="mt-1"
          :value="concatString(label, RPM, RPD, TPM)" v-model="choice"
        </div>
        <div class="items-center">
          <label class="font-normal text-sm" :for="id">{{ label }}</label>
          <p class="text-gray-500 text-light text-xs">
            RPM: {{ RPM }} / RPD: {{ RPD }} / TPM: {{ TPM }}
          </p>
        </div>
      </div>
    </div>
    <button
      @click="removeOptions"
      class="w-full p-2 mx-2 mt-2 rounded bg-red-400 text-slate-900 hover:bg-red-600 hover:text-slate-50"
      v-if="options.status"
    >
      EDIT
    </button>
    <button
      @click="submitOptions(text, choice, questions)"
      class="w-full p-2 mx-2 mt-2 rounded bg-blue-400 text-slate-900 hover:bg-blue-600 hover:text-slate-50"
      v-else
    >
      SUBMIT
    </button>
  </div>
</template>

<script setup>
import Tooltips from "@/components/container/Tooltips.vue";
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const text = ref("");
const questions = ref("");
const choice = ref("");

const store = useStore();
const radio = computed(() => store.state.radio);
const options = computed(() => store.state.options);

const submitOptions = async (api, tier, ask) => {
  await store.dispatch("submitOptions", {
    api: api,
    choice: tier,
    questions: ask,
  });
  text.value = "";
  choice.value = "";
  questions.value = "";
};
const removeOptions = async () => await store.dispatch("removeOptions");
const concatString = (str1, str2, str3, str4) =>
  `${str1}:${str2}:${str3}:${str4}`;

onMounted(async () => await store.dispatch("checkOptions"));
</script>
