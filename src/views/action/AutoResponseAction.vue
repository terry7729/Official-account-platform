<template>
  <card title="自动回复" class="of-y-auto">
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" class="mt-20">
      <el-tab-pane label="关键词回复" name="1">
        <div class="tab-pane-title border-bottom mt-20">
          <span class="ml-10">关键词回复</span>
          <span class="ml-20 tab-pane-title-2">通过编辑关键词的规则，可以快速回复信息</span>
        </div>
        <router-view v-if="activeName === '1'"/>
      </el-tab-pane>

      <el-tab-pane label="收到消息回复" name="2">
        <div class="tab-pane-title border-bottom mt-20">
          <span class="ml-10">收到消息回复</span>
          <span class="ml-20 tab-pane-title-2">通过编辑收到消息回复，可以快速回复信息</span>
        </div>
        <router-view v-if="activeName === '2'"/>
      </el-tab-pane>

      <el-tab-pane label="被关注回复" name="3">
        <div class="tab-pane-title border-bottom mt-20">
          <span class="ml-10">被关注回复</span>
          <span class="ml-20 tab-pane-title-2">通过编辑被关注回复，可以快速回复信息</span>
        </div>
        <router-view v-if="activeName === '3'"/>
      </el-tab-pane>
    </el-tabs>
  </card>
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
             targetRoute = 'KeyWordResponseList'
             break;
         
           case '2':
             targetRoute = 'GetMessageResponse'
             break;
         
           case '3':
             targetRoute = 'BeFocusedResponse'
             break;
         }
         this.$router.push({name: targetRoute})
       }
      },
    },
    created() {
      let routeName = this.$route.name
      switch (routeName) {
        case 'KeyWordResponseList':
          this.activeName = this.oldName = '1'
          break;
      
        case 'GetMessageResponse':
          this.activeName = this.oldName  = '2'
          break;
      
        case 'BeFocusedResponse':
          this.activeName = this.oldName  = '3'
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