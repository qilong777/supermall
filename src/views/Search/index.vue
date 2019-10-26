<template>
  <div class="search">search</div>
</template>

<script>
export default {
  name: "Search",
  created() {
    this.$store.commit("CHANGETITLE", "搜索");
  }
};
</script>

<style lang="scss" scoped>
</style>