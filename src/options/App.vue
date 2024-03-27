<template>
  <div class="bg-[#fefefe] w-full py-2 pl-5 flex items-center gap-2">
    <img :src="img" alt="Logo" class="w-[1.125rem] h-[1.125rem]" />
    <h1 class="text-bold text-lg text-gray-800">QUICK NEWS</h1>
  </div>
  <div
    class="bg-blue-300 w-full h-24 py-2 pl-5 inline-flex justify-center flex-col gap-2"
  >
    <h1 class="text-medium text-3xl text-gray-800">Extension Settings</h1>
    <p class="text-sm font-light">
      API key bisa didapatkan di openai.com baik berbayar maupun gratis!
    </p>
  </div>
  <div class="w-full mt-5 flex justify-center">
    <div class="flex items-center w-[40%] gap-2">
      <label for="api" class="text-lg">API</label>
      <input
        type="text"
        class="basis-3/4 p-2 rounded border-2 border-blue-400 placeholder-slate-700 focus:outline-none focus:border-1 focus:border-gray-800 focus:ring-2 focus:ring-gray-800 text-gray-700"
        placeholder="API keys..."
      />
    </div>
  </div>
</template>

<script setup>
const img = chrome.runtime.getURL("/img/logo.png");
</script>
