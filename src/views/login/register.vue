<template>
  <div>
    <nav-bar class="rs-bar">
      <div slot="left" @click="titleBack">
        <van-icon name="arrow-left" />
      </div>
      <div slot="center">{{ titleName }}</div>
    </nav-bar>

    <div style="margin-top: 50px">
      <div style="text-align: center; padding-top: 50px"></div>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="nickname"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="phone"
        type="phone"
        name="phone"
        label="电话"
        placeholder="请输入电话号码"
        :rules="[{ pattern, message: '请填写正确的电话号码' }]"
        :error-message="text"
        @input="change"
      >
        <template #button>
          <van-button
            size="small"
            type="danger"
            native-type="button"
            @click="getCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <van-field
        v-model="captcha"
        name="captcha"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写正确的验证码' }]"
      />
      <div style="margin: 16px">
        <div class="link-login" @click="$router.push('/phone')">
          已有账号,立刻登录
        </div>
        <van-button round block type="info" native-type="submit" color="#f12a25"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { Register, sent, captcha } from "network/login";
import { Toast } from "vant";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      captcha: "",
      pattern: /^1[3|4|5|7|8|9][0-9]{9}$/,
      text: "",
    };
  },
  methods: {
    change() {
      this.text = "";
    },
    // 返回上一页面
    titleBack() {
      this.$router.back();
    },
    // 获取验证码
    getCode() {
      if (this.pattern.test(this.phone)) {
        sent(this.phone).then((res) => {
          if (res.data) {
            Toast("验证码发送成功");
          } else {
            Toast("验证码发送失败,请重新发送");
          }
        });
      } else {
        this.text = "请填写正确的电话号码";
      }
    },
    // 提交
    onSubmit(values) {
      console.log("submit", values);
      captcha({ phone: values.phone, captcha: values.captcha }).then((res) => {
        if (res.data) {
          Register(values).then((res) => {
            if(res.code == 250){
              Toast("电话已注册");
            }
            // if (res.status == "201") {
            //   Toast.success("注册成功");
            //   setTimeout(() => {
            //     this.$router.push("/login");
            //   }, 1000);
            // }
          });
        }else{
            Toast("请填写正确的验证码")
        }
      });
    },
  },
  components: {
    NavBar,
  },
  computed: {
    titleName() {
      return this.$route.query.name;
    },
  },
};
</script>

<style scoped>
.rs-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.link-login {
  font-style: 14px;
  margin-bottom: 20px;
  color: #42b983;
}
</style>
