<template>
  <div class="home">
    <home-nar-bar class="home-nar"></home-nar-bar>
    <scroll
      class="home-content"
      :probe-type="3"
      ref="scroll"
      @scroll="contentScroll"
      :bounce="false"
    >
      <div ref="load">
        <home-swiper :banners="banners" />
        <recommend :recommends="recommends" />
        <playlist :playlists="playlists" @homeImgLoaded="ImageLoaded" />
      </div>
      <div v-show="load" class="loadMore">
        <img src="~assets/img/home/jia.gif" alt="" />
        <span>加载中...</span>
      </div>
      <div class="footer" v-show="footShow"></div>
    </scroll>
  </div>
</template>

<script>
import HomeNarBar from "./childComps/HomeNarBar.vue";
import HomeSwiper from "./childComps/HomeSwiper.vue";
import Recommend from "./childComps/Recommend.vue";
import playlist from "./childComps/playlist.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import { debounce } from "common/utils";
import { getHome, getHomeBanner, getHomeBall } from "network/home";
import { Toast } from "vant";

export default {
  name: "home",
  data() {
    return {
      banners: [], // 轮播数据
      refresh: {}, // scroll重新计算高度函数
      finishPullUp: {}, // 上拉加载完成函数
      recommends: [], // 导航数据
      playlists: [], //显示的数据
      blocks: [], //请求的全部数据
      getplayList: {}, //上拉加载执行函数
      once: true, //保证一开始能拿到数据
      isCom: true, // 保证加载时的函数只执行一次
      footShow: true,
      detailCloud: '',  //云贝数据
    };
  },
  methods: {
    fShow(e) {
      if (!e.length) {
        this.footShow = false;
      }
    },
    ImageLoaded() {
      //加载完一张图片重新计算滚动区域高度
      this.refresh();
    },
    contentScroll(position) {
      if (
        -position.y > this.$refs.load.offsetHeight - 540 &&
        this.isCom &&
        this.blocks
      ) {
        // console.log(11);
        this.isCom = false;
        setTimeout(() => {
          this.getplayList();
          this.$refs.scroll.fetchData();
          this.isCom = true;
        }, 3000);
      }
    },
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.fetchData, 500)
  },
  watch: {
    blocks() {
      if (this.once) {
        this.getplayList();
        this.once = false;
      }
    },
    // playlists: {
    //   handler(newN) {
    //   },
    //   immediate: true,
    //   deep: true,
    // },
  },
  computed: {
    load() {
      //加载时显示加载中
      return this.blocks.length;
    },
  },
  components: {
    HomeNarBar,
    HomeSwiper,
    Recommend,
    playlist,
    Scroll,
  },
  created() {
    // 获取首页轮播数据
    getHomeBanner().then((res) => {
      this.banners = res.banners;
      // console.log(this.banners);
    });
    // 获取首页圆形图标数据
    getHomeBall().then((res) => {
      this.recommends = res.data;
      // console.log(this.recommends);
    });
    // 获取首页内容数据
    getHome().then((res) => {
      this.blocks = res.data.blocks;
      // 寻找"SLIDE_SINGLE_SONG"下标
      const SINGLE = this.blocks.findIndex(
        (e) => e.showType == "SLIDE_SINGLE_SONG"
      );
      // 加入vueX
      this.$store.commit("add_count", res.data.blocks[SINGLE]);
      this.detailCloud = res.data.blocks[SINGLE]   
      // 删除类型"SLIDE_SINGLE_SONG"的数据
      this.blocks.splice(SINGLE, 1);
      const BANNER = this.blocks.findIndex((e) => e.showType == "BANNER");
      this.blocks.splice(BANNER, 1);
      // console.log(this.blocks);
    });
    // 每次页面显示多三个内容
    this.getplayList = () => {
      if (this.blocks.length) {
        this.playlists.push(...this.blocks.splice(0, 3));
      }
    };
  },
};
</script>

<style scoped lang="less">
.home {
  height: 100vh;
}
.home-nar {
  background-color: #fff;
}
.home-content {
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
  background-color: #eee;
}
.loadMore {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
  img {
    width: 50px;
    height: 50px;
  }
}
.footer {
  width: 100%;
  height: 45px;
}
</style>
