<template>
  <div></div>
</template>
<script>
export default {
  setup () {
    const isShowButton = ref(false);
    function showButton () {
      isShowButton.value = true;
    }
    return {
      isShowButton,
      showButton,
    };
  },
}
</script>
