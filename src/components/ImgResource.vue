<template>
  <div>
    <!-- 选择图片的按钮 -->
    <el-row class="pl-20 pr-20" style="height: 270px;" :gutter="20" v-if="!imgData.id">
      <el-col :span="12">
        <div class="add-img-btn mt-20 radius" @click="showDialog = true">
          <i class="el-icon-picture-outline"></i>
          <p>从素材库中选择</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="add-img-btn mt-20 radius">
          <el-upload
            ref="upload"
            action=""
            :http-request="upload"
            :show-file-list="false"
            :before-upload="beforeUpload">
            <i class="el-icon-plus"></i>
            <p>上传图片素材</p>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    
    <!-- 选择后的图片 -->
    <edit-del-img 
      class="mt-20 mb-50 ml-20" 
      @edit="showDialog = true"
      @delete="handleDelete"
      :url="imgData.sourceMaterialIcon" 
      v-if="imgData.id">
    </edit-del-img>

    <!-- 选择图片 -->
    <img-dialog :show.sync="showDialog" :imgData.sync="imgData" @submit="handleSubmit"></img-dialog>
  </div>
</template>

<script>

  import editDelImg from '@/components/EditDelImg'
  import imgDialog from '@/components/ImgDialog'
  export default {
    components: {
      editDelImg,
      imgDialog,
    },
    
    props: {
      imgData: {
        type: Object,
        default: {
          id: 0,
        }
      }
    },
    data() {
      return {
        showDialog: false,
      }
    },
    methods: {
      //添加图片素材
      handleSubmit(data) {
        this.$emit('submit', data)
      },
      
      // 删除已选择的内容
      handleDelete() {
        this.$confirm('是否删除该内容?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then( () => {
          this.$emit('delete')
        }).catch( () => {
          //do nothing
        })
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
            "categoryId": null,                                           // 图片素材所属分类ID， sourceMaterialType 为2必传
          }

          res = await this.$axios.addMaterial(params)
          if(res.code === 0) {
            this.$message.success('图片上传成功，已保存到默认图片素材库，下次可直接选择使用啦')
            
            let data = {
              id: res.data.sourceMaterialId,
              sourceMaterialIcon: url
            }
            this.handleSubmit(data)

            this.$funs.getImgTypes()
          }
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .add-img-btn {
    height: 230px;
    border: 1px dashed $border-color;
    color: $sub-text-color;
    text-align: center;

    i {
      margin-top: 90px;
      font-size: 30px;
    }
    p {
      margin-top: 20px;
      font-size: 16px;
    }
  }
</style>