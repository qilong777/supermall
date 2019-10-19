<template>
  <div id="app">
    <mt-header fixed title="首页"></mt-header>
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>

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
  }
};
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
  padding-top: 45px;
  padding-bottom: 50px;
  overflow-x: hidden;
  .mint-header {
    height: 45px;
  }
  .mui-bar {
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
