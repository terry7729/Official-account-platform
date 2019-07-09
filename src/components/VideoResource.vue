<template>
  <div>
    <!-- 选择图片的按钮 -->
    <el-row class="pl-20 pr-20" style="height: 270px;" :gutter="20" v-if="!videoData.id">
      <el-col :span="12">
        <div class="add-img-btn mt-20 radius" @click="showDialog = true">
          <i class="el-icon-film"></i>
          <p>从素材库中选择</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="add-img-btn mt-20 radius" @click="$router.push({name: 'AddVideo'})">
          <i class="el-icon-plus"></i>
          <p>新建视频素材</p>
        </div>
      </el-col>
    </el-row>
    
    <!-- 选择后的标题和图片 -->
    <div class="pt-20 pl-20 pr-20" v-if="videoData.id">
      <p class="pb-10 border-bottom no-wrap">
        {{ videoData.sourceMaterialTitle }}
      </p>
    </div>
    <edit-del-img 
      class="mt-20 mb-50 ml-20" 
      @edit="showDialog = true"
      @delete="handleDelete"
      :url="videoData.sourceMaterialVideoIcon" 
      v-if="videoData.id">
    </edit-del-img>

    <!-- 选择图片 -->
    <video-dialog :show.sync="showDialog" :videoData.sync="videoData" @submit="handleSubmit"></video-dialog>
  </div>
</template>

<script>

  import editDelImg from '@/components/EditDelImg'
  import videoDialog from '@/components/VideoDialog'
  export default {
    components: {
      editDelImg,
      videoDialog,
    },
    
    props: {
      videoData: {
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
      //添加素材
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