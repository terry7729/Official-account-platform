<template>
  <card title="素材管理" class="h-100">
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" class="mt-20">
      <el-tab-pane label="图文" name="imgText"></el-tab-pane>
      <el-tab-pane label="图片" name="img"></el-tab-pane>
      <el-tab-pane label="视频" name="video"></el-tab-pane>
    </el-tabs>

    <el-row>
      <el-col :xs="8" :sm="8" :md="8" :lg="12" :xl="16">
        <el-upload
          ref="upload"
          action=""
          :http-request="upload"
          :show-file-list="false"
          :before-upload="beforeUpload">
          <el-button slot="trigger" size="small" type="primary" class="el-icon-plus">上传图片</el-button>
        </el-upload>
      </el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="12" :xl="8" class="tr">
        <el-select v-model="type" placeholder="请选择" class="mr-30" @change="handleTypeChange">
          <el-option
            v-for="item in $store.state.imgTypes"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id">
            <span style="float: left">{{ item.categoryName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.iconNum }}</span>
          </el-option>
        </el-select>

        <el-button type="primary" @click="addType">添加分组</el-button>
      </el-col>
    </el-row>

    <div class="mt-20 border-top border-left border-right table-box">
      <el-table
        :data="data.list"
        ref="table"
        row-key="id"
        height="100%"
        :cell-style="{padding: '9px 0'}"
        :header-cell-style="{padding: '9px 0'}"
        style="width: 100%">

        <el-table-column show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span class="table-title">全部图片</span><span class="info-text" v-show="scope">（共 {{ data.total }} 条）</span>
          </template>
          <template slot-scope="scope">
            <div class="no-wrap">
              <el-image
                style="width: 100px; height: 90px; vertical-align: middle;"
                :src="scope.row.sourceMaterialIcon"
                fit="fill"></el-image>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="更新时间"
          width="200"
          prop="updateTime"
          :formatter="(row, col, cell, index) => { return $funs.getTime(cell) }"
        >
        </el-table-column>

        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="14">
                <el-dropdown>
                  <el-button size="mini" type="primary">
                    切换分组<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in $store.state.imgTypes" :key="item.id" @click.native="updateType(scope.row, item.id)">
                      {{ item.id ? item.categoryName : '默认' }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col :span="10">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <el-pagination
      class="mt-20 tr"
      background
      layout="prev, pager, next"
      :current-page="pageNum"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :total="data.total">
    </el-pagination>
  </card>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'img',
        searchVal: '',
        pageNum: 1,
        pageSize: 5,
        type: null,
        data: {},
      }
    },
    methods: {
      handleTabClick(tab, event) {
        if(tab.name === 'imgText') this.$router.push({name: 'ImgTextList'})
        if(tab.name === 'video') this.$router.push({name: 'VideoList'})
      },
      handleTypeChange(val) {
        this.type = val
        this.handleCurrentChange(1)
      },
      handleDelete(index, row) {
        this.$confirm('删除后不会影响已群发的消息，确定删除该素材？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          let res = await this.$axios.delMaterial({sourceMaterialId: row.id})
          if(res.code === 0) {
            this.$message.success('删除成功!')
            this.getData()
          }
        }).catch(() => {})
      },
      handleCurrentChange(num) {
        this.pageNum = num
        this.getData()
      },

      // 上传图片
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
          let url = res.data.url
          let params = {
            "officiaUserId": this.$store.state.userInfo.id,               // 公众号ID（必传）
            "sourceMaterialTitle": null,                                  // 素材标题（sourceMaterialType 1,3必传）
            "sourceMaterialType": 2,                                      // 素材类型： 1-图文， 2-图片， 3-视频
            "sourceMaterialIcon": url,                                    // 素材图片地址，sourceMaterialType 为1和2时必传，其他不必传
            "sourceMaterialVideoIcon": null,                              // 素材视频封面图片地址，sourceMaterialType 为3时必传，其他不必传
            "categoryId": this.type,                                      // 图片素材所属分类ID， sourceMaterialType 为2必传
            "sourceMaterialText": null,                                   // 素材文本内容
            "sourceMaterialVideo": null,                                  // 素材视频，sourceMaterialType 为3时必传，其他不必传
            "sourceMaterialSummary": null,                                // 素材图文摘要,sourceMaterialType 为1时必传其他不必传
            "sourceMaterialIntroduce": null,                              // 素材视频说明 。sourceMaterialType 为3时必传，其他不必传
          }

          res = await this.$axios.addMaterial(params)
          if(res.code === 0) {
            this.$message.success(res.msg)
            this.$funs.getImgTypes()
            this.getData()
          }
        }
      },

      // 添加分组
      async addType() {
         this.$prompt('请输入分组名', '设置名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,10}$/,
          inputErrorMessage: '分组名长度1到10个字符'
        }).then( async ({ value }) => {
          for( let i=0; i<this.$store.state.imgTypes.length; i++) {
            if (value.trim() === this.$store.state.imgTypes[i].categoryName) {
              this.$message.warning('分组已存在')
              return
            }
          }

          let params = {
            categoryName: value,
            officiaUserId: this.$store.state.userInfo.id
          }
          let res = await this.$axios.addImgTypes(params)
          if(res.code === 0) {
            this.$message.success('添加成功')
            this.$funs.getImgTypes()
          }

        }).catch(() => {})
      },
      
      // 获取数据
      async getData() {

        let params = {
          "page": this.pageNum,
          "pagesize": this.pageSize,
          "sourceMaterialType": 2,                          // 素材类型： 1-图文， 2-图片， 3-视频
          "sourceMaterialTitle": null,                      // 素材标题
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
          "categoryId": this.type,                          // 图片素材分类ID
          "sourceMaterialSummary": null,                    // 图文素材摘要
          "sourceMaterialIntroduce": null,                  // 素材视频说明
        }

        let res = await this.$axios.getMaterial(params)
        // console.log(res)
        if(res.code === 0) {
          this.data = {}
          this.data = res.data
        }
      },

      // 更新分组
      async updateType(row, typeId) {
        let params = {
          "officiaUserId": this.$store.state.userInfo.id,
          "id": row.id,
          "categoryId": typeId,
        }

        let res = await this.$axios.updateImgTypes(params)
        if(res.code === 0) {
          this.$message.success('已修改分组')
          this.$funs.getImgTypes()
          this.getData()
        }
      },
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .table-box {
    height: calc(100% - 220px);
  }
</style>