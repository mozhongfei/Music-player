<template>
  <van-swipe :autoplay="3000" class="swiper">
    <van-swipe-item
      v-for="(image, index) in banners"
      :key="index"
      class="swiper-item"
    >
      <img v-lazy="image.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "HomeSwiper",
  data() {
    return {};
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
img {
  width: auto;
  height: 135px;
  border-radius: 7px;
}
.swiper-item {
  overflow: hidden;
  margin-top: 16px;
}
.swiper{
  text-align: center;
  background-color: #fff;
  width: 375px;
}
</style>
