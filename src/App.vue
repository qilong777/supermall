<template>
  <div id="app">
    <mt-header fixed :title="title"></mt-header>
    <main>
      <transition>
        <router-view></router-view>
      </transition>
    </main>

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
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
    return {};
  },
  computed: {
    title() {
      return this.$store.state.title;
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
  }
  main {
    flex: 1;
    overflow: auto;
  }
  .mui-bar {
    position: relative;
    flex-shrink: 0;
    box-shadow: 0 -1px 5px -3px rgb(100, 100, 100); /*no*/
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
