<template>
  <div class="member">member</div>
</template>

<script>
export default {
  name: "Member",
  created() {
    this.$store.commit("CHANGETITLE", "会员");
  }
};
</script>

<style lang="scss" scoped>
</style>