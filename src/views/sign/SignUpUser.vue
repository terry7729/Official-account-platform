<template>
  <div class="sign-up-user shadow">
    <p class="title">
      <span class="cn">注册</span>
      <span class="en">RETISTER</span>
    </p>

    <el-form class="mt-40" :model="forms" :rules="rules" ref="form" @validate="handleValidate">
      <el-form-item prop="name" :error="error.name">
        <el-input v-model="forms.name" placeholder="请设置用户名"></el-input>
      </el-form-item>

      <el-form-item prop="phone" :error="error.phone">
        <el-input v-model="forms.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>

      <el-form-item prop="loginPwd">
        <el-input v-model="forms.loginPwd" type="password" placeholder="请设置登陆密码"></el-input>
      </el-form-item>

      <el-form-item prop="payPwd">
        <el-input v-model="forms.payPwd" type="password" placeholder="请设置支付密码"></el-input>
      </el-form-item>
      
      <el-form-item prop="phoneCode" :error="error.phoneCode">
        <el-input v-model="forms.phoneCode" placeholder="请输入验证码" style="width: 180px;"></el-input>
        <get-phone-code 
          style="width: 90px;"
          class="fr"
          size="small" 
          :ruleForm="$refs.form" 
          :error.sync="error.phone"
          :phone="forms.phone" 
          validateField="phone">
        </get-phone-code>
      </el-form-item>
      
      <el-form-item prop="agreement">
        <el-checkbox-group v-model="forms.agreement" @change="handleChange">
          <el-checkbox name="agreed">阅读并同意《博信公众号服务协议》</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item class="tc">
        <el-button type="primary" style="width: 100%;" @click="submit">注 册</el-button>
      </el-form-item>

      <p class="mt-30 tc">
        <span class="info-text">已有账号？</span>
        <span class="pointer" @click="$router.push({name: 'SignIn'})">去登录</span>
      </p>
    </el-form>
  </div>
</template>

<script>
  import getPhoneCode from '@/components/GetPhoneCode'
  export default {
    components: {
      getPhoneCode,
    },
    data() {

      const checkPhone = (rule, val, callback) => {
        if(!this.$valid.phone(val)) {
          return callback(new Error('手机号不正确'))
        }
        callback()
      }

      const checkPwd = (rule, val, callback) => {
        if(!this.$valid.pwd(val)) {
          return callback(new Error('8-16位字母、数字或者英文符号，区分大小写'))
        }
        if(this.forms.payPwd === this.forms.loginPwd) {
          return callback(new Error('支付密码、登录密码不可一致'))
        }
        callback()
      }

      return {
        forms: {
          name: '',
          phone: '',
          loginPwd: '',
          payPwd: '',
          phoneCode: '',
          agreement: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{2,12}$/, message: '长度2-12位汉字、字母或数字组合', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ],
          loginPwd: [
            { required: true, message: '请设置登陆密码', trigger: 'blur' },
            { validator: checkPwd, trigger: 'blur' },
          ],
          payPwd: [
            { required: true, message: '请设置支付密码', trigger: 'blur' },
            { validator: checkPwd, trigger: 'blur' },
          ],
          phoneCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { pattern: /^\d{6}$/, message: '验证码错误', trigger: 'blur' }
          ],
          agreement: [
            { required: true, message: '请阅读并同意公众号服务协议', trigger: 'blur' }
          ],
        },
        error: {
          name: '',
          phone: '',
          phoneCode: '',
        }
      }
    },
    methods: {
      //一段时间后警告消失
      handleValidate() {
        // setTimeout( () => {
        //   this.$refs.form.clearValidate()
        // }, 6000)
      },

      // 是否同意协议
      handleChange(val) {
        if(!val) this.forms.agreement = ''
      },

      // 提交注册
      submit() {
        this.$refs.form.validate( res =>{
          if(res) {
            this.checkInfo()
          } else {
            return false
          }
        })
      },
      async checkInfo() {
        let params = {
          "userName": this.forms.name,
          "mobile": this.forms.phone,
          // "password": this.$md5(this.forms.loginPwd),
          // "payPassword": this.$md5(this.forms.payPwd),
          "password": this.forms.loginPwd,
          "payPassword": this.forms.payPwd,
          "code": this.forms.phoneCode,
          "type": "6"
        }

        this.error.name = ''
        this.error.phone = ''
        this.error.phoneCode = ''

        // let res = await this.$axios.checkUserName({userName: this.forms.name})
        // if(res.code !== 0) {
        //   this.error.name = res.msg
        //   return
        // }

        let res = await this.$axios.submitSignUpInfo(params)
        if(res.code === 0) {
          this.$store.commit('setSignUpStep', 1)
          this.$store.commit('setSignUpInfo', params)
          this.$router.push({name: 'SignUpType'})
        } else {
          switch(res.code) {
            case 1:
              this.error.name = res.msg
              break
            case 5:
              this.error.phoneCode = res.msg
              break
            case 6:
              this.error.phone = res.msg
              break
          }
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .sign-up-user {
    width: 340px;
    margin-left:auto;
    margin-right:auto;
    padding: 25px 30px;
    box-sizing: border-box;
    background: #fff;
  }

  .title {
    color: $primary-color;
    .cn {
      display: table-cell;
      vertical-align: bottom;
      font-size: 24px;
    }
    .en {
      display: table-cell;
      vertical-align: bottom;
      padding-left: 15px;
      font-size: 16px;
    }
  }
</style>