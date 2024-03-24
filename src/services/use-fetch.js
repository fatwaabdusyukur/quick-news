import { ref, watchEffect } from "vue";

export function useFetch(func) {
  const data = ref([]);
  const error = ref(null);
  const loading = ref(true);

  func
    .then((result) => {
      loading.value = false;
      data.value = result;
    })
    .catch((e) => {
      loading.value = false;
      error.value = e;
    });

  watchEffect(() => {
    func;
  });

  return { data: data, error: error, loading: loading };
}
