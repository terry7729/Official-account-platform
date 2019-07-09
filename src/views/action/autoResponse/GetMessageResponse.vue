<template>
  <div class="mt-30">
    <resources 
      @submit="handleSubmit"
      @delete="handleImgDelete"
      v-model="inputText"
      :tabType.sync="tabType"
      :imgData.sync="imgData"
      :types="['text', 'img']">
    </resources>

    <!-- 提交和取消按钮 -->
    <div class="mt-40 tc">
      <el-button @click="handleDelete">删 除</el-button>
      <el-button type="primary" @click="submit">保 存</el-button>
    </div>
  </div>
</template>

<script>
  import resources from '@/components/Resources'
  export default {
    components: {
      resources,
    },
    data() {
      return {
        inputText: '',
        tabType: 'text',
        imgData: {},   // 已选择的图片数据
        oldData: {
          id: 'null'      // isNaN 为true，用于判断getData函数是否已请求到数据，进一步做后续增加和修改的操作
        },
      }
    },
    methods: {
      // 选择图片
      handleSubmit(data) {
        this.imgData = data
      },

      // 删除图片
      handleImgDelete() {
        this.imgData = {}
      },
      
      // 删除回复内容
      handleDelete() {
        this.$confirm('是否删除该内容?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then( () => {
          this.deleteData()
        }).catch( () => {
          //do nothing
        })
      },
      async deleteData() {
        let params = {
          "id": this.oldData.id, 
          "officiaUserId": this.$store.state.userInfo.id,
        }
        let res = await this.$axios.deleteAutoResponse(params)
        if(res.code === 0) {
          this.$message.success(res.msg)
          this.inputText = ''
          this.imgData = {}
          this.oldData = { id: 'null' }
        }
      },
      
      // 保存按钮操作事件
      submit() {
        if(isNaN(this.oldData.id)) {
          this.$message.warning('数据未正常获取，请刷新页面后重试')
          return
        }

        if(!this.inputText.trim() && !this.imgData.sourceMaterialIcon) {
          this.$message.warning('回复内容为空')
          return
        }

        let params = {
          "replyType": "1",
          "officiaUserId": this.$store.state.userInfo.id,
        }

        if(this.oldData.id) params.id = this.oldData.id

        if(this.tabType === 'text') {
          if(!this.inputText.trim()) {
            this.$message.warning('回复内容为空')
            return
          }
          params.replyText = this.inputText
          params.sourceMaterialId = null
          params.replyInco = null
        }

        if(this.tabType === 'img') {
          if(!this.imgData.sourceMaterialIcon) {
            this.$message.warning('回复内容为空')
            return
          }
          params.replyText = null
          params.sourceMaterialId = this.imgData.id
          params.replyInco = this.imgData.sourceMaterialIcon
        }

        this.addData(params)

      },
      async addData(params) {
        let res = await this.$axios.editAutoResponse(params)
        if(res.code === 0) {
          this.$message.success(res.msg)
        }
      },

      // 获取数据
      async getData() {
        let params = {
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
          "replyType": 1
        }
        let res = await this.$axios.getAutoResponse(params)
        if(res.code === 0) {
          this.oldData = res.data

          if(!res.data.replyText && res.data.replyInco) {
            this.tabType = 'img'
            this.imgData = {
              id: res.data.sourceMaterialId,
              sourceMaterialIcon: res.data.replyInco
            }
          } else if(res.data.replyText) {
            this.inputText = res.data.replyText
          }
        }
      }

    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">

</style>