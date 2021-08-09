<template>
  <div>
    <div class="content-L">
      <div
        v-for="(item, index) in showcommend"
        :key="index"
        class="playlist-item"
        ref="banner"
        @click="songlist(item)"
      >
        <img v-lazy="item.coverImgUrl" alt="" @load="ImgLoaded" />
        <p><span class="ico"></span>{{ item.playCount | playCountFilter }}</p>
        <div class="playlist-desc">{{ item.name }}</div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "choiceness",
  data() {
    return {};
  },
  props: {
    showcommend: Array,
  },
  methods: {
    songlist(e) {
      if (e.specialType == 0 || e.specialType == 100) {
        this.$router.push({ path: "/songList", query: { id: e.id } });
      } else {
        console.log(e);
      }
    },
    ImgLoaded() {
      this.$emit("ImgLoaded");
    },
  },
  components: {},
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
.content-L {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
}
.playlist-item {
  width: 105px;
  display: inline-block;
  position: relative;
  margin: 8px 0px 8px 16px;
  font-size: 12px;
  vertical-align: text-top;
  img {
    width: 105px;
    height: 105px;
    border-radius: 10px;
  }
  .playlist-desc {
    /* 把盒子转成 弹性伸缩盒子 */
    display: -webkit-box;
    /* 文本的排列方向: 垂直排列 */
    -webkit-box-orient: vertical;
    /* 定义保留几行文本 */
    -webkit-line-clamp: 2;
    /* 溢出隐藏 */
    overflow: hidden;
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

</style>
