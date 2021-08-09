<template>
  <div class="login">
    <nav-bar class="login-bar">
      <div slot="left" @click="titleBack">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">手机账号登录</div>
    </nav-bar>

    <van-form @submit="onSubmit" class="formmit">
      <van-field
        v-model="value"
        name="phone"
        label="电话"
        placeholder="请输入手机号"
        :rules="[{ pattern, message: '请填写正确的手机号' }]"
        clickable
        @touchstart.native.stop="show = true"
        @blur="show = false"
      />
      <van-number-keyboard
        v-model="value"
        :show="show"
        :maxlength="11"
        @blur="show = false"
      />
      <div class="password">
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          clickable
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="Retrieve" @click="retrieve">找回密码</div>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" color="#f12a25"
          >登录</van-button
        >
        <van-button
          round
          block
          plain
          color="#000"
          style="margin-top: 16px"
          @click="goRegister"
          native-type="button"
          >还没有账号，去注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { login, checkPhone } from "network/login";
import { Toast } from "vant";

export default {
  name: "login",
  data() {
    return {
      value: "",
      password: "",
      show: false,
      pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
    };
  },
  methods: {
    // 返回主页面
    titleBack() {
      this.$router.push("/home");
    },
    // 登录
    onSubmit(values) {
      // console.log("submit", values);
      checkPhone(values.phone).then((res) => {
        if (res.hasPassword) {
          this.goLogin(values);
          this.value = "";
          this.password = "";
        } else {
          Toast("手机未注册，请先注册");
        }
      });
    },
    //修改密码
    retrieve() {
      // this.$router.push({path:'/register',query:{name:'找回密码'}});
    },
    // 去注册
    goRegister() {
      this.$router.push({ path: "/register", query: { name: "用户注册" } });
    },
    // 登录接口
    goLogin(data) {
      login(data).then((res) => {
        if (res.code == 200) {
          window.localStorage.setItem("token", res.cookie);
          this.$store.commit("setIsLogin", true);
          Toast.success("登录成功");
          setTimeout(() => {
            this.$router.push("/home");
          }, 1000);
        }else{
          Toast.fail(res.message);
        }
      });
    },
  },
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.login-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.formmit {
  margin-top: 64px;
}
.image {
  width: 100%;
}
.Retrieve {
  height: 40px;
  line-height: 40px;
  position: absolute;
  color: #999;
  top: 3px;
  font-size: 13px;
  right: 25px;
}
.password {
  position: relative;
}
</style>
