<template>
  <div class="rank">
    <div class="rank-top">
      <div class="left">
        <img src="~assets/img/login/箭头.svg" alt="" @click="back" />
        <span>排行榜</span>
      </div>
    </div>
    <div class="tar-bar">
      <span
        v-for="(item, index) in sort"
        :key="index"
        :class="{ active: count == item }"
        @click="clickCount(item, index)"
        >{{ item }}</span
      >
    </div>

    <div :class="['scrool', { btm: fShow }]" @scroll="contentScroll()">
      <div class="toplist">
        <h3>榜单推荐</h3>
        <div class="noticy">
          <div
            class="fl-c"
            v-for="(item, index) in toplist"
            :key="index"
            @click="goplay(item.content.id)"
          >
            <img v-lazy="item.content.coverImgUrl" alt="" class="img" />
            <p class="no-name">{{ item.name }}</p>
            <span>{{ item.content.updateFrequency }}</span>
            <p class="play-icon"></p>
          </div>
        </div>
      </div>

      <div class="Official" ref="Official">
        <div class="off-title">
          <img src="~assets/img/login/网易云.svg" alt="" />
          <h3>官方榜</h3>
        </div>
        <div class="f-col">
          <div
            v-for="(item, index) in Official"
            :key="index"
            class="f-d"
            @click="goplay(item.content.id)"
          >
            <div class="left">
              <h2>{{ item.name }}</h2>
              <img v-lazy="item.content.coverImgUrl" alt="" />
            </div>
            <div class="right">
              <p v-for="(e, i) in item.content.tracks" :key="i">
                {{ i + 1 }}.{{ e.first }} -
                <span>{{ e.second }}</span>
              </p>
            </div>
            <p class="top-right">{{ item.content.updateFrequency }}</p>
          </div>
        </div>
      </div>

      <div class="choiceness" ref="choiceness">
        <h3>精选榜</h3>
        <div class="noticy">
          <div
            class="fl-c"
            v-for="(item, index) in choiceness"
            :key="index"
            @click="goplay(item.content.id)"
          >
            <img v-lazy="item.content.coverImgUrl" alt="" class="img" />
            <p class="no-name">{{ item.name }}</p>
            <span>{{ item.content.updateFrequency }}</span>
            <p class="play-icon"></p>
          </div>
        </div>
      </div>

      <div class="genre" ref="genre">
        <h3>曲风榜</h3>
        <div class="noticy">
          <div
            class="fl-c"
            v-for="(item, index) in genre"
            :key="index"
            @click="goplay(item.content.id)"
          >
            <img v-lazy="item.content.coverImgUrl" alt="" class="img" />
            <p class="no-name">{{ item.name }}</p>
            <span>{{ item.content.updateFrequency }}</span>
            <p class="play-icon"></p>
          </div>
        </div>
      </div>

      <div class="global" ref="global">
        <h3>全球榜</h3>
        <div class="noticy">
          <div
            class="fl-c"
            v-for="(item, index) in global"
            :key="index"
            @click="goplay(item.content.id)"
          >
            <img v-lazy="item.content.coverImgUrl" alt="" class="img" />
            <p class="no-name">{{ item.name }}</p>
            <span>{{ item.content.updateFrequency }}</span>
            <p class="play-icon"></p>
          </div>
        </div>
      </div>

      <div class="characteristic" ref="characteristic">
        <h3>特色榜</h3>
        <div class="noticy">
          <div
            class="fl-c"
            v-for="(item, index) in characteristic"
            :key="index"
            @click="goplay(item.content.id)"
          >
            <img v-lazy="item.content.coverImgUrl" alt="" class="img" />
            <p class="no-name">{{ item.name }}</p>
            <span>{{ item.content.updateFrequency }}</span>
            <p class="play-icon"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { topList, detail, artist } from "network/toplist";
export default {
  name: "Ranking",
  data() {
    return {
      fShow: false, // 监听下面的播放器
      scroll: "", //要滚动的元素
      count: "官方",
      sort: ["官方", "精选", "曲风", "全球", "特色"],
      toplist: [
        { name: "云音乐古风榜", content: "" },
        { name: "云音乐民谣榜", content: "" },
        { name: "云音乐ACG榜", content: "" },
      ],
      Official: [
        { name: "飙升榜", content: "" },
        { name: "新歌榜", content: "" },
        { name: "原创榜", content: "" },
        { name: "热歌榜", content: "" },
      ],
      choiceness: [
        { name: "黑胶VIP爱听榜", content: "" },
        { name: "网络热歌榜", content: "" },
      ],
      genre: [
        { name: "云音乐电音榜", content: "" },
        { name: "云音乐ACG榜", content: "" },
        { name: "云音乐说唱榜", content: "" },
        { name: "云音乐摇滚榜", content: "" },
        { name: "云音乐民谣榜", content: "" },
        { name: "云音乐国电榜", content: "" },
        { name: "云音乐古典榜", content: "" },
        { name: "云音乐古风榜", content: "" },
        { name: "中文DJ榜", content: "" },
      ],
      global: [
        { name: "美国Billboard榜", content: "" },
        { name: "UK排行榜周榜", content: "" },
        { name: "日本Oricon榜", content: "" },
        { name: "法国 NRJ Vos Hits 周榜", content: "" },
        { name: "云音乐欧美新歌榜", content: "" },
        { name: "云音乐欧美热歌榜", content: "" },
        { name: "云音乐日语榜", content: "" },
        { name: "云音乐韩语榜", content: "" },
        { name: "俄语榜", content: "" },
        { name: "越南语榜", content: "" },
      ],
      characteristic: [
        { name: "听歌识曲榜", content: "" },
        { name: "潜力爆款榜", content: "" },
        { name: "中国新乡村音乐排行榜", content: "" },
        { name: "KTV唛榜", content: "" },
        { name: "Beatport全球电子舞曲榜", content: "" },
      ],
    };
  },
  methods: {
    contentScroll() {
      this.scroll = this.$el.querySelector(".scrool");
      let l = this.scroll.scrollTop;
      if (l >= 750 && l < 950) {
        this.count = "精选";
      } else if (l >= 950 && l < 1380) {
        this.count = "曲风";
      } else if (l >= 1380 && l < 1880) {
        this.count = "全球";
      } else if (l >= 1880) {
        this.count = "特色";
      } else if (l < 750) {
        this.count = "官方";
      }
    },
    goplay(id) {
      this.$router.push({ path: "/songList", query: { id: id } });
    },
    // 获取歌手排行榜
    // getartist() {
    //   artist(1).then((res) => {
    //     console.log(res);
    //   });
    // },
    //这个topList比多点内容
    getdetail() {
      detail().then((res) => {
        // console.log(res);
        this.toplist.forEach((e) => {
          e.content = res.list.find((n) => {
            // this.listname.push(e.name);
            return n.name == e.name;
          });
        });
        this.Official.forEach((e) => {
          e.content = res.list.find((n) => {
            return n.name == e.name;
          });
        });
        this.choiceness.forEach((e) => {
          e.content = res.list.find((n) => {
            return n.name == e.name;
          });
        });
        this.genre.forEach((e) => {
          e.content = res.list.find((n) => {
            return n.name == e.name;
          });
        });
        this.global.forEach((e) => {
          e.content = res.list.find((n) => {
            return n.name == e.name;
          });
        });
        this.characteristic.forEach((e) => {
          e.content = res.list.find((n) => {
            return n.name == e.name;
          });
        });
        // console.log(this.Official);
        // console.log(this.listname);
      });
    },
    // 内容少了点所以不用
    // gettopList() {
    //   topList().then((res) => {
    //     console.log(res);
    //     res.list.forEach((e) => {
    //       this.listname.push(e.name);
    //     });
    //     console.log(this.listname);
    //   });
    // },
    back() {
      this.$router.push("/home");
    },
    clickCount(e, i) {
      this.count = e;
      this.scroll = this.$el.querySelector(".scrool");
      let top = 0;
      let h = this.scroll.scrollTop;
      if (i == 0) {
        top = this.$refs.Official.offsetTop;
      } else if (i == 1) {
        top = this.$refs.choiceness.offsetTop;
      } else if (i == 2) {
        top = this.$refs.genre.offsetTop;
      } else if (i == 3) {
        top = this.$refs.global.offsetTop;
      } else if (i == 4) {
        top = this.$refs.characteristic.offsetTop;
      }
      this.scroll.scrollTo(0, top); // 无动画跳转
    },
  },
  created() {
    this.getdetail();
  },
  mounted() {
    this.$bus.$on("delDetail", () => {
      this.fShow = true;
      this.$nextTick(() => {
        this.$refs.scroll.fetchData();
      });
    });
  },
  components: {},
};
</script>

<style scoped lang="less">
.rank {
  background-color: #f6f6f6;
}
.rank-top {
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
.tar-bar {
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  margin-bottom: 10px;
}
.active {
  color: #000;
  font-weight: 600;
  display: inline-block;
  &::after {
    content: "";
    display: block;
    height: 5px;
    width: calc(100% + 6px);
    background-color: red;
    position: relative;
    top: -5px;
    left: -3px;
    border-radius: 5px;
    opacity: 0.5;
  }
}
.toplist {
  margin: 10px 16px 16px 16px;
  background-color: #fff;
  border-radius: 8px;
  padding-bottom: 10px;
  h3 {
    color: #000;
    padding: 15px 0 15px 10px;
  }
  .noticy {
    display: flex;
    justify-content: space-evenly;
    .fl-c {
      position: relative;
      .play-icon {
        bottom: 30px;
      }
      .img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
      p {
        font-size: 13px;
        margin-top: 5px;
      }
      span {
        position: absolute;
        font-size: 12px;
        border-radius: 15px;
        height: 15px;
        top: 5px;
        right: 5px;
        box-sizing: content-box;
        padding: 0 5px;
        border: 1px solid rgba(100, 100, 100, 0.3);
        color: #fdfaf6;
      }
    }
  }
}
.play-icon {
  width: 18px;
  height: 18px;
  bottom: 25px;
  right: 5px;
  position: absolute;
  background: url("~assets/img/common/bofang02.svg") no-repeat 0 0 / cover;
  opacity: 0.5;
}
.Official {
  padding: 0 16px;
  background-image: linear-gradient(#f6f6f6, #fff);
  border-radius: 8px;
  .off-title {
    display: flex;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    h2 {
      color: #000;
    }
  }
  .f-col {
    display: flex;
    flex-direction: column;
    .f-d {
      padding: 18px 5px 16px 18px;
      margin: 10px 0;
      border-radius: 10px;
      display: flex;
      position: relative;
      &:first-child {
        background-color: #f4dfe6;
        h2 {
          color: #e53671;
        }
      }
      &:nth-child(2) {
        background-color: #e2e9ef;
        h2 {
          color: #259a86;
        }
      }
      &:nth-child(3) {
        background-color: #e3e5f1;
        h2 {
          color: #3a6aa8;
        }
      }
      &:last-child {
        background-color: #f6e2e1;
        h2 {
          color: #ce3635;
        }
      }
      .left {
        img {
          width: 65px;
          height: 65px;
          border-radius: 8px;
          margin-top: 8px;
        }
      }
      .right {
        margin-left: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p {
          width: 185px;
          overflow: hidden;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          display: inline-block;
          max-width: 115px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 16px;
          vertical-align: bottom;
        }
      }
      .top-right {
        position: absolute;
        font-size: 12px;
        top: 5px;
        right: 10px;
        color: #aaa;
      }
    }
  }
}
.global,
.genre,
.choiceness,
.characteristic {
  margin: 10px 0px 16px 0px;
  background-color: #fff;
  border-radius: 8px;
  h3 {
    color: #000;
    padding: 15px 0 0px 16px;
  }
  .noticy {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 16px;
    .fl-c {
      margin-top: 12px;
      position: relative;
      .img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
      }
      .no-name {
        font-size: 13px;
        width: 100px;
      }
      span {
        position: absolute;
        font-size: 12px;
        border-radius: 15px;
        height: 15px;
        top: 5px;
        right: 5px;
        box-sizing: content-box;
        padding: 0 5px;
        border: 1px solid rgba(100, 100, 100, 0.3);
        color: #fdfaf6;
      }
    }
  }
}
.choiceness {
  padding-bottom: 10px;
  .noticy {
    display: flex;
    justify-content: flex-start;
    .fl-c {
      margin-right: 21px;
    }
  }
}
.characteristic {
  padding-bottom: 30px;
  margin-bottom: 0;
  .noticy {
    display: flex;
    .fl-c {
      &:last-child {
        flex-grow: 2;
        margin-left: 21px;
      }
      span {
        left: 20px;
        width: 60px;
      }
      .play-icon {
        bottom: 38px;
        left: 77px;
      }
    }
  }
}
.scrool {
  height: calc(100vh - 150px);
  overflow-y: auto;
  position: relative;
}
.btm {
  height: calc(100vh - 100px);
}
</style>
