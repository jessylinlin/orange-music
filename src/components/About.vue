<template>
  <h1>{{ msg }}</h1>
  <el-button type="primary">element-plus按钮</el-button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      msg: "About Page",
    };
  },
  setup(props) {
    return {};
  },
});
</script>
