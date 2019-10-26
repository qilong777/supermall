<template>
  <div class="goods-comment">
    <comment :id="$route.params.id" />
  </div>
</template>

<script>
import comment from "@/components/Comment";
export default {
  name: "",
  data() {
    return {};
  },
  components: {
    comment
  },
  created() {
    this.$store.commit("CHANGETITLE", "商品评论");
  }
};
</script>

<style lang='scss' scoped>
.goods-comment {
  padding: 5px;
}
</style>