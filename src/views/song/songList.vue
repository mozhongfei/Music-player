<template>
  <div v-if="Object.keys(songList).length !== 0">
    <nav-bar class="song-bar">
      <div slot="left" class="left" @click="showPopup">
        <van-icon name="arrow-left" color="#fff" />
      </div>
      <div slot="center" class="center">歌单列表</div>
    </nav-bar>

    <div class="flash flash1" v-show="isShow" @click="allPlay(details[0])">
      <img src="~assets/img/search/播放.svg" alt="" />
      <span>播放全部 ({{ songDetails.length }})</span>
    </div>

    <scroll
      :class='["song-content",{ btm: fShow }]'
      :probe-type="3"
      ref="scroll"
      :bounce="false"
      @scroll="contentScroll"
    >
      <div class="top" ref="contentTop">
        <div class="playlist">
          <img :src="songList.coverImgUrl" alt="" />
          <div class="listText">
            <p>{{ songList.name }}</p>
            <div class="nickname">
              <img :src="songList.creator.avatarUrl" alt="" />
              <span>{{ songList.creator.nickname }}</span>
            </div>
            <span class="text">{{ songList.description }}</span>
          </div>
        </div>
        <div class="tie" v-if="Count">
          <div>
            <img src="~assets/img/common/添加文件.svg" alt="" />
            <span>{{ Count.bookedCount | playCountFilter }}</span>
          </div>
          <div @click="comment">
            <img src="~assets/img/songlist/评 论.svg" alt="" />
            <span>{{ Count.commentCount | playCountFilter }}</span>
          </div>
          <div>
            <img src="~assets/img/songlist/分 享.svg" alt="" />
            <span>{{ Count.shareCount | playCountFilter }}</span>
          </div>
        </div>
      </div>

      <div class="flash" @click="allPlay(details[0])">
        <img src="~assets/img/search/播放.svg" alt="" />
        <span>播放全部 ({{ songDetails.length }})</span>
      </div>

      <div
        class="Single"
        v-for="(item, index) in details"
        :key="index"
        @click="allPlay(item)"
      >
        <span class="textfz">{{ index + 1 }}</span>
        <div class="leng">
          <p class="Single-title">{{ item.songName }}</p>
          <div class="Introduction">
            <p class="songN">
              <span v-for="(e, index) in item.ar" :key="index">{{
                e.name
              }}</span>
            </p>
            <span class="sec">-</span>
            <span class="songT">{{ item.al.name }}</span>
            <div class="play-song"></div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getPlaylist, SongDetail, getSongDetail, dynamic } from "network/play";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "songList",
  data() {
    return {
      songList: {}, //歌单
      Count: {}, //评论数,收藏数,播放数
      details: [], // 歌单内歌曲详情
      songDetails: [], //歌单内歌曲id
      isShow: false, // 显示全部播放
      id: "", //歌单id
      num: 0,
      fShow: false,
    };
  },
  methods: {
    comment() {
      this.$router.push({
        path: "/commentList",
        query: { id: this.id, type: 2 },
      });
    },
    // 全部播放
    allPlay(i) {
      // console.log(i);
      this.$bus.$emit("allPlay", this.details, i.id);
    },
    // 滑动的高度
    contentScroll(position) {
      // console.log(position, this.$refs.banref.offsetHeight);
      // 超过播放全部图标就显示
      this.isShow = -position.y > this.$refs.contentTop.offsetHeight - 29;
    },
    // 返回
    showPopup() {
      this.$router.back();
    },
    getDetail(ids) {
      // console.log(ids);
      this.details = [];
      getSongDetail(ids).then((res) => {
        res.songs.forEach((item) => {
          this.details.push(new SongDetail(item));
        });
        // console.log(this.details);
        this.$nextTick(() => {
          this.$refs.scroll.fetchData();
        });
        // this.song = this.songDetails[i];
      });
    },
  },
  mounted() {
    this.$bus.$on("delDetail", () => {
      this.fShow = true;
      this.$nextTick(() => {
        this.$refs.scroll.fetchData();
      });
    });
  },
  components: {
    NavBar,
    Scroll,
  },
  created() {
    this.id = this.$route.query.id;
    // console.log(id);
    getPlaylist(this.id).then((res) => {
      this.songList = res.playlist;
      this.songDetails = [];
      this.songList.trackIds.forEach((element) => {
        this.songDetails.push(element.id);
      });
      let l = parseInt(this.songDetails.length / 500);
      // console.log(l);
      for (let i = 0; i <= l; i++) {
        if (l == 0) {
          this.getDetail(this.songDetails);
        } else if (i == l && i != 0) {
          this.getDetail(this.songDetails.slice(i * 500 - 1, -1));
        } else {
          this.getDetail(this.songDetails.slice(i * 500, (i + 1) * 500 - 1));
          // console.log(this.songDetails.length);
        }
      }
    });
    dynamic(this.id).then((res) => {
      this.Count = res;
    });
  },
  filters: {
    playCountFilter: function (value) {
      if (value < 100000) return value;
      else if (value > 100000 && value < 100000000)
        return (value / 10000).toFixed(1) + "万";
      return (value / 100000000).toFixed(1) + "亿";
    },
  },
};
</script>

<style scoped lang="less">
.top {
  background-color: #b9b9b9;
  height: 250px;
  width: 375px;
  position: relative;
  margin-bottom: 15px;
}
.leng {
  width: 310px;
}
.song-bar {
  background-color: #b9b9b9;
  .center {
    color: #fff;
  }
}
.flash1 {
  position: absolute;
  width: 100%;
  z-index: 9;
  top: 44px;
  background-color: #fff;
}
.playlist {
  display: flex;
  padding: 65px 16px 50px 16px;
  img {
    width: 130px;
    height: 130px;
    border-radius: 12px;
    margin-right: 15px;
  }
  .listText {
    color: #fff;
    display: flex;
    flex-direction: column;
    height: 130px;
    justify-content: space-between;
    .nickname {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      span {
        font-size: 13px;
      }
    }
    .text {
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transform: scale(0.8);
      color: #efefef;
      margin-left: -18px;
    }
  }
}
.tie {
  width: 275px;
  height: 50px;
  border-radius: 50px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  position: absolute;
  bottom: -20px;
  left: 50px;
  z-index: 1;
  background-color: #fff;
  display: flex;
  padding: 0 8px;
  justify-content: space-evenly;
  align-items: center;
  img {
    height: 25px;
    width: 25px;
  }
  div {
    display: flex;
    align-items: center;
    &::after {
      content: "|";
      position: relative;
      padding: 0 5px;
      color: rgba(100, 100, 100, 0.2);
    }
    &:last-child::after {
      content: "";
    }
    span {
      font-size: 12px;
      margin-left: 7px;
    }
  }
}
.flash {
  display: flex;
  align-items: center;
  padding: 15px 16px 14px 16px;
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
.Single {
  padding: 12px 0;
  margin: 0 16px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  display: flex;
  align-items: center;
  .textfz {
    font-size: 16px;
    color: #979797;
    display: block;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    margin-right: 10px;
  }
  .Single-title {
    color: #494949;
    font-size: 18px;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Introduction {
    position: relative;
    display: flex;
    font-size: 14px;
    margin-top: 5px;
    .songN {
      max-width: 190px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
      max-width: 65px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.song-content {
  height: calc(100vh - 50px);
  width: 100%;
}
.btm {
  height: 100vh;
}
/deep/.content {
  display: block;
}
.play-song {
  width: 25px;
  height: 25px;
  top: -15px;
  right: 3%;
  position: absolute;
  background: url("~assets/img/common/play.svg") no-repeat 0 0 / cover;
}
</style>
