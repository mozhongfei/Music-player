<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scorll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 3,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    scrollX: {
      type: Boolean,
      default: false,
    },
    scrollY: {
      type: Boolean,
      default: true,
    },
    ck: {
      type: Boolean,
      default: true,
    },
    bounce: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    fetchData() {
      // console.log(11);
      this.scroll && this.scroll.refresh();
    },
  },
  watch: {
    //   刷新页面能正确计算高度
    scroll() {
      setTimeout(() => {
        this.fetchData();
        // console.log("监听执行refresh方法");
      }, 300);
    },
  },
  components: {},
  mounted() {
    //  创建scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: this.ck,
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      pullUpLoad: this.pullUpLoad,
      bounce: this.bounce,
      // stopPropagation: true,
    });
    // 监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    // 监听触摸事件
    this.scroll.on("touchEnd",(pos, ) => {
      // console.log(pos);
      this.$emit("touchEnd", pos);
    });
    // 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
.content {
  display: inline-block;
}
</style>
