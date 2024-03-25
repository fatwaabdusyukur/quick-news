<template>
  <Transition>
    <div
      v-if="store.state.modal"
      class="fixed z-10 top-0 right-0 w-full h-full overflow-auto bg-black/50 flex justify-center items-center"
    >
      <div
        class="w-[30rem] h-[27rem] p-5 bg-[#fefefe] border-1 border-gray-700"
      >
        <div class="py-2 text-center border-1 border-b-gray-900">
          <h1 class="font-roboto text-xl">Summary News</h1>
        </div>
        <div class="p-3 h-3/4">
          <div class="overflow-y-auto h-full max-h-[calc(100%-10px)]">
            <p class="font-roboto text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              ab natus quod quisquam suscipit vero eum, itaque vitae sapiente
              iusto exercitationem totam. Laudantium excepturi possimus ipsa,
              dicta eligendi provident officiis perferendis aliquam hic nisi,
              distinctio soluta labore cupiditate, voluptatem quibusdam magni
              praesentium tempora voluptatibus commodi expedita blanditiis
              iusto! Officia perferendis quae maxime vitae ea dolorem ratione
              molestiae commodi, provident sint soluta aperiam, est cupiditate
              sunt accusantium nemo quos quibusdam ipsa cum cumque, ipsam sequi
              quas! In accusantium, consequatur saepe error eum officiis
              perspiciatis nihil vitae eligendi ad quos doloribus? Ex ad ipsum
              necessitatibus facere quae corporis dignissimos consectetur
              repudiandae aspernatur fugiat error obcaecati nam culpa temporibus
              nihil aliquam, incidunt quod? Iusto suscipit at, iste placeat
              impedit possimus eveniet obcaecati quam accusamus a molestiae,
              cupiditate qui. Incidunt iusto possimus tempora hic quasi? Ipsum,
              et expedita necessitatibus natus soluta ratione nostrum ullam
              quisquam illum non consequatur magnam voluptate aliquam maxime
              impedit id velit nam exercitationem. Veritatis in suscipit, ipsum
              molestiae veniam magnam aut quos, quod cupiditate libero totam
              distinctio inventore earum, vel vitae error quia vero ut
              laboriosam nesciunt reiciendis fugiat ullam sit et? Veritatis
              culpa mollitia ut dolores ipsa voluptate facilis aliquid est
              aspernatur, nulla earum eos dolore laborum aperiam illo?
            </p>
          </div>
        </div>
        <div class="p-3 border-1 border-t-gray-900 text-center">
          <button
            @click="store.commit('openModal')"
            class="px-3 py-2 bg-red-600 border-1 border-red-900 text-slate-900 hover:bg-red-400 hover:text-slate-950"
          >
            Close
          </button>
        </div>
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
import { useStore } from "vuex";

const store = useStore();
</script>
