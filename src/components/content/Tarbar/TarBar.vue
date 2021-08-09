<template>
  <van-tabbar v-model="active" active-color="red" route>
    <van-tabbar-item icon="home-o"  to="/home">发现</van-tabbar-item>
    <van-tabbar-item icon="eye-o"  to="/podcast">播客</van-tabbar-item>
    <van-tabbar-item icon="music-o"  to="/user">我的</van-tabbar-item>
    <van-tabbar-item icon="bullhorn-o"  to="/Ksong">K歌</van-tabbar-item>
    <van-tabbar-item icon="friends-o" dot to="/LangVan">云村</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "TarBar",
  data() {
    return {
      active: 0,
    };
  },
  methods: {},
  components: {},
};
</script>

<style scoped>

</style>
