<template>
  <div>
    <el-dialog title="选择视频" top="5vh" :visible.sync="show" width="610px" :before-close="handleClose" @open="handleOpen">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="全部视频" name="all">
          <div class="radius border pb-10 cf of-y-auto" style="max-height: 60vh">
            <div 
              class="img-content ml-10 mt-10 fl pos-r" 
              @click="handleSelect(item)"
              v-for="item in list" 
              :key="item.id">
              <el-image class="radius" style="width: 100%; height: 100%;" :src="item.sourceMaterialVideoIcon" fit="fill"></el-image>
              <el-checkbox :value="item.id === selectData.id"></el-checkbox>
            </div>
            <div class="upload-btn radius ml-10 mt-10 fl pos-r">
              <i class="el-icon-plus"></i>
            </div>
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
      videoData: {
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

        //数据
        list: [],

        activeTab: "all",

        //临时保存选择的数据
        selectData: {},
      }
    },
    methods: {
      //模态框打开事件
      handleOpen() {
        this.selectData = this.videoData
        if(!this.list.length) this.getData()
      },

      //模态框关闭事件
      handleClose() {
        this.$emit('update:show', false)
      },

      handleSelect(item) {
        this.selectData = item
      },

      //添加素材
      handleSubmit() {
        if(this.selectData.id) {
          this.$emit('update:show', false)
          this.$emit('submit', this.selectData)
        } else {
           this.$message.warning('未选择任何视频')
        }
      },

      // 获取数据
      async getData() {
        let params = {
          "page": this.pageNum,
          "pagesize": this.pageSize,
          "sourceMaterialType": 3,                          // 素材类型： 1-图文， 2-图片， 3-视频
          "sourceMaterialTitle": null,                      // 素材标题
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
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