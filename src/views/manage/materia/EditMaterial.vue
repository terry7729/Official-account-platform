<template>
  <card title="新建图文素材">
    <el-form class="mt-20" :model="forms" :rules="rules" ref="form" @keyup.enter.native="submit" :show-message="false">
      <el-form-item prop="title" style="margin-bottom: 10px;">
        <el-input v-model="forms.title" maxlength="30" show-word-limit placeholder="请输入标题"></el-input>
      </el-form-item>
    </el-form>

    <editor v-model="content" ref="editor" :height="350"></editor>

    <div class="cover-title border radius mt-10">
      <p class="border-bottom pd-10">封面和摘要</p>
      <div class="content pd-20">
        <div class="img-source">
          <div class="add-img-btn radius" v-if="!imgData.id" @click="showDialog = true">
            <i class="el-icon-plus"></i>
            <p>选择封面</p>
          </div>
          <!-- 选择后的图片 -->
          <edit-del-img 
            @edit="showDialog = true"
            @delete="handleDel"
            :url="imgData.sourceMaterialIcon" 
            v-if="imgData.id">
          </edit-del-img>
        </div>
        <!-- 摘要 -->
        <div class="text">
          <el-input 
            v-model="text" 
            type="textarea"
            maxlength="120"
            :autosize="{minRows: 8, maxRows: 8}"
            show-word-limit
            resize="none"
          ></el-input>
        </div>
      </div>
    </div>

    <div class="mt-20 tc">
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button>保存并转发</el-button>
    </div>

    <!-- 选择图片 -->
    <img-dialog ref="imgDialog" :show.sync="showDialog" :imgData.sync="imgData" @submit="handleSubmit"></img-dialog>
  </card>
</template>

<script>

  import editDelImg from '@/components/EditDelImg'
  import imgDialog from '@/components/ImgDialog'
  import editor from '@/components/Editor'
  export default {
    components: {
      editor,
      editDelImg,
      imgDialog,
    },
    data() {
      return {
        forms: {
          title: '',
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
        },
        content: `在此编辑`,
        text: '',
        showDialog: false,
        //选中的图片
        imgData: {},
        row: {},
      }
    },
    methods: {
      //添加图片素材
      handleSubmit(data) {
        this.imgData = data
        // this.$emit('submit', data)
      },
      
      // 删除已选择的内容
      handleDel() {
        this.$confirm('是否删除该内容?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then( () => {
          this.imgData = {}
        }).catch( () => {
          //do nothing
        })
      },

       // 提交保存
      submit() {
        this.forms.title = this.forms.title.trim()

        this.$refs.form.validate( res =>{
          if(res) {
            if(this.row.id) {
              this.updateData()
            } else {
              this.addData()
            }
          } else {
            this.$message.error('请输入标题')
            return false
          }
        })
      },
      async addData() {
        let params = {
            "officiaUserId": this.$store.state.userInfo.id,               // 公众号ID（必传）
            "sourceMaterialTitle": this.forms.title,                      // 素材标题（sourceMaterialType 1,3必传）
            "sourceMaterialType": 1,                                      // 素材类型： 1-图文， 2-图片， 3-视频
            "sourceMaterialIcon": this.imgData.sourceMaterialIcon,     // 素材图片地址，sourceMaterialType 为1和2时必传，其他不必传
            "sourceMaterialIconId": this.imgData.id,                   // 素材图片id
            "sourceMaterialVideoIcon": null,                              // 素材视频封面图片地址，sourceMaterialType 为3时必传，其他不必传
            "categoryId": null,                                           // 图片素材所属分类ID， sourceMaterialType 为2必传
            "sourceMaterialText": this.content,                           // 素材文本内容
            "sourceMaterialVideo": null,                                  // 素材视频，sourceMaterialType 为3时必传，其他不必传
            "sourceMaterialSummary": this.text,                           // 素材图文摘要,sourceMaterialType 为1时必传其他不必传
            "sourceMaterialIntroduce": null,                              // 素材视频说明 。sourceMaterialType 为3时必传，其他不必传
          }

        let res = await this.$axios.addMaterial(params)
        if(res.code === 0) {
          this.$message.success(res.msg)
          setTimeout( () => {
            this.$router.push({name: 'ImgTextList'})
          }, 1000)
        }
      },
      async updateData() {
        let params = {
          "officiaUserId": this.$store.state.userInfo.id,
          "id": this.row.id,
          "sourceMaterialTitle": this.forms.title,
          "sourceMaterialIcon": this.imgData.sourceMaterialIcon,
          "sourceMaterialIconId": this.imgData.id, 
          "sourceMaterialVideoIcon": null,
          "categoryId": null,
          "sourceMaterialText": this.content,
          "sourceMaterialVideo": null,
          "sourceMaterialSummary": this.text,
          "sourceMaterialIntroduce": null,
        }

        let res = await this.$axios.updateMaterial(params)
        if(res.code === 0) {
          this.$message.success(res.msg)
          setTimeout( () => {
            this.$router.push({name: 'ImgTextList'})
          }, 1000)
        }
      },

      // 根据id查详情
      async getContent(id) {
        let res = await this.$axios.getMaterialById({sourceMaterialId: id})
        if(res.code === 0) {
          this.forms.title = res.data.sourceMaterialTitle
          this.content = res.data.sourceMaterialText
          this.text = res.data.sourceMaterialSummary
          this.imgData = {
            id: this.row.sourceMaterialIconId,
            sourceMaterialIcon: res.data.sourceMaterialIcon
          }
        }
      }
    },
    created() {
      this.row = this.$route.params
      if(this.row.id) this.getContent(this.row.id)
    }
  }
</script>

<style scoped lang="scss">
  .cover-title {
    .content {
      display: flex;
      .text {
        flex: 1;
        margin-left: 20px;
      }
    }
  }
  .add-img-btn {
    width: 300px;
    height: 180px;
    border: 1px dashed $border-color;
    color: $sub-text-color;
    text-align: center;
    box-sizing: border-box;

    i {
      margin-top: 50px;
      font-size: 30px;
    }
    p {
      margin-top: 20px;
      font-size: 16px;
    }
  }
</style>