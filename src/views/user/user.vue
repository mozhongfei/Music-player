<template>
  <div class="user">
    <user-narbar class="home-nar"></user-narbar>

    <scroll
      :class="['user-content', { btm: fShow }]"
      :probe-type="3"
      ref="scroll"
      :bounce="false"
    >
      <div class="user-logout" v-if="!isLogin">
        <div class="box"><img src="~assets/img/user/人员.svg" alt="" /></div>
        <p>立即登录</p>
        <van-icon name="arrow" color="#000" />
      </div>
      <div class="user-login" v-else>
        <div class="box"><img :src="userDetail.avatarUrl" alt="" /></div>
        <div class="user-text">
          <p>{{ userDetail.nickname }}</p>
          <p>Lv.{{ level }}</p>
        </div>
        <van-icon name="arrow" color="#000" />
      </div>

      <div class="comment">
        <div>
          <img src="~assets/img/user/下载.svg" alt="" />
          <span>本地/下载</span>
        </div>
        <div>
          <img src="~assets/img/user/上传.svg" alt="" />
          <span>云盘</span>
        </div>
        <div>
          <img src="~assets/img/user/已购.svg" alt="" />
          <span>已购</span>
        </div>
        <div>
          <img src="~assets/img/user/播放.svg" alt="" />
          <span>最近播放</span>
        </div>
        <div>
          <img src="~assets/img/user/我的好友.svg" alt="" />
          <span>我的好友</span>
        </div>
        <div>
          <img src="~assets/img/user/收 藏.svg" alt="" />
          <span>收藏和赞</span>
        </div>
        <div>
          <img src="~assets/img/user/播放(1).svg" alt="" />
          <span>我的博客</span>
        </div>
        <div>
          <p><img src="~assets/img/user/加.svg" alt="" /></p>
          <span>音乐应用</span>
        </div>
      </div>

      <div class="likesong" @click="gosongList(likeList.id)">
        <div class="like">
          <img
            src="~assets/img/user/喜欢.svg"
            alt=""
            v-if="!likeList.coverImgUrl"
          />
          <img :src="likeList.coverImgUrl" alt="" v-else class="user-img" />
        </div>
        <div class="like-text">
          <p>我喜欢的音乐</p>
          <p class="text-s">{{ countSong }}首</p>
        </div>
        <div class="like-model">
          <img src="~assets/img/user/model.jpg" alt="" />
          <span>心动模式</span>
        </div>
      </div>

      <div class="my-songlist">
        <h3>我的歌单({{ PlaylistCount }})</h3>
        <h5 v-if="!isLogin">暂无歌单</h5>
        <div v-else>
          <div
            v-for="(item, index) in playlist"
            :key="index"
            class="songCount"
            @click="gosongList(item.id)"
          >
            <img :src="item.coverImgUrl" alt="" class="song-img" />
            <div class="like-text">
              <p>{{ item.name }}</p>
              <p class="text-s">{{ item.trackCount }}首</p>
            </div>
            <img
              src="~assets/img/user/更.svg"
              alt=""
              class="more"
              @click.stop="clickMore(item.name)"
            />
          </div>
        </div>
      </div>
      <div class="foot"></div>
    </scroll>

    <van-popup
      v-model="show"
      class="popup"
      position="bottom"
      :close-on-popstate="true"
    >
      <div class="box">
        <p>歌单: {{ listname }}</p>
        <div class="box1" @click="goEdit"><img src="~assets/img/user/编辑.svg" alt=""> <span>编辑歌单信息</span></div>
        <div class="box1"><img src="~assets/img/common/垃圾桶.svg" alt=""> <span>删除</span></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { userDetail, subCount, account, UserList } from "network/user";
import Scroll from "components/common/scroll/Scroll.vue";
import userNarbar from "./childComps/userNarbar.vue";
import { Toast } from "vant";
export default {
  name: "user",
  data() {
    return {
      isLogin: false, // 是否登录
      userDetail: {}, // 我的信息
      PlaylistCount: 0, //喜欢歌曲数量
      user: {}, // 我的详情
      playlist: [], //我添加的歌单
      likeList: {}, // 我喜欢的歌单
      fShow: false, //判断有无歌单播放
      show: false, // 弹出框
      listname: "",
    };
  },
  methods: {
    getAccount() {
      account().then((res) => {
        // console.log(res);
        if (res.profile) {
          this.userDetail = res.profile;
          // console.log(this.userDetail);
          this.getUserDetail(this.userDetail.userId);
          this.getUserList(this.userDetail.userId);
        }
      });
    },
    getUserDetail(id) {
      userDetail(id).then((res) => {
        // console.log(res);
        this.user = res;
      });
    },
    getSubCount() {
      subCount().then((res) => {
        if (res.code != 301) {
          this.PlaylistCount = res.createdPlaylistCount - 1;
        }
        
      });
    },
    getUserList(id) {
      UserList(id).then((res) => {
        this.playlist.push(...res.playlist);
        this.likeList = this.playlist.splice(0, 1)[0];
        // console.log(this.likeList);
        // console.log(this.playlist);
        this.$nextTick(() => {
          this.$refs.scroll.fetchData();
        });
      });
    },
    gosongList(id) {
      if (this.isLogin) {
         this.$router.push({ path: "/songList", query: { id: id } });
      }else{
        Toast('请先登录')
         setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
      }
     
    },
    clickMore(e) {
      this.listname = e;
      this.show = true;
    },
    goEdit(){
      
    }
  },
  components: {
    userNarbar,
    Scroll,
  },
  created() {
    this.getAccount();
    this.getSubCount();
    this.isLogin = this.$store.state.user.isLogin;
    // console.log(this.isLogin);
  },
  computed: {
    level() {
      if (this.user) {
        return this.user.level;
      } else {
        return 0;
      }
    },
    countSong() {
      if (this.likeList.playCount) {
        return this.likeList.playCount;
      } else {
        return 0;
      }
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
};
</script>

<style scoped lang="less">
.user {
  min-height: 100vh;
  background-color: #f6f6f6;
  .user-logout {
    padding-bottom: 20px;
    margin: 0 0 0px 27px;
    display: flex;
    align-items: center;
    .box {
      width: 55px;
      height: 55px;
      border: 3px solid #fff;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 45px;
        height: 45px;
        position: relative;
        top: 7px;
        left: 2px;
      }
    }
    p {
      padding: 0 6px 0 12px;
      font-size: 20px;
      font-weight: 600;
      color: #000;
    }
  }
  .user-login {
    padding-bottom: 20px;
    margin: 0 0 0px 27px;
    display: flex;
    align-items: center;
    .box {
      width: 55px;
      height: 55px;
      border: 4px solid #fff;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 55px;
        height: 55px;
        position: relative;
        top: -2px;
        left: -4px;
      }
    }
    .user-text {
      width: 260px;
      padding: 0 6px 0 12px;
      p {
        &:first-child {
          font-size: 16px;
          font-weight: 600;
          color: #000;
        }
        &:last-child {
          font-size: 12px;
          background-color: #fff;
          line-height: 18px;
          text-align: center;
          border-radius: 14px;
          margin-top: 5px;
          width: 45px;
        }
      }
    }
  }

  .comment {
    margin: 0 16px;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    justify-content: space-evenly;
    height: 165px;
    border-radius: 10px;
    div {
      display: flex;
      flex-direction: column;
      width: 70px;
      justify-content: center;
      align-items: center;
      img {
        width: 35px;
        height: 35px;
      }
      span {
        margin-top: 5px;
        font-size: 12px;
      }
      &:last-child {
        p {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background-color: #f6f6f6;
          text-align: center;
          img {
            width: 20px;
            height: 20px;
            position: relative;
            top: 7px;
          }
        }
      }
    }
  }
  .likesong {
    width: 340px;
    height: 90px;
    margin: 18px 16px;
    border-radius: 10px;
    background-color: #fff;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .like {
      width: 55px;
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f6f6f6;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 25px;
        height: 25px;
      }
      .user-img {
        width: 100%;
        height: 100%;
      }
    }
    .like-text {
      width: 135px;
      .text-s {
        font-size: 13px;
        color: #999;
      }
    }
    .like-model {
      display: flex;
      align-items: center;
      font-size: 13px;
      border: 1px solid #eee;
      width: 90px;
      justify-content: center;
      height: 30px;
      border-radius: 30px;
      img {
        width: 20px;
        height: 18px;
      }
    }
  }
  .my-songlist {
    margin: 0 16px 0px;
    background-color: #fff;
    border-bottom: 1px solid #fff;
    h3 {
      text-align: center;
      padding: 10px 0;
    }
    h5 {
      padding: 30px;
      text-align: center;
    }
    .songCount {
      width: 340px;
      margin: 10px 16px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      p {
        &:first-child {
          font-size: 16px;
          color: #000;
        }
        &:last-child {
          font-size: 12px;
          line-height: 18px;
          margin-top: 5px;
        }
      }
      img {
        width: 55px;
        height: 55px;
        border-radius: 10px;
        margin-right: 10px;
      }
      .more {
        position: absolute;
        right: 16px;
        width: 25px;
        height: 25px;
      }
    }
  }
  .foot {
    height: 20px;
  }
}
.user-content {
  position: absolute;
  top: 48px;
  bottom: 100px;
  right: 0;
  left: 0;
}
.btm {
  bottom: 50px;
}
/deep/.content {
  display: block;
}
.popup {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.box{

  p{
    line-height: 50px;
    font-size: 14px;
    padding: 0 16px;
    border-bottom: 1px solid rgba(100,100,100,.2);
  }
  .box1{
    padding: 10px 16px;
    display: flex;
    align-items: center;
    img{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
}
</style>
