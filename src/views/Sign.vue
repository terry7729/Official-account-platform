<template>
  <el-container class="h-100">
    <!-- 顶部内容 -->
    <el-header class="border-bottom">
      <span class="logo-title">博信公众号平台</span>
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
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
  .el-header {
    display: flex;
    align-items: center;
  }
  .logo-title {
    font-size: 20px;
    color: #666;
  }

  .el-main {
    background: #F9FAFB;
  }
</style>