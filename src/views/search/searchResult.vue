<template>
  <div class="Sresult">
    <div class="search-top">
      <img src="~assets/img/login/箭头.svg" alt="" @click="back" />
      <input
        type="text"
        v-model="value"
        background="#fff"
        class="input"
        @keyup.enter="searchSong"
        @input="Suggest"
      />
      <span class="del" v-show="value" @click="removeValue"></span>
    </div>
    <div class="flash" @click="allplay">
      <img src="~assets/img/search/播放.svg" alt="" />
      <span>播放全部</span>
    </div>

    <scroll
      class="search-content"
      :probe-type="3"
      ref="scroll"
      :bounce="false"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <div
        class="Single"
        v-for="(item, index) in songDetails"
        :key="index"
        @click="playSong(item)"
      >
        <p class="Single-title">{{ item.songName }}</p>
        <div class="Introduction">
          <p class="songN">
            <span v-for="e in item.ar" :key="e.id">{{ e.name }}</span>
          </p>
          <span class="sec">-</span>
          <span class="songT">{{ item.al.name }}</span>
          <div class="play-song"></div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { cloudsearch, SongDetail } from "network/search";
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "searchResult",
  data() {
    return {
      page: 0,
      songDetails: [],
      value: "",
    };
  },
  methods: {
    // 播放单曲
    playSong(e) {
      this.$emit("Song", e);
    },
    // 上拉加载
    loadMore() {
      this.getCloudsearch(this.value);
      this.$refs.scroll.fetchData();
    },
    allplay(){
      this.$bus.$emit("allPlay",this.songDetails,this.songDetails[0].id)
    },
    // 搜索结果
    getCloudsearch(keyword) {
      // 请求单曲数据
      cloudsearch(keyword, this.page).then((res) => {
        this.page = this.page + 1;
        res.result.songs.forEach((e) => {
          let result = new SongDetail(e);
          this.songDetails.push(result);
        });
        // 上拉加载后需要执行这个函数才能继续执行上拉加载
        this.$refs.scroll.finishPullUp();
        // console.log(this.songDetails);
      });
    },
    back() {
      this.$router.replace("/search");
    },
    removeValue() {
      this.$router.replace("/search");
    },
    Suggest() {
      if (this.value) {
      } else {
        this.$router.replace("/search");
      }
    },
  },
  components: {
    Scroll,
  },
  created() {
    this.value = this.$route.params.search;
    this.getCloudsearch(this.value);
  },
  watch: {
    songDetails() {
      this.$nextTick(() => {
        this.$refs.scroll.fetchData();
      });
    },
  },
};
</script>

<style scoped lang="less">
.Sresult {
  padding: 16px;
  height: 100vh;
}
.search-top {
  display: flex;
  padding: 0 0 16px 0;
  img {
    width: 20px;
    height: 30px;
    margin-right: 20px;
  }
  .input {
    border: none;
    width: 290px;
    color: #000;
    height: 30px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.5);
  }
  .del {
    width: 35px;
    height: 35px;
    background: url("~assets/img/common/del.svg") no-repeat 0 0 / cover;
    position: absolute;
    right: 30px;
    top: 12px;
  }
}
.flash {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  img {
    width: 25px;
    height: 25px;
  }
  span {
    font-size: 18px;
    color: #000;
    margin-left: 10px;
    font-weight: 600;
    vertical-align: top;
  }
}
.Single {
  padding: 12px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  .Single-title {
    color: #737fa4;
    font-size: 18px;
    max-width: 310px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .Introduction {
    position: relative;
    display: flex;
    font-size: 14px;
    margin-top: 5px;
    .songN {
      max-width: 210px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        &::after {
          content: "/";
        }
        &:last-child::after {
          content: "";
        }
      }
    }
    .sec {
      margin: 0 5px;
    }
    .songT {
      max-width: 75px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.search-content {
  height: calc(100vh - 100px);
  width: 100%;
}
/deep/.content {
  display: block;
}
.play-song {
  width: 25px;
  height: 25px;
  top: -15px;
  right: 3%;
  position: absolute;
  background: url("~assets/img/common/play.svg") no-repeat 0 0 / cover;
}
</style>
