<template>
  <div class="player" v-if="Object.keys(songDetail).length !== 0">
    <div class="play-top">
      <van-icon name="arrow-down" color="#fff" size="25px" @click="back" />
      <div class="title">
        <h2>{{ songDetail.songName }}</h2>
        <h3>
          <span v-for="(key, index) in songDetail.ar" :key="index"
            >{{ key.name }}&nbsp;</span
          >
        </h3>
      </div>
      <img src="~assets/img/songlist/分 享1.svg" alt="" />
    </div>

    <div class="content">
      <div
        v-show="togglelyric == true"
        @click="togglelyric = false"
        :class="['img', 'play', { pause: iconplay }]"
      >
        <img :src="songDetail.al.picUrl" alt="" />
      </div>
      <div
        v-show="togglelyric != true"
        @click="togglelyric = true"
        class="lyrics"
      >
        <ul :style="{ top: lyricTop }">
          <li
            :class="{ con: currentRow == index }"
            v-for="(item, index) in lyric"
            :key="index"
            ref="lyric"
          >
            {{ item.text }}
          </li>
        </ul>
      </div>
    </div>

    <div class="comment" v-show="togglelyric">
      <div class="collect" @click="togglelike">
        <img
          src="~assets/img/songlist/喜欢 - 空 - 网易icon.svg"
          alt=""
          v-show="like"
        />
        <img
          src="~assets/img/songlist/喜欢 - 网易icon.svg"
          alt=""
          v-show="!like"
        />
      </div>
      <img src="~assets/img/songlist/下载 .svg" alt="" />
      <img src="~assets/img/songlist/唱片.svg" alt="" />
      <img src="~assets/img/songlist/评论.svg" alt="" @click="gotoreply" />
    </div>

    <div class="range">
      <div class="bar">
        <span class="timeLeft">{{ timeLeft | playerTime }}</span>
        <van-slider
          v-model="value"
          bar-height="4px"
          @input="lyricInput"
          @change="sliderchange"
          active-color="#ee0a24"
        >
          <template #button>
            <div class="custom-button"></div>
          </template>
        </van-slider>
        <span class="timeRight">{{ timeRight | playerTime }}</span>
      </div>
    </div>

    <div class="buttons">
      <div class="cycle" @click="change">
        <span v-show="tShow == 'cycle'"
          ><img src="~assets/img/songlist/循环播放 - 网易icon.svg" alt="" />
        </span>
        <span v-show="tShow == 'random'"
          ><img src="~assets/img/songlist/随机播放 - 网易icon.svg" alt="" />
        </span>
        <span v-show="tShow == 'single'"
          ><img src="~assets/img/songlist/单曲循环 - 网易icon.svg" alt="" />
        </span>
      </div>
      <img
        src="~assets/img/songlist/下一曲 - 网易icon.svg"
        alt=""
        @click="prevSong"
      />

      <div class="playAudio" @click="toggleplay">
        <img
          src="~assets/img/songlist/播放 - 网易icon.svg"
          alt=""
          v-show="!iconplay"
        />
        <img
          src="~assets/img/songlist/暂停 - 网易icon.svg"
          alt=""
          v-show="iconplay"
        />
      </div>

      <img
        src="~assets/img/songlist/上一曲 - 网易icon.svg"
        alt=""
        @click="nextSong"
      />
      <img
        src="~assets/img/songlist/菜单 - 网易icon.svg"
        alt=""
        @click="menu"
      />
    </div>
  </div>
</template>

<script>
import { SongDetail, getSongDetail, getLyric } from "network/play";
export default {
  name: "song",
  data() {
    return {
      songDetail: {}, // 歌曲详情
      togglelyric: true, // 歌词显示隐藏
      lyricTop: "185px",
      currentRow: 0, //歌词高亮
      lyric: [], //歌词
      iconplay: true, //暂停
      timeLeft: 0, // 左时间
      timeRight: 0, //右时间
      value: 0, // 播放进度
      tShow: "cycle", // 当前播放模式
      Model: ["cycle", "random", "single"], //播放模式
      like: true, //喜欢
      id: 0,
    };
  },
  props: {
    audioD: Function,
    toplay: Boolean,
    canplay: Number,
  },
  methods: {
    gotoreply() {
      this.$router.push({
        path: "/commentList",
        query: { id: this.songDetail.id, type: 0 },
      });
    },
    // 上一曲
    prevSong() {
      this.$bus.$emit("prevSong");
    },
    // 下一曲
    nextSong() {
      this.$bus.$emit("nextSong");
    },
    // 收藏
    togglelike() {
      this.like = !this.like;
    },
    // 打开菜单
    menu() {
      this.$bus.$emit("menu");
    },
    // 改变播放模式
    change() {
      let i = this.Model.findIndex((e) => e == this.tShow);
      if (i == this.Model.length - 1) {
        i = -1;
      }
      this.tShow = this.Model[i + 1];
      this.$emit("change", this.tShow);
    },
    // 返回上一页
    back() {
      this.$router.back();
    },
    //获取歌词
    getLyricFun() {
      getLyric(this.songDetail.id).then((res) => {
        // console.log(res);
        this.formatLyric(res.lrc.lyric);
      });
    },
    // 处理歌词结构
    formatLyric(text) {
      this.lyric = [];
      let arr = text.split("\n"); //把原歌曲字符串转歌词
      let row = arr.length; //获取数组长度
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //获取数据"[00:00.000] 作词 : 陈镇川"
        let temp_arr = temp_row.split("]"); //分成两个数组
        let lyrictext = temp_arr.pop(); //删除数组最后一个，返回数据
        temp_arr.forEach((element) => {
          let obj = {};
          // "[00:21.45" =>00:21.45
          let time_arr = element.substr(1, element.length - 1).split(":");
          let s = time_arr[0] * 60 + Math.ceil(time_arr[1]); //得到当前秒数
          obj.text = lyrictext;
          obj.time = s;
          if (lyrictext.length > 0) {
            this.lyric.push(obj); //每一行处理好数据放入数组中
          }
        });
      }
    },
    // 实时动态显示歌词变化
    lyricInput() {
      let duration = parseInt((this.audioD().duration * this.value) / 100);
      for (let i = 1; i < this.lyric.length - 1; i++) {
        let l = getComputedStyle(this.$refs.lyric[i]).height;
        l = l.slice(0, -2);
        if (
          duration >= this.lyric[i - 1].time &&
          duration <= this.lyric[i + 1].time
        ) {
          this.lyricTop = 210 - i * l + "px";
          this.currentRow = i; //歌词高亮
          break;
        }
      }
    },
    // 获取滚动条变化
    sliderchange() {
      let duration = (this.audioD().duration * this.value) / 100;
      this.timeLeft = duration; //修改页面数据
      this.audioD().currentTime = duration; //修改播放器时间
    },
    toggleplay() {
      this.iconplay = !this.iconplay; //切换按钮
      this.synchronize();
      this.$bus.$emit("toggleplay");
    },
    synchronize() {
      if (!this.iconplay) {
        clearInterval(this.clearset);
        this.clearset = setInterval(() => {
          let currentTime = this.audioD().currentTime; //实时变化时间
          let duration = this.audioD().duration; //歌总时间
          this.timeLeft = currentTime; //秒
          // 计算滚动条效果
          this.value = (currentTime / duration) * 100;
          this.$bus.$emit("tTime", this.value);
          if (this.value == 100) {
            clearInterval(this.clearset);
            this.iconplay = true;
          }
        }, 999);
      } else {
        clearInterval(this.clearset);
      }
    },

    getDetail(id) {
      getSongDetail(id).then((res) => {
        this.songDetail = new SongDetail(res.songs[0]);
        // console.log(this.songDetail);
      });
    },
  },
  components: {},
  created() {
    this.id = this.$route.query.id;
    this.getDetail(this.id);
    // 播放状态
    this.iconplay = !this.toplay;
    //执行
    this.synchronize();
    // 音乐播放器数据加载完，直接获取歌曲时间
    if (!this.timeRight) {
      if (this.audioD().src) {
        let duration = this.audioD().duration; //歌总时间
        this.timeRight = duration;
      } else {
        this.timeRight = 0;
      }
    }
  },
  mounted() {
    this.$bus.$on("changSong", (id) => {
      this.getDetail(id);
      this.value = 0;
      this.iconplay = false;
      this.synchronize();
    });
  },
  watch: {
    songDetail() {
      this.getLyricFun();
    },
    timeLeft() {
      for (let i = 0; i < this.lyric.length; i++) {
        // let l = this.$refs.lyric[i].clientHeight;
        let l = getComputedStyle(this.$refs.lyric[i]).height;
        l = l.slice(0, -2);
        if (parseInt(this.timeLeft) == this.lyric[i].time) {
          this.lyricTop = 210 - i * l + "px";
          this.currentRow = i; //歌词高亮
          break;
        }
      }
    },
    canplay(newN) {
      this.timeRight = newN;
    },
    // value(){

    // }
  },
  filters: {
    playerTime(data) {
      let m = parseInt(data / 60); // 分钟
      let s = parseInt(data % 60); // 秒
      if (m == 0 && s == 0) {
        return "0:00";
      } else {
        return m + ":" + (s < 10 ? "0" + s : s);
      }
    },
  },
};
</script>

<style scoped lang="less">
.player {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #817c7a;
  z-index: 900;
}
.play-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  img {
    width: 25px;
    height: 25px;
  }
}
.title {
  text-align: center;
  color: #fff;
  h2 {
    font-size: 16px;
    margin-top: 10px;
    max-width: 255px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h3 {
    max-width: 255px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.content {
  margin-top: 10px;
  height: calc(100vh - 142px);
  width: 100%;
  position: relative;
  @width: 225px;
  .img {
    width: @width;
    height: @width;
    border: 12px solid #96908d;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 20%;
    margin: auto;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &.play {
      animation: rotate 20s linear infinite;
    }
    &.pause {
      animation-play-state: paused;
    }
  }
  .lyrics {
    width: 100%;
    height: 80%;
    position: relative;
    overflow: hidden;
    ul {
      position: absolute;
      width: 100%;
      text-align: center;
      top: 210px;
      left: 0px;
      li {
        padding: 10px 0;
        color: #cbcccc;
        font-size: 16px;
        &.con {
          color: #fff;
        }
      }
    }
  }
}
.comment {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0px 16px;
  position: absolute;
  bottom: 110px;
  left: 0;
  right: 0;
  img {
    width: 30px;
    height: 30px;
  }
}
.range {
  position: absolute;
  bottom: 90px;
  text-align: center;

  width: 100%;
  .bar {
    width: 246px;
    margin: 0 auto;
    color: #fff;
    position: relative;
    font-size: 12px;
    .timeLeft {
      position: absolute;
      left: -36px;
      top: -4px;
    }
    .timeRight {
      position: absolute;
      right: -36px;
      top: -4px;
    }
  }
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 16px;
  position: absolute;
  bottom: 10px;
  width: 100%;
  img {
    width: 30px;
    height: 30px;
  }
  .playAudio {
    img {
      width: 60px;
      height: 60px;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
