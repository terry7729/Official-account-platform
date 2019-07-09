<template>
  <div>
    <el-card shadow="never">
      <div class="el-card-body-title">
        <span class="primary-text">粉丝管理</span>
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
      return {
        activeName: '1',
        oldName: '1',
      }
    },
    methods: {
      handleTabClick(tab) {
       
       if(tab.name !== this.oldName) {
        
         this.oldName = tab.name
        
         let targetRoute
         switch (tab.name) {
           case '1':
             targetRoute = 'Attentioned'
             break;
         
           case '2':
             targetRoute = 'Blacklist'
             break;
        
         }
       
         this.$router.push({name: targetRoute})
       }
      },
    },
    created() {
      let routeName = this.$route.name
      switch (routeName) {
        case 'Attentioned':
          this.activeName = this.oldName = '1'
          break;
      
        case 'Blacklist':
          this.activeName = this.oldName  = '2'
          break;
      
       
      }
    }
  }
</script>

<style scoped lang="scss">
  .tab-pane-title {
    line-height: 2;
  }
  .tab-pane-title-2 {
    font-size: 14px;
    color: $sub-text-color;
  }
  
</style>