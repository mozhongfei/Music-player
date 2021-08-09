<template>
  <div id="app">
      <router-view
        @Song="Song"
        :audioD="() => audioD"
        @change="change"
        :toplay="toggleplay"
        :canplay="canplay"
      />


    <div>
      <play-song
        :class="['position', { posiTop: show }]"
        v-show="Lshow"
        :single="single"
        @playAudio="playAudio"
        :nowmodel="model"
        @playpause="playpause"
        @canplayFun="canplayFun"
      ></play-song>
      <tar-bar v-if="show"></tar-bar>
    </div>
  </div>
</template>
<script>
import playSong from "components/content/play/playSong.vue";
import TarBar from "components/content/Tarbar/TarBar.vue";

export default {
  name: "App",
  components: {
    playSong,
    TarBar,
  },
  data() {
    return {
      show: false,
      path: ["/home", "/podcast", "/Ksong", "/user", "/LangVan"], //在这些路由里显示tarbar
      Lpath: ["/login", "/phone", "/register", "/song",'/commentList'], // 在这些路由里不显示playsong
      Lshow: true,
      single: {}, //单曲详情
      audioD: "", // audio节点
      model: "cycle", //播放模式
      toggleplay: false, //播放or暂停
      canplay: 0, // 播放总时间
    };
  },
  methods: {
    //  获取播放总时间
    canplayFun(e) {
      this.canplay = e;
    },
    // 播放或者暂停
    playpause(e) {
      this.toggleplay = e;
    },
    // 获取播放模式
    change(e) {
      this.model = e;
    },
    // 获取audio节点
    playAudio(e) {
      this.audioD = e;
    },
    //  获取歌曲
    Song(e) {
      this.single = e;
    },
    getPath(to, from) {
      const aa = this.path.find((e) => e == to.path);
      const bb = this.Lpath.find((e) => e == to.path);
      if (aa) {
        this.show = true;
      } else {
        this.show = false;
      }
      if (bb) {
        this.Lshow = false;
      } else {
        this.Lshow = true;
      }
    },
  },
  mounted() {
   this.getPath(this.$route);
  },
  watch: {
    $route(to, from) {
      this.getPath(to, from);
    },
  },
};
</script>
<style lang="less">
@import "assets/css/base.css";
.position {
  position: fixed;
  z-index: 9;
  bottom: 0;
}
.posiTop {
  bottom: 49px;
}
</style>
