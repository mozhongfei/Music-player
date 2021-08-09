<template>
  <van-popup
    v-model="show"
    class="play-list"
    position="bottom"
    get-container="#app"
    @close="close"
    :lock-scroll="false"
  >
    <h3>
      当前播放<span>({{ songDetails.length }})</span>
    </h3>
    <div class="play-nav">
      <div class="cycle" @click="change">
        <span v-show="tShow == 'cycle'"
          ><img src="~assets/img/common/循环 - 网易icon.svg" alt="" />
          列表循环</span
        >
        <span v-show="tShow == 'random'"
          ><img src="~assets/img/common/随机播放 - 网易icon.svg" alt="" />
          随机播放</span
        >
        <span v-show="tShow == 'single'"
          ><img src="~assets/img/common/单曲循环 - 网易icon.svg" alt="" />
          单曲循环</span
        >
      </div>

      <div class="top-right">
        <span>
          <img src="~assets/img/common/添加文件.svg" alt="" />
          <span class="right-text">收藏全部</span>
        </span>
        <span class="separ">|</span>
        <img src="~assets/img/common/垃圾桶.svg" alt="" @click="allDel" />
      </div>
    </div>

    <scroll class="play-content" :probe-type="3" ref="scroll" :bounce="false">
      <div v-for="item in songDetails" :key="item.id" class="song-list">
        <div
          :class="['list-left', { active: iShow === item.id }]"
          @click="playSong(item.id)"
        >
          <img
            src="~assets/img/common/音量.svg"
            alt=""
            v-if="iShow === item.id"
          />
          <span class="first-s">{{ item.songName }}</span>
          <span class="sec">-</span>
          <p class="thr">
            <span v-for="(e, index) in item.ar" :key="index">{{ e.name }}</span>
          </p>
        </div>
        <div class="list-right">
          <van-button
            round
            type="info"
            size="mini"
            color="#666"
            plain
            v-if="iShow === item.id"
            ref="vanB"
            >播放来源</van-button
          >
          <img src="~assets/img/common/del.svg" alt="" @click="del(item.id)" />
        </div>
      </div>
    </scroll>
  </van-popup>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "playList",
  data() {
    return {
      listId: [], //歌单内歌曲id
      playList: [], //保存当前播放记录/上次记录/历史记录
      Model: ["cycle", "random", "single"], //播放模式
      tShow: "cycle", //当前播放模式
      show: false, //显示弹框
    };
  },
  props: {
    cShow: {
      type: Boolean,
    },
    iShow: {
      //当前播放歌曲id
      type: Number,
    },
    songDetails: {
      //歌曲详情
      type: Array,
      default() {
        return [];
      },
    },
  },
  updated() {
    if (this.$refs.scroll) {
      this.$refs.scroll.fetchData();
    }
  },
  mounted() {},
  methods: {
    // 全部删除
    allDel() {
      this.$emit("allDel");
    },
    // 删除歌曲
    del(id) {
      const i = this.songDetails.findIndex((e) => e.id == id);
      this.$emit("playdetails2", i);
    },
    // 发送播放的歌曲数据回去
    playSong(id) {
      //   this.iShow = detail.id;
      this.$emit("playdetail", id);
    },
    // 传递关闭弹出框事件
    close() {
      this.$emit("close");
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
  },
  components: {
    Scroll,
  },
  created() {},
  watch: {
    cShow(newN) {
      this.show = newN;
      if (this.$refs.vanB) {
        this.$nextTick(() => {
          let sTop = this.$refs.vanB[0].offsetTop;
          let mTop = this.$refs.scroll.$el.children[0].clientHeight;
          let pTop = this.$refs.scroll.$el.clientHeight;
          if (sTop > 142 && sTop < mTop - 142) {
            this.$refs.scroll.scrollTo(0, -sTop + 142, 0);
          } else if (sTop > mTop - 142) {
            this.$refs.scroll.scrollTo(0, pTop - mTop, 0);
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.play-list {
  width: 345px;
  height: 395px;
  background-color: #fff;
  border-radius: 20px;
  bottom: 20px;
  left: calc(50% - 345px / 2);
  h3 {
    margin-top: 25px;
    color: #000;
    margin-left: 20px;
    span {
      font-size: 12px;
      color: #999;
    }
  }
}
.play-nav {
  display: flex;
  justify-content: space-between;
  margin: 15px 20px;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    vertical-align: bottom;
  }
  .top-right {
    .separ {
      margin: 0 12px;
      color: #eee;
    }
    .right-text {
      margin-left: 10px;
    }
  }
}
.play-content {
  height: calc(100% - 96px);
  width: 305px;
  margin: 0 20px;
  .song-list {
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    .list-left {
      display: flex;
      width: 205px;
      img {
        width: 25px;
        height: 13px;
      }
      .first-s {
        max-width: 205px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sec {
        margin: 0 5px;
      }
      .thr {
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
    }
    .list-right {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        margin-left: 12px;
      }
    }
  }
}
.active {
  color: red;
}
</style>
