<template>
  <div class="NavbarLeft">
    <van-nav-bar class="van-nav">
      <template #left>
        <div @click="getlogin" class="top-van" v-if="userShow">
          <van-icon name="user-circle-o" size="18" color="#666" />
          <span class="left-title">立即登录</span>
          <van-icon name="arrow" size="18" color="#666" />
        </div>
        <div @click="getUser" class="top-van" v-else>
          <img :src="userDetail.avatarUrl" alt="" class="top-img" />
          <span class="left-title">{{ userDetail.nickname }}</span>
          <van-icon name="arrow" size="18" color="#666" />
        </div>
      </template>
      <template #right>
        <img src="~assets/img/common/扫描.svg" alt="" class="imgIco" />
      </template>
    </van-nav-bar>

    <scroll
      class="NavbarLeft-content"
      :probe-type="3"
      ref="scroll"
      :bounce="false"
    >
      <img src="~assets/img/home/vip.jpg" alt="" class="img1" />

      <div class="message">
        <home-left :title="'我的消息'" class="border">
          <van-icon name="envelop-o" size="20" class="vicon" slot="left" />
        </home-left>
        <home-left :title="'云贝中心'" class="narbar-ico">
          <img
            src="~assets/img/common/云.svg"
            alt=""
            slot="left"
            class="vicon"
          />
          <template v-slot:right>
            <span class="smallT">做任务赚云贝</span>
            <van-icon name="arrow" />
          </template>
        </home-left>
      </div>

      <div class="message">
        <p class="border title-top">音乐服务</p>
        <home-left :title="'云村有票'">
          <img
            src="~assets/img/common/票.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'商城'" class="narbar-ico">
          <van-icon
            name="shopping-cart-o"
            slot="left"
            class="vicon"
            size="20"
          />
          <template v-slot:right>
            <span class="smallT">耳机限时零元抢</span>
            <van-icon name="arrow" />
          </template>
        </home-left>
        <home-left :title="'游戏专区'" class="narbar-ico">
          <img
            src="~assets/img/pop/游戏.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'口袋彩铃'" class="narbar-ico">
          <img
            src="~assets/img/pop/彩铃.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
      </div>

      <div class="message">
        <p class="border title-top">其他</p>
        <home-left :title="'设置'">
          <img
            src="~assets/img/pop/设置.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'夜间模式'" class="narbar-ico">
          <img
            src="~assets/img/pop/月亮.svg"
            alt=""
            slot="left"
            class="vicon"
          />
          <template v-slot:right>
            <van-switch
              v-model="checked"
              active-color="#ee0a24"
              inactive-color="#dcdee0"
              size="18px"
            />
          </template>
        </home-left>
        <home-left :title="'定时关闭'" class="narbar-ico">
          <img
            src="~assets/img/pop/定时关闭.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'个性装扮'" class="narbar-ico">
          <img
            src="~assets/img/pop/个性装扮.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'边听边存'" class="narbar-ico">
          <img
            src="~assets/img/pop/听歌.svg"
            alt=""
            slot="left"
            class="vicon"
          />
          <template v-slot:right>
            <span class="smallT">未开启</span>
            <van-icon name="arrow" />
          </template>
        </home-left>
        <home-left :title="'在线听歌免流量'" class="narbar-ico">
          <img
            src="~assets/img/pop/在线听歌免流量.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'音乐黑名单'" class="narbar-ico">
          <img
            src="~assets/img/pop/黑名单.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'青少年模式'" class="narbar-ico">
          <img
            src="~assets/img/pop/保护.svg"
            alt=""
            slot="left"
            class="vicon"
          />
          <template v-slot:right>
            <span class="smallT">未开启</span>
            <van-icon name="arrow" />
          </template>
        </home-left>
        <home-left :title="'音乐闹钟'" class="narbar-ico">
          <img
            src="~assets/img/pop/闹钟.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
      </div>

      <div class="message">
        <home-left :title="'我的订单'">
          <img
            src="~assets/img/pop/订单.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'优惠劵'" class="narbar-ico">
          <img
            src="~assets/img/pop/优惠卷.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'我的客服'" class="narbar-ico">
          <img
            src="~assets/img/pop/客服.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'分享网易云音乐'" class="narbar-ico">
          <img
            src="~assets/img/pop/分享.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
        <home-left :title="'关于'" class="narbar-ico">
          <img
            src="~assets/img/pop/关于.svg"
            alt=""
            slot="left"
            class="vicon"
          />
        </home-left>
      </div>

      <div class="message" v-if="logout" @click="userLogout">
        <div class="colse">退出登录</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import HomeLeft from "components/common/navbar/HomeLeft";
import Scroll from "components/common/scroll/Scroll.vue";
import { logout } from "network/login";
import { account } from "network/user";
import { Toast } from "vant";

export default {
  name: "NavbarLeft",
  data() {
    return {
      checked: false,
      userShow: true,
      userDetail: {},
    };
  },
  methods: {
    // 跳转登录
    getlogin() {
      this.$router.push("/login");
    },
    // 退出登录
    userLogout() {
      logout().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          Toast.success("退出成功");
          window.localStorage.setItem("token", "");
          this.$store.commit("setIsLogin", false);
          this.userShow = true
          setTimeout(() => {
            this.$router.push("/login");
          }, 500);
        }
      });
    },
    getUser() {
      this.$router.push({
        path: "/user",
      });
    },
    getUserDetail() {
      account().then((res) => {
        if (res.profile) {
          this.userShow = false;
          this.userDetail = res.profile;
          // console.log(this.userDetail)
        }
      });
    },
  },
  updated() {
    if (this.$store.state.user.isLogin) {
      this.getUserDetail();
    }
  },
  components: {
    HomeLeft,
    Scroll,
  },
  computed: {
    logout() {
      return this.$store.state.user.isLogin;
    },
  },
  created() {
    this.getUserDetail();
  },
  watch: {},
};
</script>

<style scoped lang="less">
.NavbarLeft {
  width: 300px;
  height: 100vh;
  background-color: #f6f6f6;
  .img1 {
    width: 285px;
    height: 120px;
    display: block;
    margin: 0 auto;
    border-radius: 25px;
  }
  .message {
    margin: 16px 16px;
    background-color: #fff;
    border-radius: 8px;
    .border {
      border-bottom: 1px solid rgba(100, 100, 100, 0.2);
    }
    img {
      width: 20px;
      height: 20px;
    }
    .smallT {
      font-size: 12px;
      position: relative;
      top: 1px;
      color: #aeaeae;
      margin-right: 10px;
    }
  }
}
.van-nav {
  .imgIco {
    width: 18px;
    height: 18px;
  }
  &::after {
    content: "";
    border: none;
  }
}
.left-title {
  margin: 0 5px;
  font-size: 18px;
}
.title-top {
  padding: 16px;
  font-size: 14px;
  color: #aeaeae;
}
.NavbarLeft-content {
  width: 100%;
  height: calc(100% - 46px);
}
/deep/.content {
  width: 100%;
}
.colse {
  color: red;
  padding: 16px;
  text-align: center;
}
.top-van {
  display: flex;
  align-items: center;
  .top-img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
}
</style>
