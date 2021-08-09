<template>
  <div class="backtop" @click="backtop"></div>
</template>

<script>
export default {
  name: "BackTop",
  data() {
    return {};
  },
  methods: {
      backtop(){
          this.$emit('bTop', )
      }
  },
  components: {},
};
</script>

<style scoped>
.backtop{
    background: #fcfcfc url('~assets//img/home/up.svg') no-repeat 5px 4px/80% 80%;
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 80px;
    right: 30px;
    z-index: 20;
    box-shadow: 5px 5px 5px #888;
    border-radius: 50%;
}
</style>
