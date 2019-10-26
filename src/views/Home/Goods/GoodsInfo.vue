<template>
  <div class="goods-info">
    <!-- 商品轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe class="mt-swipe" :auto="4000" :prevent="true">
            <mt-swipe-item v-for="item in imageList" :key="item.src">
              <img :src="item.src" />
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            <span>
              市场价:
              <del>￥{{goodsInfo.market_price}}</del>
            </span>
            <span>
              销售价:
              <em class="now-price">￥{{goodsInfo.sell_price}}</em>
            </span>
          </p>
          <div class="buy-count">
            购买数量:
            <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="goodsInfo.stock_quantity">
              <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
              <input class="mui-input-numbox" type="number" value="1" ref="count" />
              <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
            </div>
          </div>

          <div class="btn">
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsInfo.goods_no}}</p>
          <p>库存情况:{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间:{{goodsInfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc()">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment()">商品评论</mt-button>
      </div>
    </div>

    <!-- 购物车小球 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballShow" ref="ball"></div>
    </transition>
  </div>
</template>

<script>
import mui from "@/assets/js/mui.min.js";
export default {
  name: "",

  data() {
    return {
      id: this.$route.params.id,
      imageList: [],
      goodsInfo: {},
      ballShow: false,
      selectedCount: 1
    };
  },

  methods: {
    getLunBo() {
      this.axios({
        method: "get",
        url: `/api/getthumimages/${this.id}`
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          this.imageList = data.message;
        } else {
          this.$toast("轮播图数据加载失败");
        }
      });
    },
    getGoodsInfo() {
      this.axios({
        method: "get",
        url: `/api/goods/getinfo/${this.id}`
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          this.goodsInfo = data.message[0];
        } else {
          this.$toast("商品数据加载失败!");
        }
      });
    },
    goDesc() {
      this.$router.push(`/home/goodsDesc/${this.id}`);
    },
    goComment() {
      this.$router.push(`/home/goodsComment/${this.id}`);
    },
    addToShopCar() {
      this.ballShow = true;
      this.selectedCount = this.$refs.count.value;
    },
    //小球动画
    beforeEnter(el) {
      const countPosition = this.$refs.count.getBoundingClientRect();
      el.style.top = countPosition.y + "px";
      el.style.left = countPosition.x + "px";
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      let x = badgePosition.x - ballPosition.x + "px";
      let y = badgePosition.y - ballPosition.y + "px";

      el.style.transform = `translate(${x}, ${y})`;
      el.style.transition = "all 1s cubic-bezier(.37,-0.72,.32,.63)";
      done();
    },
    afterEnter(el) {
      this.ballShow = false;
    }
  },

  watch: {
    goodsInfo(newVal) {
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal.stock_quantity);
    }
  },
  created() {
    this.$store.commit("CHANGETITLE", "商品详情");
    this.getLunBo();
    this.getGoodsInfo();
    this.$nextTick(() => {
      mui(".mui-numbox").numbox();
    });
  }
};
</script>

<style lang='scss' scoped>
.goods-info {
  // position: relative;
  min-height: 100%;
  background-color: #eee;
  overflow: hidden;
  .mt-swipe {
    height: 220px;
    width: 220px;
    margin: 0 auto;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .price {
    span {
      margin-right: 20px;
    }
    .now-price {
      font-size: 16px;
      color: #f40;
      font-weight: 600;
    }
  }
  .buy-count {
    margin-bottom: 10px;
  }
  .btn button {
    margin-right: 10px;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    position: absolute;
    z-index: 100;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #f40;
  }
}
</style>