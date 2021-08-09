<template>
  <scroll
    class="playBanner-content"
    :probe-type="3"
    :scrollX="true"
    :scrollY="false"
    ref="scroll"
    :ck="false"
    @scroll="contentScroll"
    @touchEnd="mouse11"
  >
    <div
      v-for="item in creativeL"
      :key="item.resources[0].resourceId"
      class="playBanner-item"
      ref="banner"
    >
      <div
        class="playBanner-a"
        v-for="e in item.resources"
        :key="e.resourceId"
        @click="playSong(e)"
      >
        <img v-lazy="e.uiElement.image.imageUrl" alt="" @load="ImgLoaded" />
        <p
          class="play-icon"
          v-show="item.creativeType != 'NEW_ALBUM_HOMEPAGE'"
        ></p>
        <div class="playBanner-desc">
          <div class="playBanner-text">
            <span> {{ e.uiElement.mainTitle.title }}</span>
            <span
              class="textTitle"
              v-if="
                e.resourceExtInfo.songData &&
                e.resourceExtInfo.songData.alias[0]
              "
              >({{ e.resourceExtInfo.songData.alias[0] }})</span
            >
            <span style="margin: 2px 2px">-</span>
            <span
              class="small"
              v-for="(n, m) in e.resourceExtInfo.artists"
              :key="m"
              >{{ n.name }}</span
            >
          </div>
          <p v-if="e.uiElement.subTitle">{{ e.uiElement.subTitle.title }}</p>
        </div>
        <div
          class="play-song"
          v-if="showType == 'HOMEPAGE_SLIDE_SONGLIST_ALIGN'"
        ></div>
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import { debounce } from "common/utils";

export default {
  name: "Newsong",
  data() {
    return {
      refresh: {},
      scrollTo: {},
      j: "",
      i: "",
      W: "",
      X: "",
    };
  },
  props: {
    // 子项目里面的每一个内容
    creatives: {
      type: Array,
      default() {
        return [];
      },
    },
    showType: {
      type: String,
      default() {
        return "";
      },
    },
  },
  methods: {
    playSong(e) {
      // console.log(this.creativeL);
      if (e.resourceType == "song") {
        this.$bus.$emit("detailSong", this.creativeL, e.resourceId);
      }else if(e.resourceType == "album"){
          console.log(e);
          // this.$router.push({path: '/songList', query: {id: e.resourceId }})
      }
    },
    ImgLoaded() {
      this.refresh();
    },
    contentScroll(position) {
      // 获取移动的距离
      this.X = -position.x;
      // 移动距离跟内容的比值,方便下面的scrollTo函数使用
      this.i = parseInt(this.X / (this.$refs.banner[0].offsetWidth + 15));
      // 除去内容的还剩余的移动的距离
      this.j = parseInt(this.X % (this.$refs.banner[0].offsetWidth + 15));
      //  可视界面宽度
      this.W = document.documentElement.clientWidth;
    },
    mouse11() {
      // 移动超过2分之1就展示下一个内容,365是内容的宽度包括外边距
      if (this.j > this.W / 2) {
        this.scrollTo(-[(this.i + 1) * 365], 0, 500);
      } else if (this.X < 0) {
        this.scrollTo(0, 0, 500);
      } else {
        this.scrollTo(-(this.i * 365), 0, 500);
      }
    },
  },
  computed: {
    creativeL() {
      return this.creatives;
    },
  },
  mounted() {
    // 防抖,只需赋值一次,不能放在防止抖动的函数里面,不然会造成多次赋值,不能正确防抖
    this.refresh = debounce(this.$refs.scroll.fetchData, 500);
    this.scrollTo = debounce(this.$refs.scroll.scrollTo, 10);
  },
  components: {
    Scroll,
  },
};
</script>

<style scoped lang="less">
.playBanner-a {
  display: flex;
  margin: 10px 0;
  position: relative;
  img {
    width: 55px;
    height: 55px;
    border-radius: 8px;
    margin-right: 10px;
  }
  .play-song {
    width: 25px;
    height: 25px;
    top: 25%;
    right: 3%;
    position: absolute;
    background: url("~assets/img/common/play.svg") no-repeat 0 0 / cover;
  }
  .play-icon {
    width: 18px;
    height: 18px;
    top: 35%;
    left: 6%;
    position: absolute;
    background: url("~assets/img/common/bofang02.svg") no-repeat 0 0 / cover;
  }
  .playBanner-desc {
    font-size: 12px;
    height: 55px;
    width: 270px;
    display: flex;
    overflow: hidden;
    justify-content: center;
    flex-direction: column;
    border-bottom: 1px solid #999;
    div {
      span:first-child {
        font-size: 16px;
        margin-right: 5px;
        max-width: 215px;
      }
    }
    p,
    span {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .small {
      font-size: 12px;
      color: #999;
      margin-bottom: 1px;
      &::after {
        content: "/";
      }

      &:last-child::after {
        content: "";
      }
    }
    .textTitle {
      display: inline-block;
      max-width: 130px;
      margin-right: 5px;
      color: #999;
      font-size: 16px;
    }
  }
}
.playBanner-item {
  display: inline-block;
  margin: 0 15px;
  &:last-child {
    padding-right: 15px;
  }
}
/deep/.content {
  white-space: nowrap;
}
</style>
