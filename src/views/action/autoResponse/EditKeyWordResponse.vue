<template>
  <div class="mt-30">
    <el-row>
      <!-- 用于占位 -->
      <el-col :xs="0" :sm="1" :md="2" :lg="3" :xl="4" style="height: 10px;"></el-col>

      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
        <el-form :model="forms" :rules="rules" ref="forms" label-width="100px" hide-required-asterisk>

          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="forms.ruleName" placeholder="规则名最多60个字" maxlength="60" show-word-limit></el-input>
          </el-form-item>

          <el-form-item label="关键词" prop="keyWord">
            <el-input v-model="forms.keyWord" placeholder="关键词最多30个字" maxlength="30" show-word-limit></el-input>
          </el-form-item>

          <el-form-item label="回复内容">
            <el-radio-group v-show="isNaN(forms.resourceType)">
              <el-radio label="1" size="small" border @click.native="visible.imgText = true">图文</el-radio>
              <el-radio label="2" size="small" border @click.native="visible.text = true">文字</el-radio>
              <el-radio label="3" size="small" border @click.native="visible.img = true">图片</el-radio>
            </el-radio-group>

            <!-- 回复内容 ----- 图文 -->
            <el-input
              v-if="forms.resourceType === '1'"
              v-model="imgTextData.sourceMaterialTitle"
              :title="imgTextData.sourceMaterialTitle"
              readonly>
            </el-input>
            <edit-del-img 
              class="mt-20" 
              @edit="visible.imgText = true"
              @delete="deleteContent"
              :url="imgTextData.sourceMaterialIcon" 
              v-if="forms.resourceType === '1'">
            </edit-del-img>

            <!-- 回复内容 ----- 文字 -->
            <el-input
              v-if="forms.resourceType === '2'"
              v-model="forms.confirmText"
              :title="forms.confirmText"
              style="padding-right: 70px; box-sizing: border-box;"
              readonly>
              <template slot="suffix">
                <i class="el-icon-edit-outline fz-20 " @click="visible.text = true"></i>
                <i class="el-icon-delete fz-20 ml-10 mt-10" @click="deleteContent"></i>
              </template>
            </el-input>

            <!-- 回复内容 ----- 图片 -->
            <edit-del-img 
              class="mt-10" 
              @edit="visible.img = true"
              @delete="deleteContent"
              :url="imgData.sourceMaterialIcon" 
              v-if="forms.resourceType === '3'">
            </edit-del-img>

          </el-form-item>

          <!-- 提交和取消按钮 -->
          <el-form-item class="mt-40 tc">
            <el-button @click="$router.replace({name: 'KeyWordResponseList'})" v-if="!editData.id">取 消</el-button>
            <el-button @click="handleDelete" v-if="editData.id">删 除</el-button>
            <el-button type="primary" @click="submit">保 存</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

    <!-- dialogs -->
    <!-- 图文 -->
    <img-text-dialog :show.sync="visible.imgText" :imgTextData.sync="imgTextData" @submit="chooseImgText"></img-text-dialog>

    <!-- 文字 -->
    <el-dialog title="添加回复文字" top="18vh" :visible.sync="visible.text">
      <el-form :model="forms" :rules="rules" ref="textForms" hide-required-asterisk>
        <el-form-item prop="text">
          <el-input
            v-model="forms.text"
            type="textarea"
            maxlength="300"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 10 }"
            resize="none">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="tc">
        <el-button @click="visible.text = false">取 消</el-button>
        <el-button type="primary" @click="addText">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 图片 -->
    <img-dialog :show.sync="visible.img" :imgData.sync="imgData" @submit="chooseImg"></img-dialog>

  </div>
</template>

<script>

  import editDelImg from '@/components/EditDelImg'
  import imgTextDialog from '@/components/ImgTextDialog'
  import imgDialog from '@/components/ImgDialog'
  
  export default {
    components: {
      editDelImg,
      imgTextDialog,
      imgDialog,
    },
    data() {
      return {
        // 本页面所有表单值
        forms: {
          ruleName: '',           //规则名称
          keyWord: '',            //关键词
          resourceType: 'plac',   //回复内容类型： 1-图文，2-文字，3-图片
          text: '',               //文字类型的输入内容
          confirmText: '',        //已确认的文字类型内容
        },
        // 表单校验规则
        rules: {
          ruleName: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          keyWord: [
            { required: true, message: '请输入关键词', trigger: 'blur' }
          ],
          text: [
            { required: true, message: '请输入回复的内容', trigger: 'blur' }
          ],
        },
        // 模态框显示隐藏
        visible: {
          imgText: false,
          text: false,
          img: false,
        },

        //选中的图文类型具体内容
        imgTextData: {},

        //选中的图片
        imgData: {},

        //状态为修改时，修改的数据对象
        editData: {},
      };
    },

    methods: {

      // 添加图文素材
      chooseImgText(data) {
        this.forms.resourceType = '1'
        this.imgTextData = data
      },

      // 添加文字素材
      addText() {
        this.$refs.textForms.validate( valid => {
          if (valid) {
            this.visible.text = false
            this.forms.resourceType = '2'
            this.forms.confirmText = this.forms.text
          } else {
            return false;
          }
        })
      },

      //添加图片素材
      chooseImg(data) {
        this.forms.resourceType = '3'
        this.imgData = data
      },
      
      // 删除已选择的内容
      deleteContent() {
        this.$confirm('是否删除该回复内容?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then( () => {
          this.forms.resourceType = 'plac'

          this.imgTextData = {}
          this.forms.confirmText = this.forms.text = ''
          this.imgData = {}
          
        }).catch( () => {
          //do nothing
        })
      },

      // 删除数据
      handleDelete() {
        this.$confirm('是否删除该条回复？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          let params = {
            "id": this.editData.id,
            "officiaUserId": this.$store.state.userInfo.id,
          }

          let res = await this.$axios.deleteKeyWordResponse(params)
          if(res.code === 0) {
            this.$message.success(res.msg)
            setTimeout( () => {
              this.$router.push({name: 'KeyWordResponseList'})
            }, 1000)
          }
        }).catch(() => {})
      },

      // 提交保存数据
      submit() {
        if(isNaN(this.forms.resourceType)) {
          this.$message.warning('回复内容为空')
          return
        }

        this.$refs.forms.validate( valid => {
          if (valid) {
            if(this.editData.id) {
              this.updateData()
            } else {
              this.addData()
            }
          } else {
            return false;
          }
        })
      },
      async addData() {
        let params = {
          "ruleName": this.forms.ruleName,
          "keyWord": this.forms.keyWord,
          "replyType": this.forms.resourceType,
          "replayText": this.forms.confirmText,
          "officiaUserId": this.$store.state.userInfo.id,
          "sourceMaterialId": this.imgTextData.id || this.imgData.id || null
        }

        let res = await this.$axios.addKeyWordResponse(params)
        if(res.code === 0) {
          this.$message.success(res.msg)
          setTimeout( () => {
            this.$router.push({name: 'KeyWordResponseList'})
          }, 1000)
        }
      },
      async updateData() {
        let params = {
          "id": this.editData.id,
          "ruleName": this.forms.ruleName,
          "keyWord": this.forms.keyWord,
          "replyType": this.forms.resourceType,
          "replayText": this.forms.confirmText,
          "officiaUserId": this.$store.state.userInfo.id,
          "sourceMaterialId": this.imgTextData.id || this.imgData.id || null
        }

        let res = await this.$axios.updateKeyWordResponse(params)
        if(res.code === 0) {
          this.$message.success(res.msg)
          setTimeout( () => {
            this.$router.push({name: 'KeyWordResponseList'})
          }, 1000)
        }
      },
    },

    created() {
      let params = this.$route.params
      if(params.id) {
        this.editData = params
        this.forms.ruleName = params.ruleName
        this.forms.keyWord = params.keyWord
        this.forms.resourceType = params.replyType
        switch(params.replyType) {
          case '1':
            this.imgTextData = params.sourceMaterial
            break

          case '2':
            this.forms.confirmText = this.forms.text = params.replayText
            break

          case '3':
            this.imgData = params.sourceMaterial
            break
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>