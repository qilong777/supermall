<template>
  <div class="comment">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容（做多150字）" maxlength="150"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <ul class="cmt-list">
      <li class="cmt-item" v-for="(item,index) in comments" :key="item.add_time">
        <h4 class="cmt-title">
          <span>第{{index+1}}楼</span>
          <span>用户:{{item.user_name}}</span>
          <span>发表时间:{{item.add_time | dateFormat}}</span>
        </h4>
        <p class="cmt-body">{{getContent(item.content)}}</p>
      </li>
    </ul>
    <mt-button type="danger" size="large" plain @click="getComments(++pageIndex)">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  name: "Comment",
  data() {
    return {
      pageIndex: 1,
      comments: []
    };
  },
  props: ["id"],
  methods: {
    getComments(pageIndex = 1) {
      this.axios({
        method: "get",
        url: `/api/getcomments/${this.id}?pageindex=${pageIndex}`
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          this.comments.push(...data.message);
        } else {
          this.$toast("获取评论失败!");
        }
      });
    },
    getContent(content) {
      return content === "undefined" || content == ""
        ? "此用户未发表评论内容"
        : content;
    }
  },
  created() {
    this.getComments();
  }
};
</script>
<style lang='scss' scoped>
.comment {
  h3 {
    font-size: 18px;
    font-weight: 600;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin-bottom: 5px;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      .cmt-title {
        background-color: #ccc;
        font-size: 13px;
        padding-left: 5px;
        line-height: 30px;
        span {
          margin-right: 5px;
        }
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
        color: #424242;
      }
    }
  }
}
</style>