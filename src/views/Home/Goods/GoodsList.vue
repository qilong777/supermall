<template>
  <div class="goods-list">
    <router-link
      :to="'/home/goodsInfo/'+item.id"
      tag="div"
      class="goods-item"
      v-for="item in goodsList"
      :key="item.id"
    >
      <div class="img-box">
        <img v-lazy="item.img_url" />
      </div>

      <h3 class="title">{{item.title}}</h3>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link>
    <mt-button v-show="goodsList.length>0" type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      pageIndex: 1,
      goodsList: []
    };
  },
  methods: {
    getGoodsList() {
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.axios({
        method: "get",
        url: `/api/getgoods/?pageindex=${this.pageIndex}`
      }).then(res => {
        this.$indicator.close();
        const data = res.data;
        if (data.status === 0) {
          if (data.message.length == 0) {
            this.$toast("没有更多商品数据了");
            return;
          }
          this.goodsList.push(...data.message);
        } else {
          this.$toast("商品加载失败!");
        }
      });
    },
    getMore() {
      this.pageIndex++;
      this.getGoodsList();
    }
  },
  created() {
    this.$store.commit("CHANGETITLE", "商品列表");
    this.getGoodsList();
  }
};
</script>

<style lang='scss' scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 7px;
  .goods-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-height: 293px;
    width: 49%;
    border: 1px solid #ccc; /* no */
    box-shadow: 0 0 5px #ccc; /* no */
    margin-bottom: 5px;
    padding: 2px;
    .img-box {
      width: 100%;
      min-height: 150px;
      background-color: #ccc;
      text-align: center;
      img {
        width: 100%;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 200px;
      }
    }

    .title {
      font-size: 14px;
      font-weight: 600;
    }
    .info {
      background-color: #eee;
      width: 100%;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: #f40;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>