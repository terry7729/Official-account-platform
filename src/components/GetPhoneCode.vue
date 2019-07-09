<template>
  <el-button 
    :size="size"
    :type="codeType" 
    @click="getCode"
    :disabled="!$valid.phone(phone) || codeType === 'default'"
  >
    {{ codeText }}
  </el-button>
</template>

<script>
  export default {
    props: [
      'size',
      'ruleForm',
      'phone',
      'validateField',
      'error',
    ],
    data() {
      return {
        codeType: 'primary',
        codeText: '获取验证码',
        count: 60,
        timer: null,
      }
    },
    methods: {
      // 获取验证码
      getCode() {
        if(!this.ruleForm) return

        this.$emit('update:error', '')
        this.ruleForm.validateField(this.validateField, async err => {
          if(!err && this.count === 60) {
            let res = await this.$axios.getPhoneCode({mobile: this.phone, type: "6"})
            if(res.code === 0) {
              this.codeType = 'default'
              this.codeText = this.count + ' S'
              this.startInterval()
            } else {  
              this.$emit('update:error', res.msg)
            }
          }
        })
      },

      //开始计时器
      startInterval() {
        this.timer = setInterval( () => {
          if(this.count === 0) {
            this.count = 60
            this.codeType = 'primary'
            this.codeText = '获取验证码'
            clearInterval(this.timer)
            this.timer = null
          } else {
            this.count--
            this.codeText = this.count + ' S'
          }
        }, 1000)
      },
    }
  }
</script>

<style scoped lang="scss">
  
</style>