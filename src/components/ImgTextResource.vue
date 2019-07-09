<template>
  <div>
    <!-- 选择图片的按钮 -->
    <el-row class="pl-20 pr-20" style="height: 270px;" :gutter="20" v-if="!imgTextData.id">
      <el-col :span="12">
        <div class="add-img-btn mt-20 radius" @click="showDialog = true">
          <i class="el-icon-tickets"></i>
          <p>从素材库中选择</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="add-img-btn mt-20 radius" @click="$router.push({name: 'EditMaterial'})">
          <i class="el-icon-plus"></i>
          <p>新建图文素材</p>
        </div>
      </el-col>
    </el-row>
    
    <!-- 选择后的标题和图片 -->
    <div class="pt-20 pl-20 pr-20" v-if="imgTextData.id">
      <p class="pb-10 border-bottom no-wrap">
        {{ imgTextData.sourceMaterialTitle }}
      </p>
    </div>
    <edit-del-img 
      class="mt-20 mb-50 ml-20" 
      @edit="showDialog = true"
      @delete="handleDelete"
      :url="imgTextData.sourceMaterialIcon" 
      v-if="imgTextData.id">
    </edit-del-img>

    <!-- 选择图片 -->
    <img-text-dialog :show.sync="showDialog" :imgTextData.sync="imgTextData" @submit="handleSubmit"></img-text-dialog>
  </div>
</template>

<script>

  import editDelImg from '@/components/EditDelImg'
  import imgTextDialog from '@/components/ImgTextDialog'
  export default {
    components: {
      editDelImg,
      imgTextDialog,
    },
    
    props: {
      imgTextData: {
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