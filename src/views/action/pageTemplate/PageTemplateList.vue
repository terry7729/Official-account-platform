<template>
  <div>
    <card title="页面模板">
      <p class="tc mt-20">新建一个公众号页面，可复制链接放在自定义菜单发布</p>
      <div class="tc mt-20">
        <el-button class="el-icon-plus" type="primary" @click="$router.push({name: 'SelectTemplates'})">新建模板</el-button>
      </div>
    </card>

    <card title="我的模板" v-if="list.length">
    </card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
      }
    },
    methods: {
      // 获取模板列表
      async getData() {
        let res = await this.$axios.getCustomTemplateList({officiaUserId: this.$store.state.userInfo.id})
        // console.log(res)
        if(res.code === 0) {
          this.list = res.data
        }
      },
    },

    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  
</style>