<template>
  <div>
    <div class="flash" @click="allPlay">
      <van-icon name="play-circle-o" size="25px" />
      <span>播放全部 ({{ playitem.length }})</span>
    </div>
    <div
      v-for="(item, index) in playitem"
      :key="index"
      class="playlist-item"
      @click="songlist(index)"
    >
      <img v-lazy="item.album.picUrl" alt="" @load="ImgLoaded" />

      <div class="play-text">
        <p class="title">{{ item.name }}</p>
        <div class="Introduction">
          <span class="songT">{{ item.album.company }}</span>
          <span class="sec">-</span>
          <p class="songN">
            <span v-for="(e, index) in item.album.artists" :key="index">{{
              e.name
            }}</span>
          </p>
        </div>
        <div class="play-song"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "choose",
  data() {
    return {
      ids: [],
    };
  },
  props: {
    playitem: Array,
  },
  methods: {
    allPlay() {
      this.$bus.$emit("songlist", this.ids, this.ids[0]);
    },
    ImgLoaded() {
      this.$emit("ImgLoaded");
    },
    songlist(i) {
      this.$bus.$emit("songlist", this.ids, this.ids[i]);
    },
  },
  components: {},
  watch: {
    playitem(newN) {
      // console.log(newN);
      newN.forEach((e) => {
        this.ids.push(e.id);
      });
      // console.log(this.ids);
    },
  },
};
</script>

<style scoped lang="less">
.playlist-item {
  padding: 0 0 0 16px;
  margin: 10px 0;
  height: 55px;
  display: flex;
  img {
    width: 55px;
    height: 55px;
    border-radius: 8px;
  }
  .play-text {
    margin: 0 16px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    position: relative;
    flex: 2;
    .title {
      max-width: 240px;
      color: #000;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .Introduction {
      display: flex;
      font-size: 14px;
      height: 20px;
      width: 240px;
      overflow: hidden;
      .songN {
        span {
          &::after {
            content: "/";
          }
          &:last-child::after {
            content: "";
          }
        }
      }
      .sec {
        margin: 0 5px;
      }
      .songT {
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.play-song {
  width: 25px;
  height: 25px;
  top: 10px;
  right: 5px;
  position: absolute;
  background: url("~assets/img/common/play.svg") no-repeat 0 0 / cover;
}
.flash {
  display: flex;
  align-items: center;
  padding: 15px 16px 14px 16px;
  span {
    font-size: 18px;
    color: #000;
    margin-left: 10px;
    vertical-align: top;
  }
}
</style>
