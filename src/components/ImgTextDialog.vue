<template>
  <div>
    <el-dialog title="选择图文素材" top="5vh" :visible.sync="show" width="600px" :before-close="handleClose" @open="handleOpen">
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="$router.push({name: 'EditMaterial'})">新建</el-button>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="搜索关键词" v-model="searchVal" class="search-input">
            <el-button slot="suffix" type="primary" icon="el-icon-search" class="search-btn" @click="search">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>

      <div class="mt-20 of-y-auto" style="max-height: 60vh">
        <div class="img-text-box border-bottom mb-10" v-for="item in list" :key="item.id" @click="handleSelect(item)">
          <el-image
            style="min-width: 150px; max-width:150px; height: 100%;"
            class="radius"
            :src="item.sourceMaterialIcon"
            fit="fill">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>

          <div class="ml-20 mr-20 no-wrap" style="flex: 1;">
            <span class="title">{{ item.sourceMaterialTitle }}</span>
          </div>

          <el-checkbox :value="item.id === selectData.id" class="pr-20"></el-checkbox>
          
        </div>
          <div class="info-text pt-50 tc" v-if="!list.length">暂无数据</div>
      </div>

      <div slot="footer" class="tc">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      imgTextData: {
        type: Object,
        default: {
          id: 0,
        }
      }
    },
    data() {
      return {
        searchVal: '',
        pageNum: 1,
        pageSize: 10,

        //图文&图片数据
        list: [],

        //临时保存选择的数据
        selectData: {},
      }
    },
    methods: {
      //模态框打开事件
      handleOpen() {
        this.selectData = this.imgTextData
        if(!this.list.length) this.getData()
      },

      //模态框关闭事件
      handleClose() {
        this.$emit('update:show', false)
      },
      
      handleSelect(item) {
        this.selectData = item
      },

      // 通过关键词搜索
      search() {
        let params = {
          "page": 1,
          "pagesize": 100,
          "sourceMaterialType": 1,                          // 素材类型： 1-图文， 2-图片， 3-视频
          "sourceMaterialTitle": this.searchVal,            // 素材标题
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
        }

        this.getData( this.searchVal && params )            // 有搜索值的情况下使用当前params， 否则使用getData内定义的params
      },
      
      //添加素材
      handleSubmit() {
        if(this.selectData.id) {
          this.$emit('update:show', false)
          this.$emit('submit', this.selectData)
        } else {
           this.$message.warning('未选择任何素材')
        }
      },

      // 获取数据
      async getData(params) {
        params = params ? params : {
          "page": this.pageNum,
          "pagesize": this.pageSize,
          "sourceMaterialType": 1,                          // 素材类型： 1-图文， 2-图片， 3-视频
          "sourceMaterialTitle": null,                      // 素材标题
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
          "categoryId": null,                               // 图片素材分类ID
          "sourceMaterialSummary": null,                    // 图文素材摘要
          "sourceMaterialIntroduce": null,                  // 素材视频说明
        }

        let res = await this.$axios.getMaterial(params)
        if(res.code === 0) this.list = res.data.list
      }
    },
  }
</script>

<style scoped lang="scss">
  .img-text-box {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
</style>