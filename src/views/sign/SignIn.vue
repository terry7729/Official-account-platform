<template>
  <div class="h-100 cf">
    <div class="login-box shadow">
      <p class="title">
        <span class="cn">登录</span>
        <span class="en">LOGIN</span>
      </p>

      <el-form class="mt-40" :model="forms" :rules="rules" ref="form" @keyup.enter.native="submit">

        <el-form-item prop="phone">
          <el-input v-model="forms.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="loginPwd">
          <el-input v-model="forms.loginPwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="remenber" class="pos-r">
          <el-checkbox-group v-model="forms.remenber">
            <el-checkbox name="yes">记住账号</el-checkbox>
          </el-checkbox-group>
          <span class="forget-pwd">忘记密码</span>
        </el-form-item>

        <el-form-item class="mt-20 tc">
          <el-button type="primary" style="width: 100%;" @click="submit">登 录</el-button>
        </el-form-item>

        <p class="mt-30 tc">
          <span class="info-text">未注册？</span>
          <span class="pointer" @click="$router.push({name: 'SignUpUser'})">去注册</span>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const checkPhone = (rule, val, callback) => {
        if(!this.$valid.phone(val)) {
          return callback(new Error('手机号不正确'))
        }
        callback()
      }

      return {
        forms: {
          phone: '13265881011',
          loginPwd: '123456',
          remenber: '',
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' },
          ],
          loginPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {

      // 提交注册
      submit() {
        this.$refs.form.validate( res =>{
          if(res) {
            this.signIn()
          } else {
            return false
          }
        })
      },
      async signIn() {
        let params = {
          "mobile": this.forms.phone,
          // "password": this.$md5(this.forms.loginPwd),
          "password": this.forms.loginPwd,
        }

        let res = await this.$axios.signIn(params)
        if(res.code === 0) {
          this.$store.commit('setUserInfo', res.data.officialUser)
          sessionStorage.setItem('userInfo', JSON.stringify(res.data.officialUser))
          this.$router.replace({name: 'Home'})
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  .login-box {
    width: 340px;
    height: 400px;
    margin: 0 auto;
    margin-top: 10vh;
    padding: 30px;
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

  .forget-pwd {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>