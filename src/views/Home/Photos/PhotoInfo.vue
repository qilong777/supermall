<template>
  <div class="photo-info">
    <h3 class="info-title">{{ photoInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoInfo.add_time | dateFormat}}</span>
      <span>点击次数:{{photoInfo.click}}次</span>
    </p>
    <hr />
    <!-- 缩略图 -->
    <vue-preview :slides="list"></vue-preview>
    <!-- <img
      :src="item.src"
      class="preview-img"
      v-for="(item,index) in list"
      height="100"
      @click="$preview.open(index,list)"
      :key="item.src"
    />-->

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoInfo.content"></div>

    <!-- 评论子组件 -->
    <comment v-show="photoInfo.title" :id="id" />
  </div>
</template>
<script>
import comment from "@/components/Comment";
export default {
  name: "PhotoInfo",
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      list: [] //缩略图数字
    };
  },
  methods: {
    getPhotoInfo() {
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.axios({
        method: "get",
        url: `/api/getimageinfo/${this.id}`
      })
        .then(res => {
          const data = res.data;
          this.$indicator.close();
          if (data.status === 0) {
            this.photoInfo = data.message[0];
          } else {
            this.$toast("图片详情加载失败");
          }
        })
        .catch(err => {
          this.$toast("图片详情加载失败");
        });
    },
    //获取缩略图
    getThumbNail() {
      this.axios({
        method: "get",
        url: `/api/getthumimages/${this.id}`
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          data.message.forEach(ele => {
            ele.w = 600;
            ele.h = 400;
            ele.msrc = ele.src;
          });
          this.list = data.message;
        } else {
          this.$toast("缩略图获取失败");
        }
      });
    }
  },
  components: {
    comment
  },
  created() {
    this.$store.commit("CHANGETITLE", "图片详情");
    this.getPhotoInfo();
    this.getThumbNail();
  }
};
</script>
<style lang='scss'>
.photo-info {
  padding: 5px;
  .info-title {
    color: #26a2ff;
    font-size: 14px;
    text-align: center;
    margin: 15px;
    font-weight: 600;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    font-size: 12px;
  }
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    figure {
      width: 75px;
      height: 75px;
      margin: 5px;
      box-shadow: 0 0 5px #424242;
      img {
        width: 75px;
        height: 75px;
      }
    }
  }
  .content {
    font-size: 12px;
    line-height: 24px;
  }
}
</style>