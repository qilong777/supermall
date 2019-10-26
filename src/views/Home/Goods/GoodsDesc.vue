<template>
  <div class="goods-desc">
    <h3>{{info.title}}</h3>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      info: {}
    };
  },
  methods: {
    getGoodsInfo() {
      this.axios({
        method: "get",
        url: `/api/goods/getdesc/${this.$route.params.id}`
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          this.info = data.message[0];
        } else {
          this.$toast("数据加载失败");
        }
      });
    }
  },
  created() {
    this.$store.commit("CHANGETITLE", "商品介绍");
    this.getGoodsInfo();
  }
};
</script>

<style lang='scss'>
.goods-desc {
  padding: 5px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>