<template>
  <div>
    
    <el-card shadow="never">
      <div class="el-card-body-title">
        <span class="primary-text">公众号设置</span>
      </div>

      <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" class="mt-20">
        <el-tab-pane label="已关注" name="1">
         
          <router-view/>
        </el-tab-pane>

        <el-tab-pane label="黑名单" name="2">
         
          <router-view/>
        </el-tab-pane>

      
      </el-tabs>

    </el-card>
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
  
</style>