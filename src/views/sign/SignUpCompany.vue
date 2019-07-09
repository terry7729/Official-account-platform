<template>
  <el-row>
    <el-col :xs="5" :sm="5" :md="5" :lg="6" :xl="7" style="height: 10px;"></el-col>
    <el-col :xs="14" :sm="14" :md="14" :lg="12" :xl="10" class="pt-30 pb-30 pl-40 pr-40 shadow" style="background: #fff;">

      <el-form :model="forms" :rules="rules" ref="form" label-width="120px" hide-required-asterisk @validate="handleValidate">
        <p class="module-title">公众号信息</p>

        <el-form-item class="mt-20" label="公众号名称" prop="name" :error="error.name">
          <el-input v-model="forms.name" placeholder="请输入公众号名称" :minlength="2" :maxlength="10" show-word-limit></el-input>
          <span class="info-text">2-10个字，使用与发文领域相关文字，能有效提升读者点击量</span>
        </el-form-item>

        <el-form-item label="公众号简介" prop="intro">
          <el-input 
            v-model="forms.intro" 
            type="textarea"
            :minlength="4" 
            :maxlength="120"
            :autosize="{ minRows: 2, maxRows: 6 }"
            show-word-limit
            placeholder="请输入公众号简介">
          </el-input>
          <span class="info-text">4-120个字，介绍公众号的功能与特色</span>
        </el-form-item>

        <el-form-item label="设置头像">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="upload"
            :show-file-list="false"
            :before-upload="beforeUpload">
            <img v-if="forms.imageUrl" :src="forms.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="info-text">上传公众号头像，支持jpg、jpeg、png，最佳像素200x200，不超过5MB</span>
        </el-form-item>

        <p class="module-title mt-40">企业信息</p>

        <el-form-item class="mt-20" label="企业名称" prop="companyName">
          <el-input v-model="forms.companyName" placeholder="请输入企业名称"></el-input>
          <span class="info-text">请与营业执照名称保持一致</span>
        </el-form-item>

        <el-form-item label="营业执照" prop="license">
          <el-input v-model="forms.license" placeholder="请输入营业执照序列号"></el-input>
          <span class="info-text">三证合一的证件为统一社会信用代码</span>
        </el-form-item>

        <el-form-item label="营业执照影印件">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="upload2"
            :show-file-list="false"
            :before-upload="beforeUpload">
            <img v-if="forms.imageUrl2" :src="forms.imageUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="info-text">上传营业执照原件的彩色扫描件或复印件，请确保清晰可见，不超过5MB</span>
        </el-form-item>

        <p class="module-title mt-40">运营者信息</p>

        <el-form-item label="运营者姓名" prop="operator" class="mt-20">
          <el-input v-model="forms.operator" placeholder="请输入运营者姓名"></el-input>
          <span class="info-text">信息审核成功后身份证名字不能修改</span>
        </el-form-item>

        <el-form-item label="身份证号" prop="ID" :error="error.ID">
          <el-input v-model="forms.ID" placeholder="请输入运营者身份证号码"></el-input>
          <span class="info-text">请确保身份证号和身份证名称对应，同一个身份证号允许申请一个公众号</span>
        </el-form-item>
      </el-form>

      <div class="mt-40 tc">
        <el-button type="primary" style="width: 60%;" @click="submit">提 交</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      const checkName = async (rule, val, callback) => {
        let res = await this.$axios.checkOfficialAccountName({officialName: this.forms.name})
        if(res.code === 0) {
          callback()
        } else {
          callback(new Error(res.msg))
        }
      }

      return {
        forms: {
          name: '',
          intro: '',
          imageUrl: '',
          uploadUrl: '',
          operator: '',
          ID: '',
          companyName: '',
          license: '',
          imageUrl2: '',
          uploadUrl2: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入公众号名称', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,10}$/, message: '2-10个字，使用与发文领域相关文字，能有效提升读者点击量', trigger: 'blur' },
            // { validator: checkName, trigger: 'blur' },
          ],
          intro: [
            { required: true, message: '请输入公众号简介', trigger: 'blur' },
            { min: 4, max: 120, message: '4-120个字，介绍公众号的功能与特色', trigger: 'blur'},
          ],
          operator: [
            { required: true, message: '请输入运营者姓名', trigger: 'blur' },
            { pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不正确', trigger: 'blur' }
          ],
          ID: [
            { required: true, message: '请输入运营者身份证号码', trigger: 'blur' },
            { pattern: /^\d{17}[0-9Xx]|\d{15}$/, message: '身份证号码错误', trigger: 'blur' },
          ],
          companyName: [
            { required: true, message: '请输入企业名称', trigger: 'blur' },
          ],
          license: [
            { required: true, message: '请输入营业执照序列号', trigger: 'blur' },
          ],
        },
        error: {
          name: '',
          ID: '',
        }
      }
    },
    methods: {
      handleValidate(prop, flag, msg) {
        let childs = this.$refs.form.$children
        for(let i=0; i<childs.length; i++) {
          if(childs[i].prop === prop) {
            if(flag) {
              childs[i].$el.children[1].children[1].style.display = 'block'
            } else {
              childs[i].$el.children[1].children[1].style.display = 'none'
            }
          }
        }
      },

      //上传图片
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
          this.forms.imageUrl = URL.createObjectURL(file.file)
          this.forms.uploadUrl = res.data.url
        }
      },
      async upload2(file) {
        let res = await this.$axios.uploadImg(file.file)
        if(res.code === 0) {
          this.forms.imageUrl2 = URL.createObjectURL(file.file)
          this.forms.uploadUrl2 = res.data.url
        }
      },

      // 提交注册
      submit() {
        this.$refs.form.validate( res =>{
          if(res) {
            this.retister()
          } else {
            return false
          }
        })
      },
      async retister() {
        let params = {
          ...this.$store.state.signUpInfo,
          "userType": "2",
          "officialName": this.forms.name,
          "introduce": this.forms.intro,
          "icon": this.forms.uploadUrl,
          "operatorName": this.forms.operator,
          "operatorIdCard": this.forms.ID,
          "enterpriseName": this.forms.companyName,
          "licenseSerial": this.forms.license,
          "licenseIcon": this.forms.uploadUrl2,
        }

        this.error.name = ''
        this.error.ID = ''

        let res = await this.$axios.signUp(params)
        if(res.code === 0) {
          this.$store.commit('setSignUpInfo', {})
          this.$router.replace({name: 'SignIn'})
        } else {
          switch(res.code) {
            case 4:
              this.$refs.form.$children[0].$el.children[1].children[1].style.display = 'none'
              this.error.name = res.msg
              break
            case 2:
              this.$refs.form.$children[7].$el.children[1].children[1].style.display = 'none'
              this.error.ID = res.msg
              break
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .info-text {
    position: absolute;
    top: 100%;
    left: 0;
    line-height: 1;
    padding-top: 4px;
    font-size: 12px;
  }
  
  .el-form-item {
    margin-bottom: 30px;
  }
</style>