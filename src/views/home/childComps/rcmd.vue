<template>
  <div class="rcmd">
    <div class="rcmd-title">
      <span
        ><van-icon name="replay" class="replay" />{{
          playitem.uiElement.subTitle.title
        }}</span
      >
      <div class="rcmd-more" @click="playsong">
        <van-icon name="play" />
        <p>{{ playitem.uiElement.button.text }}</p>
      </div>
    </div>
    <newsong
      :creatives="playitem.creatives"
      :showType="playitem.showType"
      class="playBanner-C"
    ></newsong>
  </div>
</template>

<script>
import Newsong from "./Newsong.vue";

export default {
  name: "rcmd",
  data() {
    return {
      ids: [],
    };
  },
  props: {
    playitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    playsong() {
      // console.log(this.playitem);
      let id = this.random()
      this.$bus.$emit("detailSong", this.playitem.creatives, id);
    },
    random() {
      let i = Math.floor(Math.random()*this.ids.length)
      return this.ids[i]
    }
  },
  mounted() {
    this.playitem.creatives.forEach((item) => {
      item.resources.forEach((e) => {
        this.ids.push(e.resourceId);
      });
    });
  },
  components: {
    Newsong,
  },
};
</script>

<style scoped lang="less">
.rcmd {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #fff;
  width: 375px;
}
.rcmd-title {
  display: flex;
  width: 335px;
  justify-content: space-between;
  height: 50px;
  margin: 0 16px;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: 600;
    width: 240px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/deep/.playBanner-text {
  width: 210px;
  overflow: hidden;
}
.rcmd-more {
  border: 1px solid #000;
  border-radius: 25px;
  padding: 0 8px;
  display: flex;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  height: 25px;
  .van-icon {
    vertical-align: text-top;
  }
}
.replay {
  vertical-align: top;
}
</style>
