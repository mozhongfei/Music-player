<template>
  <div class="homeleft">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <span>{{ title }}</span>
    <div class="right">
      <slot name="right"><van-icon name="arrow" /></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeLeft",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped lang="less">
.homeleft {
  margin: 0 0 0 16px;
  padding: 16px 16px 16px 0;
  span {
    font-size: 16px;
    margin-left: 12px;
  }
  .vicon {
    position: relative;
    top: -2px;
  }
  .right {
    display: flex;
  }
}
</style>
