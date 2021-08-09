<template>
  <div class="shuffle" v-if="Object.keys(playitem).length !== 0">
    <div class="shuffle-title">
      <span>{{ playitem.uiElement.subTitle.title }}</span>
      <div class="shuffle-more">
        <van-icon name="replay" />
        <p>换一批</p>
      </div>
    </div>
    <scroll
      class="shuffle-content"
      :probe-type="3"
      :scrollX="true"
      :scrollY="false"
      @touchEnd="mouse11"
      @scroll="contentScroll"
      ref="scroll"
    >
      <div
        v-for="(item, index) in playitem.extInfo"
        :key="index"
        class="shuffle-item"
        ref="banner"
      >
        <div class="img1">
          <img
            v-lazy="item.resource.mlogBaseData.coverUrl"
            alt=""
            @load="ImgLoaded"
          />
        </div>
        <p>
          <span class="ico"></span
          >{{ item.resource.mlogExtVO.playCount | playCountFilter }}
        </p>
        <div class="bofang"><span></span></div>
        <div class="shuffle-desc">{{ item.resource.mlogBaseData.text }}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import { debounce } from "common/utils";

export default {
  name: "ShuffleMlog",
  data() {
    return {
      j: "",
      i: "",
      W: "",
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
  mounted() {
    this.scrollTo = debounce(this.$refs.scroll.scrollTo, 10);
  },
  methods: {
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
  components: {
    Scroll,
  },
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
.shuffle-title {
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
.shuffle-more {
  border: 1px solid #000;
  border-radius: 25px;
  padding: 0 5px;
  display: flex;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  height: 25px;
  .van-icon {
    vertical-align: text-top;
  }
}
.shuffle-item {
  width: 105px;
  height: 175px;
  display: inline-block;
  position: relative;
  margin: 0 0px 0 16px;
  font-size: 12px;
  vertical-align: text-top;
  &:last-child {
    margin-right: 16px;
  }
  .img1{
    width: 105px;
    height: 130px;
    border-radius: 10px;
    display: flex;
    background-color: #25280d;
    align-items: center;
    overflow: hidden;
  }
  img {
    width: 105px;
    height: auto;
  }
  .bofang {
    position: absolute;
    width: 30px;
    height: 30px;
    bottom: 52px;
    right: 6px;
    border-radius: 50%;
    background-color: rgba(225, 225, 225, 0.4);
    text-align: center;
    line-height: 3;
    span {
      width: 15px;
      height: 15px;
      display: inline-block;
      background: url("~assets/img/common/bofang02.svg") no-repeat 0 0 / cover;
    }
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
.shuffle-content {
  width: 375px;
  white-space: nowrap;
}
.shuffle-desc {
  white-space: normal;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.shuffle {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #fff;
  width: 375px;
}
</style>
