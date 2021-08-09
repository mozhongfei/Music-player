<template>
  <div class="square">
    <div class="square-top">
      <div class="left">
        <img src="~assets/img/login/箭头.svg" alt="" @click="back" />
        <span>歌单广场</span>
      </div>
    </div>

    <div class="tar-bar">
      <span
        v-for="(item, index) in sort"
        :key="index"
        :class="{ active: count == item }"
        @click="clickCount(item)"
        >{{ item }}</span
      >
    </div>

    <scroll
      :class="['playlist-content', { btm: fShow }]"
      :probe-type="3"
      ref="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <keep-alive>
        <router-view
          :showcommend="showcommend"
          @ImgLoaded="ImgLoaded"
        ></router-view>
      </keep-alive>

      <div class="foot" v-show="footShow">暂无更多歌单</div>
    </scroll>
  </div>
</template>

<script>
import { highQuality, playlist, personalized } from "network/square";
import { debounce } from "common/utils";
import Scroll from "components/common/scroll/Scroll.vue";
import { Toast } from "vant";
export default {
  name: "listSquare",
  data() {
    return {
      sort: ["推荐", "精品", "流行", "华语", "欧美"], //标签
      count: "推荐", //选中的标签
      setdata: {
        //精品歌单
        // cat: "全部",
        before: 0,
        limit: 90,
      },
      setplay: {
        // 歌单
        cat: "华语",
        limit: 90,
        offset: 0,
        order: "'new'",
      },
      recommend: [],
      showcommend: [],
      fShow: false,
      refresh: {},
      footShow: false,
    };
  },
  methods: {
    back() {
      this.$router.push("/home");
    },
    clickCount(i) {
      (this.recommend = []), (this.showcommend = []), (this.count = i);
      this.selection(i);
      Toast.loading({ message: "加载中...", forbidClick: true });
    },
    ImgLoaded() {
      this.refresh()
    },
    loadMore() {
      if (this.count != "推荐" && this.recommend.length == 0) {
        if (this.count == "精品") {
          this.gethighQuality(this.setdata);
        } else {
          this.getplaylist(this.setplay);
        }
      } else {
        this.showcommend.push(...this.recommend.splice(0, 30));
        // this.refresh();
      }
    },
    selection(i) {
      if (i == "推荐") {
        this.$router
          .replace({ path: "/listSquare/RecommendList", query: { type: i } })
          .catch((err) => {});
        this.getpersonalized();
      } else if (i == "精品") {
        this.$router
          .replace({ path: "/listSquare/boutique", query: { type: i } })
          .catch((err) => {});
        this.setdata.before = 0;
        this.gethighQuality(this.setdata);
      } else {
        this.setplay.cat = i;
        this.setplay.offset = 0;
        this.$router
          .replace({ path: "/listSquare/choiceness", query: { type: i } })
          .catch((err) => {});
        this.getplaylist(this.setplay);
      }
    },
    pullup() {
      this.$refs.scroll.fetchData();
      this.$refs.scroll.finishPullUp();
      Toast.clear();
    },
    getpersonalized() {
      personalized(100).then((res) => {
        this.recommend = res.result;
        this.showcommend.push(...this.recommend.splice(0, 30));
        //   console.log(this.showcommend);
        
      });
    },
    gethighQuality(data) {
      highQuality(data).then((res) => {
        // console.log(res);
        if (res.more) {
          this.setdata.before = res.lasttime;
          this.recommend = res.playlists;
          this.showcommend.push(...this.recommend.splice(0, 30));
        } else {
          this.footShow = true;
        }
        this.refresh();
      });
    },
    getplaylist(data) {
      playlist(data).then((res) => {
        // console.log(res);
        if (res.more) {
          this.setplay.offset += this.setplay.limit;
          this.recommend = res.playlists;
          this.showcommend.push(...this.recommend.splice(0, 30));
        } else {
          this.footShow = true;
        }
        this.refresh();
      });
    },
  },
  created() {
    this.refresh = debounce(this.pullup, 500);
    this.count = this.$route.query.type;
    this.selection(this.count);
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
.square-top {
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
  justify-content: space-evenly;
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

.playlist-content {
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
.foot {
  font-size: 14px;
  text-align: center;
  height: 30px;
}
</style>
