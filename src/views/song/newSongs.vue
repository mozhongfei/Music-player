<template>
  <div class="newSongs">
    <div class="newSongs-top">
      <div class="left">
        <img src="~assets/img/login/箭头.svg" alt="" @click="back" />
        <span>最新音乐</span>
      </div>
    </div>

    <div class="tar-bar">
      <span
        v-for="(item, index) in sort"
        :key="index"
        :class="{ active: count == item.name }"
        @click="clickCount(item)"
        >{{ item.name }}</span
      >
    </div>

    <scroll
      :class="['newSongs-content', { btm: fShow }]"
      :probe-type="3"
      ref="scroll"
    >
      <keep-alive>
        <router-view :playitem="playitem" @ImgLoaded="ImgLoaded"></router-view>
      </keep-alive>
    </scroll>
  </div>
</template>

<script>
import { song } from "network/song";
import Scroll from "components/common/scroll/Scroll.vue";
import { debounce } from "common/utils";
import { Toast } from "vant";
export default {
  name: "newSongs",
  data() {
    return {
      sort: [
        { name: "推荐", type: 0 },
        { name: "华语", type: 7 },
        { name: "欧美", type: 96 },
        { name: "日本", type: 8 },
        { name: "韩国", type: 16 },
      ], //标签
      count: "推荐",
      fShow: false,
      playitem: [],
      refresh: Function,
      timer: 0,
    };
  },
  methods: {
    back() {
      this.$router.push("/home");
    },
    clickCount(e) {
      this.count = e.name;
      clearTimeout(this.timer);
      Toast.loading({ message: "加载中...", forbidClick: true });
      this.timer = setTimeout(() => {
        this.getsong(e.type);
      }, 2000);
    },
    getsong(type) {
      song(type).then((res) => {
        // console.log(res);
        this.playitem = res.data;
      });
    },
    ImgLoaded() {
      this.refresh();
    },
    pullup() {
      this.$refs.scroll.fetchData();
      Toast.clear();
    },
  },
  created() {
    this.getsong(0);
    this.refresh = debounce(this.pullup, 500);
    Toast.loading({ message: "加载中...", forbidClick: true });
  },
  components: {
    Scroll,
  },
  mounted() {
    this.$bus.$on("delDetail", () => {
      this.fShow = true;
      this.$nextTick(() => {
        this.$refs.scroll.fetchData();
      });
    });
  },
};
</script>

<style scoped lang="less">
.newSongs-top {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 25px;
    height: 25px;
  }
  .left {
    span {
      font-size: 20px;
      color: #000;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      position: relative;
      top: -5px;
      left: 20px;
    }
  }
}
.tar-bar {
  display: flex;
  font-size: 16px;
  justify-content: space-around;
}
.active {
  color: #000;
  display: inline-block;
  &::after {
    content: "";
    display: block;
    height: 5px;
    width: calc(100% + 6px);
    background-color: red;
    position: relative;
    top: -5px;
    left: -3px;
    border-radius: 5px;
    opacity: 0.5;
  }
}

.newSongs-content {
  position: absolute;
  top: 90px;
  bottom: 50px;
  right: 0;
  left: 0;
}
.btm {
  bottom: 0px;
}
/deep/.content {
  display: block;
}
</style>
