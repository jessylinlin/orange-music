<template>
  <div>{{ state.count }} * 2 = {{ double }}</div>
  <div>{{ num }}</div>
  <button @click="add">Add</button>
</template>
<script>
import { reactive, computed, ref } from "vue";
export default {
  name: "Button",
  setup () {
    const state = reactive({
      count: 1,
    });
    const num = ref(2);
    function add () {
      state.count++;
      num.value += 10;
    }
    const double = computed(() => state.count * 2);
    return {
      state,
      double,
      num,
      add,
    };
  },
};
</script>
<style scoped>
</style>
