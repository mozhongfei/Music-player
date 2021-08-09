<template>
  <div class="reply">
    <div class="reply-top">
      <div class="left">
        <img src="~assets/img/login/箭头.svg" alt="" @click="back" />
        <span>回复({{ totalCount }})</span>
      </div>
    </div>

    <scroll
      class="reply-C"
      :probe-type="3"
      ref="scroll"
      :bounce="false"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <div class="reply-content">
        <div class="reply-text reply-user" v-if="user.user">
          <img :src="user.user.avatarUrl" alt="" />
          <div class="text">
            <p>{{ user.user.nickname }}</p>
            <p class="time">{{ publishtime }}</p>
            <p class="content">{{ user.content }}</p>
            <div class="praise" @click="getliked">
              <span>{{ user.likedCount | playCountFilter }}</span>
              <img src="~assets/img/songlist/点赞.svg" alt="" v-if="liked" />
              <img src="~assets/img/songlist/点赞(1).svg" alt="" v-else />
            </div>
          </div>
        </div>

        <div class="allreply">全部回复</div>

        <div class="reply-text" v-for="(item, index) in comments" :key="index">
          <img :src="item.user.avatarUrl" alt="" />
          <div class="text reply-S">
            <p>{{ item.user.nickname }}</p>
            <p class="time">{{ publishtime1(index) }}</p>
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
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import { commentFloor, commentLike } from "network/comment";
import { getTime } from "common/utils";
export default {
  name: "reply",
  data() {
    return {
      replyData: {
        parentCommentId: 0,
        id: "",
        type: 2,
        time: 0,
      },
      user: {},
      comments: [],
      liked: true,
      praise: [],
      totalCount: 0, //总回复
      givePraise: {
        id: 0, // 歌单id
        cid: 0, // 评论id
        type: 2, // 评论类型是歌单内的评论
        t: 1, // 1点赞 0取消点赞
      },
    };
  },
  props: {
    cid: Number,
    id: String,
    type: String
  },
  methods: {
    getliked() {
      this.liked = !this.liked;
      if (this.liked) {
        this.user.likedCount -= 1;
      } else {
        this.user.likedCount += 1;
      }
    },
    giveP(i) {
      let el = !this.praise[i];
      this.givePraise.cid = this.comments[i].commentId;
      this.givePraise.type = this.type
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
    loadMore() {
      this.getcommentFloor(this.replyData);
    },
    back() {
      this.$emit("back")
    },
    getcommentFloor(data) {
      commentFloor(data).then((res) => {
        // console.log(res);
        this.comments.push(...res.data.comments);
        this.replyData.time = this.comments[20 - 1].time;
        this.comments.forEach((element) => {
          this.praise.push(element.liked);
        });
        // console.log(this.user);
        this.$nextTick(() => {
          this.$refs.scroll.fetchData();
          this.$refs.scroll.finishPullUp();
        });
      });
    },
    getonce(data) {
      (this.praise = []), (this.comments = []), (this.user = {});
      commentFloor(data).then((res) => {
        console.log(res);
        this.totalCount = res.data.totalCount;
        this.user = res.data.ownerComment;
        this.comments = res.data.comments;
        this.replyData.time = res.data.comments[res.data.comments.length - 1].time;
        this.comments.forEach((element) => {
          this.praise.push(element.liked);
        });
        // console.log(this.user);
        this.$nextTick(() => {
          this.$refs.scroll.fetchData();
          this.$refs.scroll.finishPullUp();
          this.$refs.scroll.scrollTo(0, 0, 0);
        });
      });
    },
    getId() {
      this.replyData.id = this.id;
      this.replyData.type = this.type
      this.replyData.parentCommentId = this.cid;
      this.replyData.time = 0;
    },
  },
  components: {
    Scroll,
  },
  created() {
    this.getId();
    // console.log(this.replyData);
    this.getonce(this.replyData);

    
  },
  mounted() {},
  computed: {
    publishtime() {
      let time = new Date(this.user.time);
      return getTime(time, 0) + getTime(time, 1) + getTime(time, 2);
    },
    publishtime1() {
      return (index) => {
        let time = new Date(this.comments[index].time);
        return getTime(time, 0) + getTime(time, 1) + getTime(time, 2);
      };
    },
  },
  watch: {
    cid() {
      this.getId();
      console.log(this.replyData);
      this.getonce(this.replyData);
    },
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
.reply {
  width: 100%;
  background-color: #fff;
  height: calc(100vh - 65px);
  .reply-top {
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
}
.reply-user {
  border-bottom: 10px solid #eee;
}
.reply-S {
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}
.reply-content {
  .reply-text {
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
    }
  }
}
.reply-C {
  position: absolute;
  top: 65px;
  bottom: 0;
  right: 0;
  left: 0;
}
/deep/.content {
  display: block;
}
.allreply {
  font-weight: 600;
  font-size: 16px;
  padding: 16px;
  color: #000;
}
</style>
