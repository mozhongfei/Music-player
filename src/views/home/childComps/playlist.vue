<template>
  <div>
    <div v-for="(item, index) in playlists" :key="index">
      <playitem @homeImgLoaded="ImgLoaded" :playitem="item" v-if="itemShow('HOMEPAGE_SLIDE_PLAYLIST',item)" />
      <playitem @homeImgLoaded="ImgLoaded" :playitem="item" v-else-if="itemShow('SLIDE_VOICELIST',item)" />
      <play-banner :playitem="item" v-else-if="itemShow('HOMEPAGE_NEW_SONG_NEW_ALBUM',item)"/>
      <rcmd :playitem="item" v-else-if="itemShow('HOMEPAGE_SLIDE_SONGLIST_ALIGN',item)"/>
      <play-ball :playitem="item" v-else-if="itemShow('SLIDE_PLAYABLE_DRAGON_BALL',item)"></play-ball>
      <shuffle-mlog  @homeImgLoaded="ImgLoaded" :playitem="item" v-else-if="itemShow('SHUFFLE_MLOG',item)"></shuffle-mlog>
      <calendar  @homeImgLoaded="ImgLoaded" :playitem="item" v-else-if="itemShow('SHUFFLE_MUSIC_CALENDAR',item)"/>
    </div>
  </div>
</template>

<script>
import playitem from "./playitem.vue";
import playBanner from "./playBanner.vue";
import playBall from './playBall.vue'
import ShuffleMlog from './ShuffleMlog.vue'
import Rcmd from './rcmd.vue';
import Calendar from './calendar.vue';

export default {
  name: "playlist",
  data() {
    return {
    };
  },
  props: {
    // 传进来的首页每一个子项目
    playlists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    itemShow() {
      return (e,item) => {
        return item.showType == e
      };
    },
  },
  methods: {
    ImgLoaded() {
      this.$emit("homeImgLoaded");
    },
  },
  mounted() {
  },
  components: {
    playitem,
    playBanner,
    playBall,
    ShuffleMlog,
    Rcmd,
    Calendar,
  },
};
</script>

<style scoped>
</style>
