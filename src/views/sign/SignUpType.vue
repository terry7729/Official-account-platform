<template>
  <div class="">
    
    <el-row>
      <el-col :xs="5" :sm="5" :md="5" :lg="8" :xl="9" style="height: 10px;"></el-col>
      <el-col :xs="14" :sm="14" :md="14" :lg="8" :xl="6">
        <div class="sign-up-type shadow tc">
          <el-row>
            <el-col :span="10">
              <div class="icon"></div>
            </el-col>

            <el-col :offset="4" :span="10">
              <div class="icon"></div>
            </el-col>
          </el-row>

          <el-row class="mt-30">
            <el-col :span="10">
              <p class="text tl">个人身份申请，适合垂直领域的专家、意见领袖、评论家、自媒体人士及站长申请</p>
            </el-col>

            <el-col :offset="4" :span="10">
              <p class="text tl">公司、分支机构等类型的组织申请</p>
            </el-col>
          </el-row>

          <el-row class="mt-40">
            <el-col :span="10">
              <el-button type="primary" @click="chooseType('SignUpPersonal')">选 择</el-button>
            </el-col>

            <el-col :offset="4" :span="10">
              <el-button type="primary" @click="chooseType('SignUpCompany')">选 择</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      chooseType(name) {
        this.$store.commit('setSignUpStep', 2)
        this.$router.push({name})
      }
    }
  }
</script>

<style scoped lang="scss">
  .sign-up-type {
    // width: 560px;
    // height: 390px;
    // margin-left:auto;
    // margin-right:auto;
    padding: 40px 80px;
    box-sizing: border-box;
    background: #fff;
  }

  .icon {
    height: 112px;
  }

</style>