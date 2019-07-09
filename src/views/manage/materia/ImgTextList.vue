<template>
  <card title="素材管理" class="h-100">
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick" class="mt-20">
      <el-tab-pane label="图文" name="imgText"></el-tab-pane>
      <el-tab-pane label="图片" name="img"></el-tab-pane>
      <el-tab-pane label="视频" name="video"></el-tab-pane>
    </el-tabs>

    <el-row>
      <el-col :xs="8" :sm="10" :md="12" :lg="14" :xl="16">
        <el-button type="primary" class="el-icon-plus" @click="$router.push({name: 'EditMaterial'})">新建图文素材</el-button>
      </el-col>
      <el-col :xs="16" :sm="14" :md="12" :lg="10" :xl="8">
        <el-input placeholder="搜索图文标题" v-model="searchVal" class="search-input">
          <el-button slot="suffix" type="primary" icon="el-icon-search" class="search-btn" @click="search">搜索</el-button>
        </el-input>
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
            <span class="table-title">图文消息</span><span class="info-text" v-show="scope">（共 {{ data.total }} 条）</span>
          </template>
          <template slot-scope="scope">
            <div class="no-wrap">
              <el-image
                style="width: 100px; height: 90px; vertical-align: middle;"
                :src="scope.row.sourceMaterialIcon"
                fit="fill"></el-image>
              <span class="ml-10">{{ scope.row.sourceMaterialTitle }}</span>
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

        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editMaterial(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        activeName: 'imgText',
        searchVal: '',
        pageNum: 1,
        pageSize: 5,
        data: [],
      }
    },
    methods: {
      handleTabClick(tab, event) {
        if(tab.name === 'img') this.$router.push({name: 'ImgList'})
        if(tab.name === 'video') this.$router.push({name: 'VideoList'})
      },
      editMaterial(index, row) {
        this.$router.push({name: 'EditMaterial', params: row})
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

      // 搜索
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

      // 改变当前页
      handleCurrentChange(num) {
        this.pageNum = num
        this.getData()
      },
      
      // 获取数据
      async getData(params) {
        params = params ? params : {
          "page": this.pageNum,
          "pagesize": this.pageSize,
          "sourceMaterialType": 1,                          // 素材类型： 1-图文， 2-图片， 3-视频
          "sourceMaterialTitle": this.searchVal,            // 素材标题
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
          "categoryId": null,                               // 图片素材分类ID
          "sourceMaterialSummary": null,                    // 图文素材摘要
          "sourceMaterialIntroduce": null,                  // 素材视频说明
        }

        let res = await this.$axios.getMaterial(params)
        if(res.code === 0) {
          this.data = res.data
        }
      }
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