<template>
  <div class="card-content">
    <div class="el-card-body-title">
      <span class="primary-text">{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: [
      'title'
    ],
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .card-content {
    padding: 10px 20px 20px;
    background: #fff;
    box-sizing: border-box;
  }
</style>