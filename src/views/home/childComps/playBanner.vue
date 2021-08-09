<template>
  <div class="playBanner" v-if="Object.keys(playitem).length !== 0">
    <div class="playBanner-title">
      <div class="playBanner-top">
        <span
          v-for="(item, index) in tabC"
          :key="index"
          :class="['pop', { active: index === currentIndex }]"
          @click="tabClick(index)"
          >{{ item }}</span
        >
      </div>
      <div class="playBanner-more" @click="goNewSong">
        <p>更多</p>
        <van-icon name="arrow" />
      </div>
    </div>
    <newsong :creatives="this.creatives()" class="playBanner-C"></newsong>

    <cloud></cloud>

  </div>
</template>

<script>
import Cloud from './Cloud.vue'
import Newsong from './Newsong.vue'

export default {
  name: "playBanner",
  data() {
    return {
      currentIndex: 0,
      tabC: [],
      creatives: {},
      // tabL: ["Newsong", "Newdisc", "Album"],
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
  components:{
    Cloud,
    Newsong,
  },
  created() {
    this.creatives = () => {
      if (this.currentIndex == 0) {
        return this.playitem.creatives.filter(
          (e) => e.creativeType == "NEW_SONG_HOMEPAGE"
        );
      } else if (this.currentIndex == 1) {
        return this.playitem.creatives.filter(
          (e) => e.creativeType == "NEW_ALBUM_HOMEPAGE"
        );
      } else {
        return this.playitem.creatives.filter(
          (e) => e.creativeType == "DIGITAL_ALBUM_HOMEPAGE"
        );
      }
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
    },
    goNewSong() {
      this.$router.push({path:"/newSongs", query:{type: '推荐'} })
    }
  },
  mounted() {
    this.playitem.creatives.forEach((e) => {
      if (!this.tabC.some((t) => t == e.uiElement.mainTitle.title)) {
        this.tabC.push(e.uiElement.mainTitle.title);
      }
    });
  },
};
</script>

<style scoped lang="less">
.playBanner {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #fff;
  width: 375px;
  .playBanner-title {
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    margin: 0 16px;
    .playBanner-top {
      display: flex;
      justify-content: space-between;
      span {
        margin-right: 10px;
      }
    }
    .playBanner-more {
      border: 1px solid #000;
      border-radius: 25px;
      width: 55px;
      display: flex;
      font-size: 13px;
      align-items: center;
      justify-content: center;
      height: 25px;
      .van-icon {
        vertical-align: text-top;
      }
    }
  }

  .playBanner-content {
    white-space: nowrap;
  }
  .pop {
    color: #9d9d9d;
    font-size: 18px;
    font-weight: 600;
    &::after {
      content: "|";
      position: relative;
      top: -2px;
      right: -5px;
      color: #eee;
    }
    &:last-child::after {
      content: "";
    }
  }
  .active {
    color: #343434;
  }
  .playBanner-C{
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(200, 200, 200, .4);
  }
}
</style>
