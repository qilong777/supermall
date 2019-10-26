<template>
  <div class="shop-car">
    <!-- 商品列表 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item,index) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <!-- 切换选择按钮 -->
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="changeSelected(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h3>{{item.title}}</h3>
              <div class="info-bottom">
                <span class="price">￥{{item.sell_price}}</span>
                <div class="mui-numbox" data-numbox-min="1" data-numbox-max>
                  <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                  <input
                    class="mui-input-numbox"
                    type="number"
                    :value="count(index,item.id)"
                    @change="changeShopCar(item.id,$event)"
                  />
                  <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                </div>
                <a @click.prevent="deleteShopCar(index,item.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner total">
          <div class="left">
            <p>总计(不含运费))</p>
            <p>
              以勾选商品
              <span class="red">{{$store.getters.getGoodsCountAndTotal.count}}</span> 件，总价:￥
              <span class="red">{{$store.getters.getGoodsCountAndTotal.total}}</span> 元
            </p>
          </div>
          <mt-button type="danger">结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mui from "@/assets/js/mui.min.js";
export default {
  name: "ShopCar",
  data() {
    return {
      goodsList: []
    };
  },
  computed: {
    count() {
      return (index, id) => {
        return this.$store.state.shopCar[index][id];
      };
    }
  },
  methods: {
    //获取购物商品列表
    getGoodsList() {
      let idStr = this.$store.state.shopCar
        .map(ele => {
          return ele.id;
        })
        .join(",");
      if (idStr == "") {
        return;
      }

      this.axios({
        method: "get",
        url: `/api/goods/getshopcarlist/${idStr}`
      }).then(res => {
        const data = res.data;
        if (data.status === 0) {
          this.goodsList = data.message;
          this.$nextTick(() => {
            mui(".mui-numbox").numbox();
          });
        } else {
          this.$toast("数据请求失败");
        }
      });
    },
    //修改商品购买数量
    changeShopCar(id, e) {
      let count = parseInt(e.target.value) || 1;
      this.$store.commit("CHANGECOUNT", {
        id,
        count
      });
    },
    //修改商品选中状态
    changeSelected(id, selected) {
      this.$store.commit("CHANGESELECTED", {
        id,
        selected
      });
    },
    //删除购物车商品
    deleteShopCar(index, id) {
      this.goodsList.splice(index, 1);
      this.$store.commit("DELETESHOPCAR", id);
    }
  },
  created() {
    this.getGoodsList();
    this.$store.commit("CHANGETITLE", "购物车");
  }
};
</script>

<style lang="scss" scoped>
.shop-car {
  background-color: #eee;
  min-height: 100%;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100px;
      img {
        width: 60px;
        height: 60px;
      }
      h3 {
        font-size: 12px;
        font-weight: 600;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 200px;
        height: 60px;
        .price {
          font-size: 12px;
          color: #f40;
          font-weight: 600;
        }
        .mui-numbox {
          height: 30px;
        }
        .info-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: #f40;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>