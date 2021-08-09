<template>
  <div class="comment">
    <div class="comment-top">
      <div class="left">
        <img src="~assets/img/login/箭头.svg" alt="" @click="back" />
        <span>评论({{ totalCount }})</span>
      </div>
      <img src="~assets/img/songlist/分 享.svg" alt="" />
    </div>

    <div class="tar-bar tar-bar1" v-show="tShow">
      <p>评论区</p>
      <div>
        <span
          v-for="(item, index) in sort"
          :key="index"
          :class="{ active: count == index }"
          @click="clickCount(index)"
          >{{ item }}</span
        >
      </div>
    </div>

    <scroll
      class="comment-C"
      :probe-type="3"
      ref="scroll"
      :bounce="false"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <div
        class="comment-title"
        v-if="Object.keys(songList).length !== 0"
        @click="gosongList"
        ref="title"
      >
        <img :src="songList.coverImgUrl" alt="" />
        <div class="listText">
          <p>{{ songList.name }}</p>
          <div class="nickname">
            by <span>{{ songList.creator.nickname }}</span>
          </div>
        </div>
        <div class="backList"><van-icon name="arrow" /></div>
      </div>

      <div>
        <div class="tar-bar">
          <p>评论区</p>
          <div>
            <span
              v-for="(item, index) in sort"
              :key="index"
              :class="{ active: count == index }"
              @click="clickCount(index)"
              >{{ item }}</span
            >
          </div>
        </div>

        <div class="comment-content">
          <div
            class="content-text"
            v-for="(item, index) in comments"
            :key="index"
          >
            <img :src="item.user.avatarUrl" alt="" />
            <div class="text">
              <p>{{ item.user.nickname }}</p>
              <p class="time">{{ publishtime(index) }}</p>
              <p class="content">{{ item.content }}</p>
              <div class="praise" @click="giveP(index)" v-if="praise.length">
                <span>{{ item.likedCount | playCountFilter }}</span>
                <img
                  src="~assets/img/songlist/点赞.svg"
                  alt=""
                  v-if="!praise[index]"
                />
                <img src="~assets/img/songlist/点赞(1).svg" alt="" v-else />
              </div>
              <div
                class="reply"
                v-if="item.showFloorComment.replyCount"
                @click="replyCount(index)"
              >
                <span>{{ item.showFloorComment.replyCount }}条回复</span>
                <van-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>

    <van-popup
      v-model="show"
      class="reply"
      position="bottom"
      :lock-scroll="false"
      :close-on-popstate="true"
    >
      <reply :cid="cid" :id="id" @back="close" :type="type"></reply>
    </van-popup>
  </div>
</template>

<script>
import reply from "views/song/childComps/reply.vue";
import { comment, commentLike } from "network/comment";
import { getTime } from "common/utils";
import { Toast } from "vant";
import Scroll from "components/common/scroll/Scroll.vue";
import { getPlaylist } from "network/play";
export default {
  name: "commentList",
  data() {
    return {
      review: {
        id: "", //歌单id
        type: 2, // 资源id  2是歌单
        pageNo: 1, // 页码
        pageSize: 30, // 一页多少条数据
        sortType: 2, // 排序方式  1:按推荐排序,2:按热度排序,3:按时间排序   tie: 1暂时用不了
        cursor: 0, //当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
        show: false, // 显示回复
      },
      totalCount: 0,
      comments: [],
      songList: {},
      sort: ["推荐", "最热", "最新"],
      count: 0,
      praise: [],
      givePraise: {
        id: 0, // 歌单id
        cid: 0, // 评论id
        type: 2, // 评论类型是歌单内的评论
        t: 1, // 1点赞 0取消点赞
      },
      cid: 0, // 评论id
      show: false, // 查看回复
      id: "", // 歌单id
      tShow: false,
      type: 0, // 资源类型
    };
  },
  methods: {
    close() {
      this.show = false;
    },
    contentScroll(position) {
      if (this.$refs.title) {
        this.tShow = -position.y > this.$refs.title.offsetHeight;
      }
    },
    gosongList() {
      this.$router.push({ path: "/songList", query: { id: this.id } });
    },
    replyCount(i) {
      this.cid = this.comments[i].commentId;
      this.show = true;
    },
    loadMore() {
      this.getcomment(this.review);
    },
    giveP(i) {
      let el = !this.praise[i];
      this.givePraise.cid = this.comments[i].commentId;
      if (el) {
        this.givePraise.t = 1;
        this.givecommentLike(this.givePraise, i, el);
      } else {
        this.givePraise.t = 0;
        this.givecommentLike(this.givePraise, i, el);
      }
    },
    givecommentLike(data, i, el) {
      commentLike(data).then((res) => {
        if (res.code == 301) {
          Toast("请先登录");
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        } else {
          this.praise.splice(i, 1, el);
          console.log(res);
          if (el) {
            this.comments[i].likedCount += 1;
          } else {
            this.comments[i].likedCount -= 1;
          }
        }
      });
    },
    getcomment(data) {
      // console.log(data);
      comment(data).then((res) => {
        // console.log(res);
        this.review.pageNo += 1;
        //    获取最后一项的time
        if (res.data.comments.length) {
          this.review.cursor = res.data.comments[res.data.comments.length - 1].time;
        }
        //    console.log(this.review);
        //  获取评论
        this.comments.push(...res.data.comments);
        this.totalCount = res.data.totalCount;
        this.comments.forEach((element) => {
          this.praise.push(element.liked);
        });
        // console.log(this.comments);
        this.$nextTick(() => {
          this.$refs.scroll.fetchData();
          this.$refs.scroll.finishPullUp();
        });
      });
    },
    back() {
      if (this.type == 2) {
        this.$router.back()
      } else if (this.type == 0) {
        this.$router.replace({
          path: "/song",
          query: { id: this.id },
        });
      }
    },
    clickCount(index) {
      this.count = index;
      index = index == 0 ? 1 : index;
      this.review.pageNo = 1;
      this.comments = [];
      this.review.sortType = index + 1;
      this.getcomment(this.review);
    },
  },
  components: {
    Scroll,
    reply,
  },

  mounted() {
    this.$refs.scroll.scrollTo(0, -106, 200);
  },
  computed: {
    publishtime() {
      return (index) => {
        let time = new Date(this.comments[index].time);
        return getTime(time, 0) + getTime(time, 1) + getTime(time, 2);
      };
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.review.id = +this.$route.query.id;
    this.givePraise.id = +this.$route.query.id;
    this.type = this.$route.query.type;
    this.review.type = this.type;
    this.givePraise.type = this.type;
    if (this.type == 2) {
      getPlaylist(this.id).then((res) => {
        this.songList = res.playlist;
      });
    }
    this.getcomment(this.review);
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
.comment {
  .comment-top {
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
  .comment-title {
    display: flex;
    padding: 10px 16px 0px 16px;
    align-items: center;
    border-bottom: 10px solid #f6f6f6;
    width: 375px;
    img {
      width: 75px;
      height: 75px;
      border-radius: 12px;
      margin-right: 15px;
    }
    .listText {
      display: flex;
      flex-direction: column;
      width: 280px;
      justify-content: space-evenly;
      height: 85px;
      p {
        font-size: 18px;
      }
      .nickname {
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          margin-left: 5px;
          color: #648293;
        }
      }
    }
  }
  .tar-bar {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    p {
      color: #000;
      font-weight: bold;
    }
    div {
      span {
        &::after {
          content: "|";
          padding: 0 10px;
          color: rgba(100, 100, 100, 0.2);
        }
        &:last-child::after {
          content: "";
          padding: 0;
        }
      }
      .active {
        color: #000;
        font-weight: bold;
      }
    }
  }
  .comment-content {
    .content-text {
      display: flex;
      padding: 8px 0px 0px 16px;
      justify-content: space-between;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .text {
        width: 310px;
        padding: 0 16px 12px 0;
        border-bottom: 1px solid rgba(100, 100, 100, 0.2);
        font-size: 14px;
        position: relative;
        .time {
          transform: scale(0.8);
          font-size: 12px;
          position: relative;
          left: -30px;
          margin-top: 5px;
        }
        .content {
          font-size: 15px;
          margin-top: 15px;
          line-height: 25px;
        }
        .praise {
          position: absolute;
          right: 10px;
          top: 3px;
          display: flex;
          align-items: flex-end;
          img {
            width: 30px;
            height: 20px;
          }
        }
        .reply {
          color: #6a7d90;
          display: flex;
          align-items: center;
          margin-top: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
.comment-C {
  position: absolute;
  top: 65px;
  bottom: 0;
  right: 0;
  left: 0;
}
/deep/.content {
  display: block;
}
.reply {
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
}
.tar-bar1 {
  position: absolute;
  width: 100%;
  z-index: 9;
  top: 64px;
  background-color: #fff;
}
</style>
