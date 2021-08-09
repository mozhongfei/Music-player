<template>
  <div class="search">
    <div class="search-top">
      <img src="~assets/img/login/箭头.svg" alt="" @click="back" />
      <input
        type="text"
        v-model="value"
        background="#fff"
        class="input"
        :placeholder="showKeyword"
        @keyup.enter="searchSong"
        @input="Suggest"
      />
      <span class="del" v-show="value" @click="removeValue"></span>
    </div>

    <div class="keywords" v-if="keywordsDetails.length">
      <div
        v-for="(item, index) in keywordsDetails"
        :key="index"
        class="keywords-item"
        @click="goresult(item)"
      >
        <van-icon name="search" />
        <p>{{ item }}</p>
      </div>
    </div>

    <div class="search-content" v-else>
      <div class="history" v-if="historySearch.length">
        <span class="history-span">历史</span>
        <div class="history-text">
          <van-button
            type="info"
            size="small"
            round
            v-for="(item, index) in historySearch"
            :key="index"
            class="van-button"
            @click="goresult(item)"
            >{{ item }}</van-button
          >
        </div>
        <img
          src="~assets/img/common/垃圾桶.svg"
          alt=""
          @click="removeHistory"
        />
      </div>

      <div class="HotBot">
        <p>热搜榜</p>
        <div class="box" v-if="searchHot.length">
          <div
            v-for="(item, index) in searchHot"
            :key="index"
            :class="['box-item', { dbox: index < 3 }]"
            @click="goresult(item.searchWord)"
          >
            <span>{{ index + 1 }}</span>
            <span class="text-hot">{{ item.searchWord }} </span>
            <img :src="item.iconUrl" alt="" v-if="item.iconUrl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNarBar } from "network/home";
import { getSearchHot, getSuggest } from "network/search";
export default {
  name: "search",
  data() {
    return {
      showKeyword: "",
      value: "",
      historySearch: [],
      searchHot: [],
      keywordsDetails: [],
    };
  },
  methods: {
    back() {
      this.$router.push('/home');
    },
    //清除历史记录
    removeHistory() {
      this.historySearch = [];
    },
    //清除输入框
    removeValue() {
      this.value = "";
      this.keywordsDetails = [];
    },
    //  搜索歌曲
    searchSong() {
      if (this.value) {
        const e = this.historySearch.find((e) => e == this.value);
        if (e) {
        } else {
          this.historySearch.push(this.value);
        }

        this.$router.push("/searchResult/" + this.value);
      } else {
        this.$router.push("/searchResult/" + this.showKeyword);
      }
    },
    //  搜索歌曲
    goresult(keywork) {
      this.value = keywork;
      this.searchSong();
    },
    // 搜索建议
    Suggest() {
      if (this.value) {
        getSuggest({ keywords: this.value }).then((res) => {
          this.keywordsDetails = [];
          if (res.result.allMatch) {
            res.result.allMatch.forEach((e) => {
              this.keywordsDetails.push(e.keyword);
            });
            //   console.log(this.keywordsDetails);
          } else {
            this.keywordsDetails.push("搜索" + this.value);
          }
        });
      } else {
        this.keywordsDetails = [];
      }
    },
  },
  activated() {
    this.keywordsDetails = []
    this.value = ''
  },
  components: {},
  created() {
    getNarBar().then((res) => {
      this.showKeyword = res.data.showKeyword;
    });
    getSearchHot().then((res) => {
      this.searchHot = res.data;

      //   console.log(this.searchHot);
    });
  },
};
</script>

<style scoped lang="less">
.search {
  margin: 16px;
}
.search-top {
  display: flex;
  margin: 16px 0;
  img {
    width: 20px;
    height: 30px;
    margin-right: 20px;
  }
  .input {
    border: none;
    width: 290px;
    height: 30px;
    color: #000;
    border-bottom: 1px solid #000;
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
.search-content {
  .history {
    display: flex;
    align-items: center;
    img {
      width: 20px;
      margin-top: 8px;
      height: 20px;
      align-self: flex-start;
    }
    .history-span {
      color: #000;
      font-weight: 600;
      font-size: 14px;
      align-self: flex-start;
      width: 30px;
      margin-top: 8px;
    }
    .history-text {
      width: 260px;
      .van-button {
        background-color: #f4f4f4;
        color: #6c6c6c;
        border: none;
        height: 25px;
        margin: 5px 0 0 16px;
      }
    }
  }
  .HotBot {
    margin-top: 16px;
    p {
      color: #000;
      font-weight: 600;
    }
    .box {
      width: 335px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;
      align-content: center;
      padding: 16px 10px;
      border: 1px solid rgba(100, 100, 100, 0.2);
      border-radius: 8px;
      .box-item {
        display: flex;
        width: 50%;
        margin: 8px 0;
        img {
          height: 15px;
        }
        .text-hot {
          display: inline-block;
          vertical-align: top;
          max-width: 100px;
          padding: 0 8px 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .dbox {
        .text-hot {
          color: #000;
          font-weight: 600;
        }
        span {
          &:first-child {
            color: red;
          }
        }
      }
    }
  }
}
.keywords {
  .keywords-item {
    display: flex;
    align-items: center;
    p {
      margin-left: 8px;
      padding: 16px 0;
      width: 300px;
      border-bottom: 1px solid rgba(100, 100, 100, 0.2);
    }
  }
}
</style>
