<template>
  <div>
    <el-dialog title="选择图片" top="5vh" :visible.sync="show" width="610px" :before-close="handleClose" @open="handleOpen">
      <el-tabs v-model="activeImgTab" @tab-click="handleTabClick">
        <el-tab-pane v-for="item in $store.state.imgTypes" :key="item.id" :label="item.categoryName" :name="String(item.id)">
          <div class="radius border pb-10 cf of-y-auto" style="max-height: 60vh">
            <div 
              class="img-content ml-10 mt-10 fl pos-r" 
              @click="handleSelect(item)"
              v-for="item in list" 
              :key="item.id">
              <el-image class="radius" style="width: 100%; height: 100%;" :src="item.sourceMaterialIcon" fit="fill"></el-image>
              <el-checkbox :value="item.id === selectData.id"></el-checkbox>
            </div>
            <el-upload
              class="upload-btn radius ml-10 mt-10 fl pos-r" 
              ref="upload"
              action=""
              :http-request="upload"
              :show-file-list="false"
              :before-upload="beforeUpload">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-tab-pane>
      </el-tabs>
      
      <div slot="footer" class="tc">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      imgData: {
        type: Object,
        default: {
          id: 0,
        }
      }
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 50,

        //图文&图片数据
        list: [],

        //图片素材标签中活动的标签栏
        activeImgTab: 'null',

        //临时保存选择的数据
        selectData: {},
      }
    },
    methods: {
      //模态框打开事件
      handleOpen() {
        this.selectData = this.imgData
        if(!this.list.length) this.getData()
      },

      //模态框关闭事件
      handleClose() {
        this.$emit('update:show', false)
      },

      handleTabClick(tab) {
        this.getData()
      },

      handleSelect(item) {
        this.selectData = item
      },

      // 上传图片
      beforeUpload(file) {
        const fileType = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt5M = file.size / 1024 / 1024 < 5

        if (!fileType) {
          this.$message.error('图片仅支持jpg、jpeg、png格式')
        }
        if (!isLt5M) {
          this.$message.error('图片大小不能超过 5MB')
        }
        return fileType && isLt5M
      },
      async upload(file) {
        let res = await this.$axios.uploadImg(file.file)
        if(res.code === 0) {
          let url = res.data.url
          let params = {
            "officiaUserId": this.$store.state.userInfo.id,               // 公众号ID（必传）
            "sourceMaterialType": 2,                                      // 素材类型： 1-图文， 2-图片， 3-视频
            "sourceMaterialIcon": url,                                    // 素材图片地址，sourceMaterialType 为1和2时必传，其他不必传
            "categoryId": this.activeImgTab,                              // 图片素材所属分类ID， sourceMaterialType 为2必传
          }

          res = await this.$axios.addMaterial(params)
          if(res.code === 0) {
            this.$message.success(res.msg)
            this.$funs.getImgTypes()
            this.getData()
          }
        }
      },
      
      //添加图片素材
      handleSubmit() {
        if(this.selectData.id) {
          this.$emit('update:show', false)
          this.$emit('submit', this.selectData)
        } else {
           this.$message.warning('未选择任何图片')
        }
      },

      // 获取数据
      async getData() {
        let params = {
          "page": this.pageNum,
          "pagesize": this.pageSize,
          "sourceMaterialType": 2,                          // 素材类型： 1-图文， 2-图片， 3-视频
          "sourceMaterialTitle": null,                      // 素材标题
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
          "categoryId": this.activeImgTab,                  // 图片素材分类ID
          "sourceMaterialSummary": null,                    // 图文素材摘要
          "sourceMaterialIntroduce": null,                  // 素材视频说明
        }

        let res = await this.$axios.getMaterial(params)
        if(res.code === 0) this.list = res.data.list
      }
    },
  }
</script>

<style scoped lang="scss">
  .img-content {
    width: 100px;
    height: 100px;

    .el-checkbox {
      position: absolute; 
      bottom: 8px; 
      right: 10px;
    }

  }
  .upload-btn {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    border: 1px dashed $sub-text-color;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .el-icon-plus {
      font-size: 40px;
      margin: 0 auto;
      color: $sub-text-color;
    }
    
    &:hover {
      border-color: $primary-color;
      .el-icon-plus {
        color: $primary-color;
      }
    }
  }
</style>