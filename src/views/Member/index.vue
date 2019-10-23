<template>
  <div class="member">member</div>
</template>

<script>
export default {
  name: "Member",
  activated() {
    this.$store.commit("CHANGETITLE", "会员");
  }
};
</script>

<style lang="scss" scoped>
</style>