<template>
  <div class="div-box">
    <slot name='head'></slot>

    <el-image
      style="width: 160px; height: 100%; vertical-align: middle;"
      class="radius"
      :src="url"
      fit="fill">
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>

    <div :class="{'content-border': border === ''}" style="flex: 1; height: 100%;">
      <div class="content radius">
        <span class="title no-wrap">{{ title }}</span>
        
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'url',
      'title',
      'border',
    ],
    data() {
      return {

      }
    },
    methods: {},
  }
</script>

<style scoped lang="scss">
  .div-box {
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
  }

  .content {
    height: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    align-items: center;

    &:hover {
      background: #F8FAFD;
    }
  }
  .content-border {
    border-bottom: 1px solid $border-color;

    &:hover {
      border-bottom-color: #F8FAFD;
    }
  }

  .title {
    flex: 1;
    color: $default-color;
  }
</style>