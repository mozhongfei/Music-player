<template>
  <div class="play-song" v-if="Object.keys(songDetails).length !== 0">
    <audio
      controls
      ref="audio"
      :src="Nsong"
      @ended="endplay"
      @canplay="canplay"
      @loadeddata="canplayFun"
    ></audio>
    <div class="play-content">
      <div class="play-left" @click="goSongList">
        <img :src="song.al.picUrl" alt="" :class="['run', { pause: !playR }]" />
        <p>
          <span>{{ song.songName }}</span>
          <span>-</span>
          <span>{{ song.ar[0].name }}</span>
        </p>
      </div>
      <div class="play-right">
        <div class="play-pause" @click="play_pause">
          <van-circle
            v-model="currentRate"
            :rate="timer"
            :speed="timeS"
            text=""
            size="30px"
            :stroke-width="60"
            layer-color="#eee"
            color="#333"
          />
          <van-icon name="play" class="play-icon" v-show="!play" />
          <van-icon name="pause" class="play-icon" v-show="play" />
        </div>
        <img
          src="~assets/img//common/菜单 - 网易icon.svg"
          alt=""
          @click="showPopup"
        />
      </div>
    </div>

    <play-list
      :cShow="cShow"
      @close="close"
      :iShow="song.id"
      :songDetails="songDetails"
      @playdetails2="playdetails2"
      @playdetail="playdetail"
      @change="change"
      @allDel="allDel"
    />
  </div>
</template>

<script>
import {
  getSong,
  checkPlay,
  getPlaylist,
  SongDetail,
  getSongDetail,
} from "network/play";
import playList from "./playList.vue";
import { Toast } from "vant";

export default {
  name: "playSong",
  data() {
    return {
      song: {}, //当前正在播放
      currentRate: 0, //播放进度
      play: false, //播放
      timer: 0, //播放总进度
      cShow: false, // 播放列表显示
      errmessage: "", // 无法播放提示信息
      songDetails: [], //播放的歌曲列表
      model: "cycle", // 播放模式
      result: 0, // 随机播放歌曲下标
      i: 0, //检查音乐是否可播放次数
      altime: 0, // 延迟时间函数
      details: [], //传递进来的歌曲id数组
      once: "", //保证代码只执行一次
      playR: false, // 碟转圈
    };
  },
  props: {
    single: {
      type: Object,
      default() {
        return {};
      },
    },
    nowmodel: String,
  },
  methods: {
    // 音乐播放器数据加载完，直接获取歌曲时间
    canplayFun() {
      let duration = this.$refs.audio.duration; //歌总时间
      this.$emit("canplayFun", duration);
    },
    // 歌曲详情
    goSongList() {
      this.$emit("playAudio", this.$refs.audio);
      this.$router.push({ path: "/song", query: { id: this.song.id } });
    },
    //全部删除
    allDel() {
      this.songDetails = [];
      this.cShow = false;
      this.$bus.$emit("delDetail", 0);
    },
    //改变播放模式
    change(e) {
      this.model = e;
    },
    // 传进来要播放的歌曲
    playdetail(id) {
      this.$refs.audio.pause();
      const item = this.songDetails.find((e) => e.id == id);
      if (this.song.id == item.id) {
        this.$refs.audio.currentTime = 0;
      } else {
        this.song = item;
        this.play = true;
      }
    },
    //删除歌曲
    playdetails2(i) {
      const index = this.songDetails.findIndex((e) => e.id == this.song.id);
      this.songDetails.splice(i, 1);
      if (i == index) {
        this.currentRate = 0;
        this.timer = 0;
        this.song = this.songDetails[i];
      }
      if (this.songDetails.length == 0) {
        this.$bus.$emit("delDetail", 0);
        this.cShow = false;
      }
    },
    close() {
      this.cShow = false;
    },
    // 弹出歌单列表
    showPopup() {
      this.cShow = true;
    },
    // 可播放
    canplay() {
      if (this.play && this.song.url) {
        this.$refs.audio.play();
        this.timer = 100;
        this.playR = true;
        //播放后清次数
        clearTimeout(this.altime);
        this.i = 0;
      }
    },
    // 改变播放的歌曲
    changeSong() {
      let index = this.songDetails.findIndex((e) => e.id == this.song.id);
      // 找到播放的下标
      index = index == this.songDetails.length - 1 ? -1 : index;
      if (this.model == "cycle") {
        this.song = this.songDetails[++index];
      } else if (this.model == "single") {
        this.$refs.audio.currentTime = 0;
      } else {
        this.randomN();
        this.song = this.songDetails[this.result];
      }
      this.play = true;
    },
    // 结束播放
    endplay() {
      this.play = false;
      this.changeSong();
    },
    // 获取歌曲URL
    nowSong(id) {
      this.playR = false;
      getSong(id).then((res) => {
        // 设置set方法
        this.$set(this.song, "url", res.data[0].url);
      });
    },
    // 判断歌曲是否可以播放
    checkPlaySong(checkid) {
      //播放清除时间
      this.currentRate = 0;
      this.timer = 0;
      checkPlay(checkid).then((res) => {
        // console.log(res);
        if (!res.success) {
          this.errmessage = res.message;
          // 有可能第一次检查失败,实际歌曲可播放的情况,3次检查过后才能判断为歌曲不可播放
          if (this.i < 3) {
            this.i++;
            this.altime = setTimeout(() => {
              this.checkPlaySong(checkid);
            }, 1000);
          } else if (this.play) {
            Toast({
              message: this.errmessage + ",开始播放下一首歌曲",
              position: "top",
            });
            setTimeout(() => {
              this.changeSong();
            }, 2000);
          }
        } else {
          this.nowSong(checkid);
          // this.play = true;
        }
      });
    },
    //  暂停开始播放
    play_pause() {
      this.play = !this.play;
      this.$emit("playpause", this.play);
      if (this.song.url) {
        this.playR = !this.playR;
        if (this.play) {
          this.canplay();
        } else {
          this.$refs.audio.pause();
          this.timer = this.currentRate;
        }
      } else {
        Toast({
          message: this.errmessage + ",开始播放下一首歌曲",
          position: "top",
        });
        this.play = false;
        setTimeout(() => {
          this.changeSong();
        }, 2000);
      }
    },
    // 获取歌单列表
    Playlist(id) {
      getPlaylist(id).then((res) => {
        // console.log(res);
        res.playlist.tracks.forEach((item) => {
          this.songDetails.push(new SongDetail(item));
        });
        // console.log(this.songDetails);
        this.song = this.songDetails[0];
      });
    },

    getDetail(ids, e) {
      // console.log(ids);
      this.songDetails = [];
      getSongDetail(ids).then((res) => {
        res.songs.forEach((item) => {
          this.songDetails.push(new SongDetail(item));
        });
        const i = this.songDetails.findIndex((item) => item.id == +e);
        this.song = this.songDetails[i];
        this.play = true;
      });
    },

    randomN() {
      let ii = Math.floor(Math.random() * this.songDetails.length);
      if (this.result == ii) {
        this.randomN();
      } else {
        this.result = ii;
      }
    },
  },
  mounted() {
    this.$bus.$on("detailSong", (val, e) => {
      if (this.once != e) {
        // console.log(val, e);
        this.details = [];
        val.forEach((item) => {
          item.resources.forEach((e) => {
            this.details.push(e.resourceId);
          });
        });
        this.getDetail(this.details, e);
      }
      this.once = e;
    });

    this.$bus.$on("allPlay", (e, index) => {
      this.songDetails = e;
      const i = this.songDetails.findIndex((item) => item.id == index);
      this.song = this.songDetails[i];
      this.play = true;
    });

    this.$bus.$on("toggleplay", () => {
      this.play_pause();
    });

    this.$bus.$on("menu", () => {
      this.showPopup();
    });

    this.$bus.$on("tTime", (e) => {
      this.currentRate = e;
      // console.log( this.currentRate);
    });

    this.$bus.$on("prevSong", () => {
      let i = this.songDetails.findIndex((item) => item.id == this.song.id);
      if (i == 0) {
        i = this.songDetails.length - 1;
        this.song = this.songDetails[i];
      } else {
        this.song = this.songDetails[i - 1];
      }
    });

    this.$bus.$on("nextSong", () => {
      let i = this.songDetails.findIndex((item) => item.id == this.song.id);
      if (i == this.songDetails.length - 1) {
        i = 0;
        this.song = this.songDetails[i];
      } else {
        this.song = this.songDetails[i + 1];
      }
    });

    this.$bus.$on("songlist", (e, id) => {
      // console.log(e,id);
      this.getDetail(e, id);
    });
  },
  components: {
    playList,
  },
  computed: {
    Nsong() {
      return this.song.url;
    },
    timeS() {
      return 100000 / this.song.dt;
    },
  },
  created() {
    if (this.$store.state.user.isLogin) {
      this.Playlist(2368064958);
    } else {
      this.Playlist(5059642708);
    }
  },
  watch: {
    song(newN, oldN) {
      if (newN !== oldN) {
        this.checkPlaySong(newN.id);
        // 在歌词页面就跳转
        if (this.$route.path == "/song") {
          this.$router
            .replace({ path: "/song", query: { id: newN.id } })
            .catch((err) => {});
          this.$bus.$emit("changSong", newN.id);
        }
        this.$emit("playpause", this.play);
        if (this.$refs.audio) {
          this.$refs.audio.pause();
        }
      }
    },
    nowmodel(newN) {
      this.model = newN;
    },
    single(newN, oldN) {
      // console.log(this.single);
      if (newN !== oldN) {
        this.$refs.audio.pause();
        const index = this.songDetails.findIndex((e) => e.id == this.song.id);
        const similar = this.songDetails.find((e) => e.id == newN.id);
        if (similar) {
        } else {
          this.songDetails.splice(index + 1, 0, newN);
        }
        this.play = true;
        this.song = newN;
        this.goSongList();
        // console.log( this.songDetails);
      }
    },
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
.play-song {
  height: 50px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  audio {
    display: none;
  }
}
.play-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;
  .play-left {
    display: flex;
    align-items: center;
    p {
      margin-left: 8px;
      display: flex;
      align-items: center;
      width: 205px;
      span {
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child {
          font-size: 16px;
          max-width: 205px;
        }
        &:nth-child(2) {
          padding: 0 5px;
        }
      }
    }
    img {
      width: 45px;
      height: 45px;
      border: 7px solid #000;
      position: relative;
      top: -5px;
      border-radius: 50%;
    }
  }
  .play-right {
    display: flex;
    align-items: center;
    /deep/.van-circle svg {
      top: 3px;
    }
    .play-icon {
      top: -4px;
      right: 49%;
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
.run {
  animation: rotate 10s linear infinite;
}
.pause {
  animation-play-state: paused;
}
</style>
