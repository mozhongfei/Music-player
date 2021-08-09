<template>
  <div class="playlist" v-if="Object.keys(playitem).length !== 0">
    <div class="playlist-title">
      <span>{{ playitem.uiElement.subTitle.title }}</span>
      <div class="playlist-more" @click="gosquare">
        <p>{{ playitem.uiElement.button.text }}</p>
        <van-icon name="arrow" />
      </div>
    </div>
    <scroll
      class="playlist-content"
      :probe-type="3"
      :scrollX="true"
      @touchEnd="mouse11"
      @scroll="contentScroll"
      :ck="false"
      ref="scroll"
    >
      <div
        v-for="(item, index) in playitem.creatives"
        :key="index"
        class="playlist-item"
        ref="banner"
        @click="songlist(item)"
      >
        <img v-lazy="item.uiElement.image.imageUrl" alt="" @load="ImgLoaded" />
        <p><span class="ico"></span>{{ playCount(index) | playCountFilter }}</p>
        <div class="playlist-desc">{{ item.uiElement.mainTitle.title }}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import { debounce } from "common/utils";

export default {
  name: "playlist",
  data() {
    return {
      j: "",
      i: "",
      X: "",
      scrollTo: {},
    };
  },
  props: {
    playitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    gosquare(){
      this.$router.push({path:"/listSquare", query:{type: '推荐'} })
    },
    // 到歌单页面
    songlist(e) {
      
      if (e.creativeType == 'voiceList') {
        console.log(e);
      }else{
        this.$router.push({path: '/songList', query: {id: e.creativeId }})
      }
      
    },
    playCount(i) {
      if (this.playitem.creatives[i].resources) {
        return this.playitem.creatives[i].resources[0].resourceExtInfo
          .playCount;
      } else if (this.playitem.creatives[i].creativeExtInfoVO) {
        return this.playitem.creatives[i].creativeExtInfoVO.playCount;
      }
    },
    ImgLoaded() {
      this.$emit("homeImgLoaded");
    },
    contentScroll(position) {
      // 获取移动的距离
      this.X = -position.x;
      // 移动距离跟内容的比值,方便下面的scrollTo函数使用
      this.i = parseInt(this.X / (this.$refs.banner[0].offsetWidth + 15));
      // 除去内容的还剩余的移动的距离
      this.j = parseInt(this.X % (this.$refs.banner[0].offsetWidth + 15));
      //  可视界面宽度
    },
    mouse11() {
      // 移动超过2分之1就展示下一个内容,365是内容的宽度包括外边距
      if (this.j > 61) {
        this.scrollTo(-(this.i + 1) * 121, 0, 500);
      } else if (this.X < 0) {
        this.scrollTo(0, 0, 500);
      } else {
        this.scrollTo(-(this.i * 121), 0, 500);
      }
    },
  },
  mounted() {
    this.scrollTo = debounce(this.$refs.scroll.scrollTo, 10);
  },
  components: {
    Scroll,
  },
  computed: {},
  filters: {
    playCountFilter: function (value) {
      if (value < 100000) return value;
      else if (value > 100000 && value < 100000000)
        return parseInt(value / 10000) + "万";
      return (value / 100000000).toFixed(1) + "亿";
    },
  },
};
</script>

<style scoped lang="less">
.playlist-title {
  display: flex;
  width: 335px;
  justify-content: space-between;
  height: 50px;
  margin: 0 16px;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: 600;
    color: #000;
  }
}
.playlist-more {
  border: 1px solid #000;
  border-radius: 25px;
  padding: 0 8px;
  display: flex;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  height: 25px;
  .van-icon {
    vertical-align: text-top;
  }
}
.playlist-item {
  width: 105px;
  display: inline-block;
  position: relative;
  margin: 0 0px 0 16px;
  font-size: 12px;
  vertical-align: text-top;
  &:last-child {
    margin-right: 16px;
  }
  img {
    width: 105px;
    height: 105px;
    border-radius: 10px;
  }

  p {
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: rgba(100, 100, 100, 0.5);
    color: #fff;
    padding: 0px 5px;
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    border-radius: 12px;
    .ico {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url("~assets/img/common/播放.svg") no-repeat 0 1px / cover;
    }
  }
}
.playlist-content {
  width: 375px;
  white-space: nowrap;
}
.playlist-desc {
  white-space: normal;
}
.playlist {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #fff;
  width: 375px;
}
</style>
