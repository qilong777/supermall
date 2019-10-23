<template>
  <div class="home">
    <mt-swipe class="mt-swipe" :auto="4000" :prevent="true">
      <mt-swipe-item v-for="item in imgs" :key="item.id">
        <img :src="item.img" />
      </mt-swipe-item>
    </mt-swipe>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="@/assets/images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home">
          <img src="@/assets/images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home">
          <img src="@/assets/images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home">
          <img src="@/assets/images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home">
          <img src="@/assets/images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home">
          <img src="@/assets/images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "Home",
  data() {
    return {
      imgs: []
    };
  },
  methods: {
    getLunBo() {
      this.axios({
        method: "get",
        url: "/api/getlunbo"
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          this.imgs = data.message;
        } else {
          this.$toast("轮播图数据出错");
        }
      });
    }
  },
  created() {
    this.getLunBo();
  },
  activated() {
    this.$store.commit("CHANGETITLE", "首页");
  }
};
</script>

<style lang="scss" scoped>
.home {
  // height: 100%;
  // overflow: auto;
  .mt-swipe {
    height: 200px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    li {
      border: none;
      img {
        height: 60px;
        width: 60px;
      }
      .mui-media-body {
        font-size: 14px;
      }
    }
  }
}
</style>