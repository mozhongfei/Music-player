<template>
  <div>
    <nav-bar class="user-bar">
      <div slot="left" class="left" @click="showPopup">
        <van-badge dot v-if="false">
          <img src="~assets/img/home/akg.svg" alt="" />
        </van-badge>
        <div v-else><img src="~assets/img/home/akg.svg" alt="" /></div>
      </div>
      <div slot="center" class="center" @click="gologin" v-if="!login">
        <div class="box"><img src="~assets/img/user/人员.svg" alt="" /></div>
        <p>立即登录</p>
      </div>
      <div slot="right" class="right" @click="search">
        <van-icon name="search" size="25px" color="#000" />
      </div>
    </nav-bar>
    <van-popup
      v-model="show"
      position="left"
      :lock-scroll="false"
      :close-on-popstate="true"
    >
      <navbar-left></navbar-left>
    </van-popup>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavbarLeft from "views/home/childComps/NavbarLeft.vue";
export default {
  name: "userNarbar",
  data() {
    return {
      value: "",
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    search(){
      this.$router.push("/search")
    },
    gologin(){
      this.$router.push("/login")
    },
  },
  components: {
    NavBar,
    NavbarLeft,
  },
  computed: {
    login() {
      return this.$store.state.user.isLogin;
    },
  }
};
</script>

<style scoped lang="less">
.user-bar {
  margin-top: 4px;
  background-color: #f6f6f6;
  img {
    width: 25px;
    height: 25px;
  }
  .left {
    text-align: center;
    line-height: 20px;
    .van-badge__wrapper {
      height: 20px;
    }
  }
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div.box {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #f7f3f1;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 30px;
        height: 30px;
        position: relative;
        top: 7px;
      }
    }
  }
}

</style>
