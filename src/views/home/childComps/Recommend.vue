<template>
  <scroll class="recommend" :probe-type="3" :scrollX="true" :scrollY="false" :ck="false">
    <div class="content1">
      <div
        v-for="(item, index) in recommends"
        :key="index"
        class="recommend-item"
      >
        <div class="img-item" @click="goto(item)">
          <img v-lazy="item.iconUrl" alt="" />
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "Recommend",
  data() {
    return {};
  },
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {},
  methods: {
    goto(e){
      if (e.id == -2) {
        this.$router.push({path:"/listSquare", query:{type: '推荐'} })
      }else if(e.id == -1){
        this.$router.push({path:"/DailySong"})
      }else if(e.id == -3){
        this.$router.push({path:"/Ranking"})
      }
      // console.log(e.id);
    }
  },
  components: {
    Scroll,
  },
};
</script>

<style scoped>
.recommend {
  font-size: 12px;
  padding: 10px 0;
  width: 375px;
  text-align: center;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  white-space:nowrap;
}
.img-item {
  background-color: #fa4543;
  margin-bottom: 8px;
  border-radius: 50%;
  height: 44px;
  text-align: center;
  
  width: 44px;
}
.recommend-item {
  width: 44px;
  height: 70px;
  display: inline-block;
  margin: 0 10px;
  
}
.recommend-item img {
  width: 80%;
  margin-top: 4px;
  height: auto;
}

</style>
