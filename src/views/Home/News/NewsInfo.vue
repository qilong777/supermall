<template>
  <div class="news-info">
    <!-- 大标题 -->
    <h2 class="title">{{newsInfo.title}}</h2>
    <!-- 子标题 -->
    <p class="sub-info">
      <span>发布时间:{{newsInfo.add_time | dateFormat}}</span>
      <span>点击次数:{{newsInfo.click}}</span>
    </p>
    <hr />
    <div class="news-content" v-html="newsInfo.content"></div>
    <comment v-show="newsInfo.title" :id="id"></comment>
  </div>
</template>

<script>
import comment from "@/components/Comment";
import { log } from "util";
export default {
  name: "newsInfo",
  data() {
    return {
      newsInfo: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    getNewsInfo() {
      this.axios({
        method: "get",
        url: "/api/getnew/" + this.id
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          this.newsInfo = data.message[0];
        } else {
          this.$toast("获取新闻详情失败！");
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("CHANGETITLE", "新闻详情");
    });
  },
  created() {
    this.getNewsInfo();
  },
  components: {
    comment
  }
};
</script>

<style lang="scss">
.news-info {
  padding: 0 5px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .sub-info {
    font-size: 13px;
    color: #226aff;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
  .news-content {
    img {
      width: 100%;
    }
  }
}
</style>