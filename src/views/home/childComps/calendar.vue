<template>
  <div class="calendar" v-if="Object.keys(playitem).length !== 0">
    <div class="calendar-title">
      <span>{{ playitem.uiElement.subTitle.title }}</span>
      <div class="calendar-more">
        <p>更多</p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="calendar-text">
      <p>领取你的今日好运</p>
      <div class="calendar-right">
        <p>查看运势解读</p>
        <van-icon name="arrow" color="#999" />
      </div>
    </div>
    <div v-for="(item, index) in playitem.creatives" :key="item.creativeId">
      <div
        v-for="e in item.resources"
        :key="e.resourceId"
        class="calendar-desc"
      >
        <div class="text-left">
          <p>
            <span v-if="index === 0">今日</span
            ><span v-else-if="index === 1">明日</span>
            <span v-if="e.uiElement.labelTexts" class="labelText1">{{
              e.uiElement.labelTexts[0]
            }}</span>
            <span v-else class="labelText2">预告</span>
          </p>
          <p class="mainTitle">{{ e.uiElement.mainTitle.title }}</p>
        </div>
        <img v-lazy="e.uiElement.image.imageUrl" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calendar",
  data() {
    return {};
  },
  props: {
    playitem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
  mounted() {
    // console.log(this.playitem);
  },
  components: {},
};
</script>

<style scoped lang="less">
.calendar-title {
  display: flex;
  width: 335px;
  justify-content: space-between;
  height: 50px;
  margin: 0 16px;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: 600;
    color: #000;
  }
}
.calendar-more {
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
.calendar {
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #fff;
  width: 375px;
}
.calendar-text {
  display: flex;
  width: 335px;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #eee;
  p {
    font-size: 14px;
  }
}
.calendar-right {
  display: flex;

  .van-icon {
    vertical-align: text-top;
  }
}
.calendar-desc {
  display: flex;
  width: 335px;
  margin: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  .text-left {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    p {
      span {
        color: #999;
        &:first-child {
          font-size: 14px;
        }
        &:last-child {
          font-size: 12px;
          margin-left: 12px;
        }
      }
      .labelText1 {
        background-color: #fafff7;
        color: #e3d791;
      }
      .labelText2 {
        width: 28px;
        display: inline-block;
        text-align: center;
        line-height: 18px;
        height: 18px;
        background-color: #efefef;
      }
    }
  }
  img {
    width: 55px;
    height: 55px;
  }
  .mainTitle {
    width: 230px;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
