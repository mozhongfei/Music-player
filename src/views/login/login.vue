<template>
  <div class="login">
    <div class="logo">
      <img src="~assets/img/login/网易云.svg" alt="" />
    </div>
    <div class="button" @click="toLogin">
      <van-button round block color="#c65758" plain>手机号登录</van-button>
    </div>
    <div class="login-other">
      <ul class="login-other-list">
        <li @click="toLogin">
          <img src="~assets/img/login/微信.svg" alt="" />
        </li>
        <li @click="toLogin">
          <img src="~assets/img/login/qq.svg" alt="" />
        </li>
        <li @click="toLogin">
          <img src="~assets/img/login/微博.svg" alt="" />
        </li>
        <li @click="toLogin">
          <img src="~assets/img/login/网易.svg" alt="" />
        </li>
      </ul>
    </div>
    <div class="footer">
      <p>
        <span>登录即已同意</span>
        <span>《用户协议》</span>
        <span>《隐私政策》</span>
        <span>《儿童隐私政策》</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    toLogin() {
        this.$router.push('/phone')
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background-color: #d83325;
  .logo {
    width: 75px;
    margin: 0 auto;
    img {
      width: 75px;
      height: 75px;
      margin: 125px auto 210px;
    }
  }
  .button {
    width: 265px;
    height: 50px;
    margin: 0 auto;
  }
  .login-other-list {
    display: flex;
    width: 265px;
    margin: 25px auto;
    justify-content: space-between;
    img {
      width: 40px;
      height: 40px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
  .footer{
      p{
          width: 312px;
          margin: 0 auto;
          transform: scale(0.80);
          span{
              font-size: 12px;
              color: #eee;
              &:first-child{
                  font-size: 12px;
                  color: #aaa;
              }
          }
      }
  }
}
</style>

