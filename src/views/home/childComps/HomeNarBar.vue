<template>
  <div>
    <nav-bar class="home-bar">
      <div slot="left" class="left" @click="showPopup">
        <van-badge dot v-if="false">
          <img src="~assets/img/home/akg.svg" alt="" />
        </van-badge>
        <div v-else><img src="~assets/img/home/akg.svg" alt="" /></div>
      </div>
      <div slot="center">
        <van-search
          v-model="value"
          shape="round"
          background="#fff"
          :placeholder="showKeyword"
          @click="searchSong"
        />
      </div>
      <div slot="right" class="right">
        <img src="~assets/img/home/wer.svg" alt="" />
      </div>
    </nav-bar>
    <van-popup
      v-model="show"
      position="left"
      :lock-scroll="false"
      :close-on-popstate="true"
      >
      <navbar-left></navbar-left>
      </van-popup
    >
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import NavbarLeft from './NavbarLeft.vue'
import { getNarBar } from "network/home";

export default {
  name: "HomeNarBar",
  data() {
    return {
      value: "",
      showKeyword: "",
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    searchSong() {
      this.$router.push('/search')
    },
  },
  components: {
    NavBar,
    NavbarLeft,
  },
  created() {
    getNarBar().then((res) => {
      this.showKeyword = res.data.showKeyword;
    });
  },
};
</script>

<style scoped lang="less">
.left {
  text-align: center;
  line-height: 20px;
  .van-badge__wrapper {
    height: 20px;
  }
  img {
    width: 20px;
    height: 20px;
  }
}
.van-search {
  padding: 5px 5px;
}
.right {
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
