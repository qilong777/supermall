<template>
  <div class="photo-list">
    <!-- 分类滑动区 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in category"
            :key="item.id"
            @tap.prevent="getImgListById(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
    <ul class="img-list">
      <router-link
        tag="li"
        class="img-item"
        v-for="item in list"
        :key="item.id"
        :to="'/home/photoInfo/' + item.id"
      >
        <img v-lazy="item.img_url" />
        <div class="info">
          <h3 class="info-title">{{item.title}}</h3>
          <p class="info-body">{{item.zhaiyao}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "@/assets/js/mui.min.js";
export default {
  name: "PhotoList",
  data() {
    return {
      //分类
      category: [],
      //图表列表
      list: []
    };
  },
  methods: {
    getAllCategory() {
      this.axios({
        method: "get",
        url: "/api/getimgcategory"
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          this.category = data.message;
          this.category.unshift({ title: "全部", id: 0 });
        } else {
          this.$toast("类别获取失败!");
        }
      });
    },
    getImgListById(id) {
      this.list = [];
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.axios({
        method: "get",
        url: `/api/getimages/${id}`
      }).then(res => {
        const data = res.data;
        this.$indicator.close();
        if (data.status === 0) {
          this.list = data.message;
          if (this.list.length == 0) {
            this.$toast("没有对应的图片");
          }
        } else {
          this.$toast("图片获取失败!");
        }
      });
    }
  },
  created() {
    this.$store.commit("CHANGETITLE", "图片列表");
    this.getAllCategory();
    this.getImgListById(0);
    this.$nextTick(() => {
      mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005
        //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    });
  }
};
</script>

<style lang='scss' scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  .mui-slider {
    flex-shrink: 0;
    box-shadow: 0px 1px 3px #ccc;
    .mui-scroll-wrapper {
      overflow: auto;
    }
  }

  .img-list {
    flex-grow: 1;
    padding: 10px;
    overflow: auto;
    .img-item {
      position: relative;
      margin-bottom: 10px;
      box-shadow: 0px 0px 5px #424242;
      text-align: center;
      background-color: #ccc;
      img {
        width: 100%;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
      }
      .info {
        position: absolute;
        bottom: 0;
        padding: 5px;
        max-height: 84px;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        text-align: left;
        overflow: hidden;
        line-height: 16px;
        .info-title {
          font-size: 14px;
          font-weight: 600;
        }
        .info-body {
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
}
</style>