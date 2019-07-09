<template>
  <div class="mt-30">
    <el-row>
      <el-col :xs="8" :sm="10" :md="12" :lg="14" :xl="16">
        <el-button type="primary" class="el-icon-plus" @click="handleEdit(null)">添加回复</el-button>
      </el-col>
      <el-col :xs="16" :sm="14" :md="12" :lg="10" :xl="8">
        <el-input placeholder="搜索关键词" v-model="searchVal" class="search-input">
          <el-button slot="suffix" type="primary" icon="el-icon-search" class="search-btn" @click="search">搜索</el-button>
        </el-input>
      </el-col>
    </el-row>

    <el-table
      :data="data.list"
      ref="table"
      row-key="id"
      class="mt-20"
      stripe
      style="width: 100%">

      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="border pd-20">
            <div class="border-bottom expand-row">
              <span class="expand-title">关键词</span>
              <span>{{ props.row.keyWord }}</span>
            </div>
            <div class="border-bottom no-wrap" v-if="props.row.replyType === '1'">
              <span class="expand-title">回复内容</span>
              <span>{{ props.row.sourceMaterial.sourceMaterialTitle }}</span>
            </div>
            <div class="pt-10" v-if="props.row.replyType === '1'">
              <span class="expand-title"></span>
              <el-image class="radius" style="width: 150px; height: 150px" :src="props.row.sourceMaterial.sourceMaterialIcon" fit="fill"></el-image>
            </div>
            <div class="border-bottom no-wrap" v-if="props.row.replyType === '2'">
              <span class="expand-title">回复内容</span>
              <span>{{ props.row.replayText }}</span>
            </div>
            <div class="pt-10" v-if="props.row.replyType === '3'">
              <span class="expand-title">回复内容</span>
              <el-image class="radius" style="width: 150px; height: 150px; vertical-align: top;" :src="props.row.sourceMaterial.sourceMaterialIcon" fit="fill"></el-image>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="规则名称"
        prop="ruleName">
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        label="关键词"
        prop="keyWord">
      </el-table-column>

      <el-table-column
        label="回复内容"
        width="150"
        :formatter="(row, col, cell, index) => { return cell === '1' ? '图文' : cell === '2' ? '文字' : '图片' }"
        prop="replyType">
      </el-table-column>

      <el-table-column label="操作" width="210">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDetail(scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      class="mt-20 tr"
      background
      layout="prev, pager, next"
      :current-page="pageNum"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :total="data.total">
    </el-pagination>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        searchVal: '',
        pageNum: 1,
        pageSize: 10,
        data: [],
      }
    },
    methods: {
      // 展示详情
      handleDetail(row) {
        this.$refs.table.toggleRowExpansion(row)
      },

      // 修改数据
      handleEdit(row) {
        this.$router.push({name: 'EditKeyWordResponse', params: row})
      },

      // 删除数据
      async handleDelete(row) {
        this.$confirm('是否删除该条回复？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          let params = {
            "id": row.id,
            "officiaUserId": this.$store.state.userInfo.id,
          }

          let res = await this.$axios.deleteKeyWordResponse(params)
          if(res.code === 0) {
            this.$message.success(res.msg)
            this.getData()
          }
        }).catch(() => {})
      },

      // 通过关键词搜索
      search() {
        let params = {
          "page": 1,
          "pagesize": 100,
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
          "keyword": this.searchVal
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
          "officiaUserId": this.$store.state.userInfo.id,   // 公众号ID
          "keyword": this.searchVal
        }

        let res = await this.$axios.getKeyWordResponseList(params)
        if(res.code === 0) {
          this.data = res.data
        }
      },
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .expand-title {
    display: inline-block;
    width: 80px;
    line-height: 2.5;
  }
</style>