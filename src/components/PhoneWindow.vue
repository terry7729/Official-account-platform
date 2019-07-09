<template>
  <div class="window-box pos-r">
    <div class="window-head"></div>
    <div class="of-y-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .window-box {
    width: 100%;
    height: 100%;
  }

  .window-head {
    width: 100%;
    height: 0;
    padding-bottom: 17.5%;
    background: url('../assets/images/top@2x.png') no-repeat;
    background-size: 100% 100%;
  }

  .of-y-auto {
    box-sizing: border-box;
  }
</style>