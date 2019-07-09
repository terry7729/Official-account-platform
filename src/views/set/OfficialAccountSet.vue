<template>
  <div>
    <el-card shadow="never" class="cardHeight" :body-style="{height:'845px'}" >
      <div class="el-card-body-title">
        <span class="primary-text">公众号设置</span>
      </div>
      <el-col :xs="12" :sm="16" :md="16" :lg="24" :xl="24" class>
        <el-form ref="form" class="mt-20 border forms" :model="form" label-width="129px">
          <el-form-item class="border-bottom">
            <el-image
              style="width: 80px; height: 80px;;margin-left:-40px;left:50%;"
              class="mt-10"
              src="../../assets/images/search@2x.png"
              fit="cover"
            ></el-image>
          </el-form-item>
          <el-form-item label="名称" class="border-bottom">
            <div class="pl-20 left">BoChat2019</div>
            <el-button type="primary" class="updateName mr-20" @click="onSubmit">修改</el-button>
          </el-form-item>
          <el-form-item label="简介" class="border-bottom">
            <div class="pl-20">BoChat2019</div>
            <el-button type="primary" class="updateName mr-20" @click="onSubmit">修改</el-button>
          </el-form-item>
          <el-form-item label="类型" class="border-bottom">
            <div class="pl-20">BoChat2019</div>
          </el-form-item>
          <el-form-item label="认证情况" class="border-bottom">
            <div class="pl-20">BoChat2019</div>
            <el-button type="primary" class="updateName mr-20" @click="onSubmit">申请博信认证</el-button>
          </el-form-item>
          <el-form-item label="主体信息" class="border-bottom">
            <div class="pl-20">BoChat2019</div>
          </el-form-item>
          <el-form-item label="相关小程序" class="border-bottom">
            <div class="pl-20">BoChat2019</div>
          </el-form-item>

       
        </el-form>
      </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style scoped lang="scss">
.cardHeight{

}
.left {
  display: inline-block;
}
.updateName {
  position: absolute;
  right: 20px;
  top: 3px;
  
}
</style>