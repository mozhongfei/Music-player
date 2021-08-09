<template>
  <div class="ball">
    <div class="ball-title">
      <span>{{ playitem.uiElement.subTitle.title }}</span>
    </div>
    <scroll class="ball-s" :probe-type="3" :scrollX="true" :scrollY="false">
      <div class="content-ball">
        <div
          v-for="(item, index) in playitem.creatives"
          :key="index"
          class="ball-item"
        >
          <div class="img-item">
            <img v-lazy="item.uiElement.image.imageUrl" alt="" />
            <p></p>
          </div>
          <div class="ball-text">{{ item.uiElement.mainTitle.title }}</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "playBall",
  data() {
    return {};
  },
  props: {
    // 子项目里面的每一个内容
    playitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {},
  methods: {},
  components: {
    Scroll,
  },
};
</script>

<style scoped lang="less">
.ball {
  font-size: 14px;
  padding-bottom: 16px;
  margin-bottom: 12px;
  width: 375px;
  border-radius: 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  white-space: nowrap;
}
.img-item {
  margin-bottom: 8px;
  position: relative;
  p {
    position: absolute;
    width: 25px;
    height: 25px;
    top: calc(50% - 12px);
    left: calc(50% - 12px);
    background: url("~assets/img/common/bofang02.svg") no-repeat 0 0 / cover;
  }
}

.ball-item {
  display: inline-block;
  margin: 0 10px;
  &:last-child {
    margin-right: 0;
  }
  &:first-child {
    margin-left: 0;
  }
  .ball-text {
    width: 95px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.content-ball {
  margin: 0 16px;
}
.ball-item img {
  width: 95px;
  width: 95px;
  border-radius: 50%;
  margin-top: 4px;
  height: auto;
}
.ball-title {
  height: 50px;
  margin: 0 16px;
  line-height: 50px;
  text-align: left;
  span {
    font-size: 18px;
    font-weight: 600;

    color: #000;
  }
}
</style>
