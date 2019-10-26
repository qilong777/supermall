import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: "",
    shopCar: JSON.parse(localStorage.getItem("shopCar")) || []
  },
  mutations: {
    //标题修改
    CHANGETITLE(state, title) {
      state.title = title;
    },
    //历史纪录长度修改
    //加入购物车
    ADDTOSHOPCAR(state, goodsInfo) {
      const index = state.shopCar.findIndex(ele => ele.id == goodsInfo.id)
      if (index != -1) {
        state.shopCar[index][state.shopCar[index].id] += goodsInfo[goodsInfo.id];
      } else {
        state.shopCar.push(goodsInfo);
      }
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    },

    //改变商品购买数量
    CHANGECOUNT(state, payload) {
      const { id, count } = payload;
      const index = state.shopCar.findIndex(ele => ele.id == id)
      state.shopCar[index][state.shopCar[index].id] = count;
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    },

    //改变商品选中状态
    CHANGESELECTED(state, payload) {
      const { id, selected } = payload;
      const index = state.shopCar.findIndex(ele => ele.id == id)
      state.shopCar[index].selected = selected;
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    },

    //删除购物车商品
    DELETESHOPCAR(state, id) {
      const index = state.shopCar.findIndex(ele => ele.id == id);
      state.shopCar.splice(index, 1);
      localStorage.setItem("shopCar", JSON.stringify(state.shopCar));
    }
  },
  getters: {
    getGoodsSelected(state) {
      var o = {};
      state.shopCar.forEach(ele => {
        o[ele.id] = ele.selected;
      });
      return o;
    },
    getGoodsCountAndTotal(state) {
      var o = {
        count: 0,
        total: 0
      }
      state.shopCar.forEach(ele => {
        if (ele.selected) {
          o.count += ele[ele.id];
          o.total += ele.price * ele[ele.id];
        }
      })
      return o;
    }
  },
  //处理异步操作
  actions: {
  },
  modules: {
  }
})
