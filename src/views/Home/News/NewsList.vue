<template>
  <mt-loadmore class="newsList" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h2>{{item.title}}</h2>
            <p class="mui-ellipsis">
              <span>发表时间:{{item.add_time | dateFormat}}</span>
              <span>点击:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </mt-loadmore>
</template>

<script>
export default {
  name: "newsList",
  data() {
    return {
      newsList: [],
      allLoaded: true
    };
  },

  methods: {
    getNewsList(callback) {
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.axios({
        method: "get",
        url: "/api/getnewslist"
      }).then(res => {
        const data = res.data;
        this.$indicator.close();
        if (data.status === 0) {
          this.newsList = data.message;
          this.$refs.loadmore.onTopLoaded();
        } else {
          this.$toast("加载失败");
        }
      });
    },
    loadTop() {
      this.getNewsList();
    },
    loadBottom() {}
  },
  created() {
    this.$store.commit("CHANGETITLE", "新闻列表");
    this.getNewsList();
  }
};
</script>

<style lang="scss">
.newsList {
  min-height: 100%;
  // height: 100%;
  // overflow: auto;
  .mint-loadmore-text {
    font-size: 12px;
  }
  .mui-table-view {
    h2 {
      font-size: 14px;
    }
    .mui-ellipsis {
      color: #226aff;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>