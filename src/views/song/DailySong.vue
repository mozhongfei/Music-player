<template>
  <div class="daily">
    <div class="daily-top">
      <div class="left">
        <img src="~assets/img/login/箭头.svg" alt="" @click="back" />
        <span>每日推荐</span>
      </div>
    </div>
    <div class="flash" @click="allplay">
      <img src="~assets/img/search/播放.svg" alt="" />
      <span>播放全部</span>
    </div>

    <scroll
      :class="['daily-content', { btm: fShow }]"
      :probe-type="3"
      ref="scroll"
      :bounce="false"
    >
      <div
        v-for="(item, index) in songDetails"
        :key="index"
        class="playlist-item"
        @click="songlist(index)"
      >
        <img v-lazy="item.picUrl" alt="" @load="ImgLoaded" />

        <div class="play-text">
          <p class="title">{{ item.name }}</p>
          <div class="Introduction">
            <span class="songT">{{ item.song.album.company }}</span>
            <span class="sec">-</span>
            <p class="songN">
              <span v-for="(e, index) in item.song.artists" :key="index">{{
                e.name
              }}</span>
            </p>
          </div>
          <div class="play-song"></div>
        </div>
      </div>

      <div class="foot"></div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import { newsong, recommend } from "network/song";
import { debounce } from "common/utils";
import { Toast } from "vant";
export default {
  name: "DailySong",
  data() {
    return {
      fShow: false,
      isLogin: false,
      songDetails: [],
      refresh: "",
      ids:[],
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    songlist(i) {
         this.$bus.$emit("songlist", this.ids, this.ids[i]);
    },
    allplay() {
        this.$bus.$emit("songlist", this.ids, this.ids[0]);
    },
    ImgLoaded() {
      this.refresh();
    },
    getnewsong() {
      newsong().then((res) => {
        // console.log(res);
        this.songDetails = res.result.splice(86, 15);
        // console.log(this.songDetails);
      });
    },
    getrecommend() {
      recommend().then((res) => {
        // console.log(res);
        this.songDetails = res.result.splice(86, 15);
        // console.log(this.songDetails);
      });
    },
    pullup() {
      this.$refs.scroll.fetchData();
      Toast.clear();
    },
  },
  created() {
    this.isLogin = this.$store.state.user.isLogin;
    if (this.isLogin) {
      this.getrecommend();
    } else {
      this.getnewsong();
    }
    
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
    this.refresh = debounce(this.pullup, 500);
  },
  watch: {
    songDetails(newN) {
    //   console.log(newN);
      newN.forEach((e) => {
        this.ids.push(e.id);
      });
    //   console.log(this.ids);
    },
  },
};
</script>

<style scoped lang="less">
.daily-top {
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
.flash {
  display: flex;
  align-items: center;
  margin-left: 16px;

  img {
    width: 25px;
    height: 25px;
  }
  span {
    font-size: 18px;
    color: #000;
    margin-left: 10px;
    font-weight: 600;
    vertical-align: top;
  }
}
.playlist-item {
  padding: 0 0 0 16px;
  margin: 10px 0;
  display: flex;
  &:first-child {
    margin-top: 0;
  }
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
.daily-content {
  height: calc(100vh - 156px);
  width: 100%;
  margin-top: 16px;
}
.btm {
  height: calc(100vh - 100px);
}
/deep/.content {
  display: block;
}
.foot {
  height: 16px;
}
</style>
