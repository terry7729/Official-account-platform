<template>
  <div>
    <el-row class="mt-40">
      <el-col :xs="5" :sm="5" :md="5" :lg="6" :xl="7" style="height: 10px;"></el-col>
      <el-col :xs="14" :sm="14" :md="14" :lg="12" :xl="10" class="pt-30 pb-20 shadow" style="background: #fff;">
        <el-steps :active="$store.state.signUpStep" process-status="finish" finish-status="success" align-center>
          <el-step title="注册账号"></el-step>
          <el-step title="选择类型"></el-step>
          <el-step title="填写资料"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <router-view class="mt-30"></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">

</style>