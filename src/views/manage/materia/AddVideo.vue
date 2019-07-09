<template>
  <card title="添加视频">
    <el-row class="mt-40">
      <el-col :xs="3" :sm="3" :md="3" :lg="4" :xl="5" style="height:10px;"></el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="16" :xl="14">
        <div class="tc">
          <el-upload
            ref="upload"
            action=""
            :show-file-list="false"
            :http-request="selectFile"
            :before-upload="beforeUpload">
            <el-button slot="trigger" size="small" type="primary" class="el-icon-plus">上传视频</el-button>
          </el-upload>
          <p class="info-text mt-10">请上传时长小于30分钟的视频，暂只支出mp4和ogg格式</p>
        </div>

        <el-form class="mt-40" :model="forms" :rules="rules" ref="form" label-width="100px" hide-required-asterisk :show-message="false">
          <el-form-item label="封面" prop="title">
            <div class="progress tc pt-20 pl-20 pr-20 radius">
              <el-progress :percentage="percent" :stroke-width="12" class="mb-10"></el-progress>
              <span class="info-text">视频上传后自动设置封面</span>
            </div>
            <span class="info-text">视频上传后自动设置封面</span>
          </el-form-item>

          <el-form-item label="标题" prop="title">
            <el-input v-model="forms.title" :maxlength="30" show-word-limit></el-input>
            <span class="info-text">标题将展示在相关播放页面，建议填写清晰、准确、生动的标题</span>
          </el-form-item>

          <el-form-item label="视频介绍" prop="intro">
            <el-input 
              v-model="forms.intro" 
              type="textarea"
              :maxlength="120"
              :autosize="{ minRows: 3, maxRows: 6 }"
              show-word-limit>
            </el-input>
            <span class="info-text">介绍语将展示在相关播放页面，建议填写简介明确、有信息量的内容</span>
          </el-form-item>

          <p class="tc">不得上传未经授权的他人作品、以及色情、发动等违规视频</p>

          <div class="tc mt-20">
            <el-checkbox v-model="forms.agreement">我已阅读并同意<span class="primary-text">《公众平台视频上传服务规则》</span></el-checkbox>
          </div>

        </el-form>
        <div class="mt-40 tc">
          <el-button @click="$router.push({name: 'VideoList'})">取 消</el-button>
          <el-button type="primary" @click="submit">保 存</el-button>
        </div>
      </el-col>
    </el-row>

    <video style="display:none;" controls="controls" :src="forms.videoUrl" @canplaythrough="getVideoLong"></video>
  </card>
</template>

<script>
  export default {
    data() {
      return {
        forms: {
          title: '',
          intro: '',
          videoUrl: '',     //视频路径，用于读取视频信息
          coverUrl: '',     //封面路径
          uploadUrl: '',    //上传后的服务器路径
          duration: 0,
          agreement: true,
        },
        fileContent: null,  // 临时保存file文件对象
        percent: 0,
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min:2, max:30, message: '标题2-30个字', trigger: 'blur' },
          ],
          intro: [
            { required: true, message: '请输入视频介绍', trigger: 'blur' },
          ],
        },
      }
    },
     methods: {
      //上传图片
      beforeUpload(file) {
        let url = URL.createObjectURL(file)
        this.forms.videoUrl = url
        const fileType = file.type === 'video/mp4' || file.type === 'audio/ogg'

        if (!fileType) {
          this.$message.error('目前只支持mp4和ogg格式')
        }

        if(fileType) this.percent = 0
        return fileType
      },
      getVideoLong(e) {
        this.forms.duration = e.target.duration

        if(this.forms.duration / 60 > 30) {
          this.$message.error('请上传时长小于30分钟的视频')
          return
        } else {
          this.upload()
        }
      },
      selectFile(file) {
        let data = new FormData()
        data.append('resource', file.file)
        this.fileContent = data
      },
      async upload() {
        this.$axios.service({
          url: '/upload/video',
          method: 'post',
          onUploadProgress: event => {
            if(event.loaded) this.percent = parseInt(event.loaded / event.total * 100)
          },
          data: this.fileContent,
        }).then( res => {
          this.$message.success(res.msg)
          this.forms.coverUrl = res.data.coverUrl
          this.forms.uploadUrl = res.data.url
        }).catch( err => {
          console.log(err)
        })
      },

      // 提交保存
      submit() {
        if(!this.forms.coverUrl || !this.forms.uploadUrl) {
          this.$message.error('请上传视频')
          return
        }

        this.$refs.form.validate( (res, data) =>{
          if(res) {
            this.addData()
          } else {
            this.$message.error(data[Object.keys(data)[0]][0].message)
            return false
          }
        })
      },
      async addData() {
        let params = {
            "officiaUserId": this.$store.state.userInfo.id,               // 公众号ID（必传）
            "sourceMaterialTitle": this.forms.title,                      // 素材标题（sourceMaterialType 1,3必传）
            "sourceMaterialType": 3,                                      // 素材类型： 1-图文， 2-图片， 3-视频
            "sourceMaterialIcon": null,                                   // 素材图片地址，sourceMaterialType 为1和2时必传，其他不必传
            "sourceMaterialVideoIcon": this.forms.coverUrl,               // 素材视频封面图片地址，sourceMaterialType 为3时必传，其他不必传
            "categoryId": null,                                           // 图片素材所属分类ID， sourceMaterialType 为2必传
            "sourceMaterialText": null,                                   // 素材文本内容
            "sourceMaterialVideo": this.forms.uploadUrl,                  // 素材视频，sourceMaterialType 为3时必传，其他不必传
            "sourceMaterialSummary": null,                                // 素材图文摘要,sourceMaterialType 为1时必传其他不必传
            "sourceMaterialIntroduce": this.forms.intro,                  // 素材视频说明 。sourceMaterialType 为3时必传，其他不必传
            "recTime": this.forms.duration,                               // 视频时长。sourceMaterialType 为3时必传，其他不必传
          }

        let res = await this.$axios.addMaterial(params)
        if(res.code === 0) {
          this.$message.success(res.msg)

          this.forms.title = ''
          this.forms.intro = ''
          this.forms.videoUrl = ''
          this.forms.coverUrl = ''
          this.forms.uploadUrl = ''
          this.forms.duration = 0

          this.percent = 0
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .progress {
    height:90px;
    background:rgba(242,246,252,1);
    box-sizing: border-box;
  }
</style>