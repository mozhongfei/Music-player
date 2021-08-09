<template>
  <div class="nav-bar">
      <div class="left"> <slot name='left'></slot> </div>
      <div class="center"> <slot name='center'></slot> </div>
      <div class="right"> <slot name='right'></slot> </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {

    }
  },
  methods: {
  },
  computed:{

  },
  components: {

  }
}
</script>

<style scoped>
.nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    /* box-shadow: 0 1px 1px rgba(100, 100, 100, .1); */
}
.left,.right{
    width: 50px;
     display: flex;
    align-items: center;
    justify-content: center;
}
.center{
    flex: 1;
}
</style>
