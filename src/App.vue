<template>
  <div id="app">
    <mt-header fixed :title="title">
      <a slot="left" v-if="isShow">
        <mt-button icon="back" @click="goBack()">返回</mt-button>
      </a>
    </mt-header>
    <main>
      <transition>
        <router-view></router-view>
      </transition>
    </main>

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item1" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{carCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item1" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      carCount: 0
    };
  },
  computed: {
    title() {
      return this.$store.state.title;
    },
    isShow() {
      return this.$store.state.historyLength > 1;
    }
  },
  methods: {
    goBack() {
      this.$store.commit("CHANGELENGTH", -2);
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  height: 100%;
  flex-direction: column;
  // padding-top: 45px;
  // padding-bottom: 50px;
  overflow-x: hidden;

  .mint-header {
    position: relative;
    height: 45px;
    flex-shrink: 0;
    font-size: 20px;
    .mint-button {
      font-size: 14px;
    }
  }
  main {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .mui-bar {
    position: relative;
    flex-shrink: 0;
    box-shadow: 0 -1px 5px -3px rgb(100, 100, 100); /*no*/
    .mui-tab-item1.mui-active {
      color: #007aff;
    }
    .mui-tab-item1 {
      display: table-cell;
      overflow: hidden;
      width: 1%;
      height: 1.333333rem;
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #929292;
      .mui-icon {
        top: 0.08rem;
        width: 0.64rem;
        height: 0.64rem;
        padding-top: 0;
        padding-bottom: 0;
        & ~ .mui-tab-label {
          font-size: 0.293333rem;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  position: absolute;
  transition: all 0.5s;
}
</style>
