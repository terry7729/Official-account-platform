<template>
  <div class>
    <el-row>
      <el-col :xs="8" :sm="10" :md="12" :lg="14" :xl="16">
        <el-button type="primary" @click="removeBlackList">移出黑名单</el-button>
      </el-col>
    </el-row>
    <div class="content table-box mt-20 border-top border-left border-right">
      <el-table
        :data="data.list"
        tooltip-effect="dark"
        style="width: 100%"
        ref="table"
        row-key="id"
        @selection-change="handleSelectionChange"
        :cell-style="{padding: '9px 0'}"
        :header-cell-style="{padding: '9px 0'}"
      >
        <el-table-column type="selection" width="54"></el-table-column>
        <el-table-column label="全部用户" width>
          <template slot-scope="scope">
            <div class="fansinfo">
              <img
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                alt
                class="img"
              />
              <div class="fans">
                <div class="remake">
                  {{scope.row.remark||scope.row.userName}}
                  <div class="label" v-for="it in scope.row.labeList">{{it}}</div>
                </div>
                <span class="date">{{scope.row.createTime}}关注</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop label width="116">
          <el-button size="small">修改备注</el-button>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="mt-20 tr"
      :page-size="5"
      @current-change="handleCurrentChange"
      :total="data.total"
      background
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
      pageNum: 1,
      pageSize: 5,
      selectRows:[],
      selectRowsId:[]
    };
  },
  methods: {
    async getBlackList() {
      let params = {
        officiaUserId: 1,
        page: this.pageNum,
        pagesize: this.pageSize
      };
      let res = await this.$axios.getBlackList(params);
      if (res.code === 0) {
        this.data = res.pageInfo;
        console.log(this.data);
      }
    },
    //添加或取消黑名单
    async removeBlackList() {
      let params = {
        type: "0",
        fansId: this.selectRowsId
      };
      let res = await this.$axios.addOrRemoveBlaklist(params);
      console.log(res);
      if (res.code === 0) {
        this.getBlackList()
      }
    },
    //选中改变事件
    handleSelectionChange(rows) {
      this.selectRows = rows;
      this.selectRowsId = [];
      this.selectRows.forEach(v => {
        this.selectRowsId.push(JSON.stringify(v.id));
      });
    },
    //分页点击事件
    handleCurrentChange(num) {
      this.pageNum = num;
      this.getFansAndLables();
    }
  },
  created() {
    this.getBlackList();
  }
};
</script>

<style  scoped lang="scss">
.fansinfo {
  display: flex;
  > .img {
    width: 50px;
    height: 50px;
  }
  > .fans {
    margin-left: 16px;

    .remake {
      display: flex;
      align-items: flex-start;
    }
    > .date {
      font-size: 12px;
      color: $sub-text-color;
    }
  }
  .label {
    width: 50px;
    height: 24px;
    background: #ff8c5b;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 24px;
    display: inline-block;
    // margin-left: 20px;
    margin-right: 10px;
    &:nth-of-type(1) {
      margin-left: 20px;
    }
  }
}
.table-box {
  height: calc(100% - 220px);
}
</style>
