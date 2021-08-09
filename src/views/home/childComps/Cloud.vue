<template>
  <div v-if="Object.keys(cloud).length !== 0">
    <div class="playBanner-title">
      <span>{{ cloud.uiElement.subTitle.title }}</span>
    </div>

    <newsong :creatives="cloud.creatives"></newsong>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import Newsong from "./Newsong.vue";

export default {
  name: "Cloud",
  data() {
    return {
      cloud: {},
      detail: "",
    };
  },
  created() {
    this.cloud = this.$store.state.SLIDE_SINGLE_SONG;
  },
  methods: {},
  components: {
    Scroll,
    Newsong,
  },
};
</script>

<style scoped lang="less">
.playBanner-title {
  height: 30px;
  margin: 10px 20px 0;
  span {
    line-height: 30px;
    font-size: 14px;
    color: #000;
  }
}
</style>
