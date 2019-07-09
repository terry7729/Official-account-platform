<template>
  <div class>
    <el-row>
      <el-col :xs="8" :sm="10" :md="12" :lg="14" :xl="16">
        <el-button type="primary" @click="showSelectTag=true">打标签</el-button>
        <el-button type="primary" @click="addBlackList">加入黑名单</el-button>
      </el-col>

      <el-col :xs="16" :sm="14" :md="12" :lg="10" :xl="8" class="search">
        <el-input placeholder="搜索关键词" v-model="searchVal" class="search-input">
          <el-button slot="suffix" type="primary" icon="el-icon-search" class="search-btn">搜索</el-button>
        </el-input>
      </el-col>

      <el-col
        :xs="16"
        :sm="16"
        :md="16"
        :lg="12"
        :xl="8"
        class="tc selectTag border"
        v-show="showSelectTag"
      >
        <!-- @change="handleChange" -->
        <el-select v-model="lableId" placeholder="请选择" class="mr-30" @change="handleChange">
          <el-option
            v-for="item in fansLabel"
            :key="item.fansLabel.id"
            :label="item.fansLabel.lableName"
            :value="item.fansLabel.id"
          >
            <span style="float: left">{{ item.fansLabel.lableName }}</span>
          </el-option>
        </el-select>
        <el-col class="opreationBtn mt-20">
          <el-button class="sure" type="primary" @click="printTag">确定</el-button>
          <el-button class="cancel" @click="showSelectTag=false">取消</el-button>
        </el-col>
      </el-col>
    </el-row>
    <div class="content">
      <div class="content-l">
        <!-- :data="data.list" -->
        <el-table
          :data="data.list"
          ref="multipleTable"
          tooltip-effect="dark"
          style="width: 100%"
          class="border border-right lefttable"
          :cell-style="{padding: '5px 0'}"
          :header-cell-style="{padding: '8px 0'}"
          :sm="8"
          :md="12"
          :lg="16"
          :xl="20"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="54"></el-table-column>
          <el-table-column label="标签1" width="1030">
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

          <el-table-column prop label width>
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleClick(scope.$index,scope.row)"
                ref="updateRemark"
              >修改备注</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="mt-20 tr"
          background
          layout="prev, pager, next"
          :page-size="5"
          @current-change="handleCurrentChange"
          :total="data.total"
        ></el-pagination>
      </div>

      <el-dialog
        title
        :visible.sync="dialogFormVisible"
        width="381px"
        height="128px"
        :modal="false"
        custom-class="udlabelname"
        :show-close="false"
      >
        <el-form :model="form">
          <el-form-item label="备注名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateLabel(0)">确 定</el-button>
        </div>
      </el-dialog>
      <div class="content-r ml-20 mt-20 border">
        <template>
          <el-table
            :data="fansLabel"
            style="width: 100%"
            class="border-right"
            :cell-style="{padding: '8px 0'}"
            :header-cell-style="{padding: '8px 0'}"
            @row-click="labelRowClick"
            :current-row-key="1"
            @cell-mouse-enter="rowmouseenter"
            @cell-mouse-leave="rowmouseleave"
          >
            <el-table-column prop="date" label="全部标签" width="200px">
              <template slot-scope="scope" prop="id">
                {{scope.row.fansLabel.lableName}}
                <span class="perCount">({{scope.row.count}})</span>
              </template>
            </el-table-column>
            <el-table-column label>
              <template slot-scope="scope">
                <div v-show="scope.row.fansLabel.oprations">
                  <div class="updateLabel" @click="handleClick1(scope.row)"></div>
                  <div class="deleteLabel" @click="handleClick2(scope.row)"></div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-button type="primary" class="el-icon-plus add mt-10" @click="open"></el-button>
        <span class="msg-count">{{fansLabel.length}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // oprations:false,
      centerDialogVisible: false,
      searchVal: "",
      pageNum: 1,
      pageSize: 5,
      data: [], //粉丝数组
      fansLabel: [], //标签数组
      multipleSelection: [],
      lableId: null, //下拉框默认选中
      showSelectTag: false, //显示隐藏打标签
      selectRows: [], //选中行
      selectRowsId: [], //选中行id
      selectLabelRowsId: "",
      dialogFormVisible: false,
      form: {
        name: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleClick1(row, index) {
      this.dialogFormVisible = true;
      this.selectLabelRowsId = row.fansLabel.id;
    },

    handleClick2(row, index) {
      this.selectLabelRowsId = row.fansLabel.id;
      this.$confirm("是否删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateLabel(1)
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    delete() {
      
    },


    //分页查询粉丝和标签 "officiaUserId": this.$store.state.userInfo.id,
    async getFansAndLables() {
      let params = {
        page: this.pageNum,

        pagesize: this.pageSize,
        officiaUserId: 1
      };

      let res = await this.$axios.getFansAndLables(params);

      if (res.code === 0) {
        this.data = res.dataFans;
        this.fansLabel = res.dataFansLabel;
        this.fansLabel.forEach(v => {
          v.fansLabel.oprations = true;
        });

        this.data.list.forEach(v => {
          v.createTime = this.getTime(v.createTime).split(" ")[0];
        });
      }
    },
    //分页点击事件
    handleCurrentChange(num) {
      this.pageNum = num;
      this.getFansAndLables();
    },
    rowClick() {},
    //点击标签查询粉丝
    labelRowClick(row, column, event) {
      this.getFansByLables(row.fansLabel.id);
    },
    //点击标签查找粉丝
    async getFansByLables(id) {
      let params = {
        page: this.pageNum,
        pagesize: this.pageSize,
        id: id //标签id
      };
      let res = await this.$axios.getFansByLable(params);

      if (res.code === 0) {
        this.data = res.data;
      }
    },
    //粉丝列表修改备注按钮点击

    //修改粉丝备注
    async updateFansRemark(row, remake) {
      let params = {
        id: row.id,
        remark: remake
      };
      let res = await this.$axios.updateFansRemark(params);

      if (res.code === 0) {
        this.getFansAndLables();
      }
    },

    //添加粉丝标签
    async addFansLabel(lableName) {
      let params = {
        lableName: lableName,
        officiaUserId: 1
      };

      let res = await this.$axios.addFansLable(params);
      if (res.code === 0) {
        this.getFansAndLables();
      }
    },
    rowmouseenter(row, a, b, c) {
      row.fansLabel.oprations = true;
      console.log(row);
    },
    rowmouseleave(row) {
      // row.fansLabel.oprations=false
    },

    //添加或取消黑名单
    async addBlackList() {
      let params = {
        type: "1",
        fansId: this.selectRowsId
      };
      let res = await this.$axios.addOrRemoveBlaklist(params);

      if (res.code === 0) {
        this.getFansAndLables();
      }
    },
    //打标签
    async labelOperation(fansLabelId, fansId) {
      let params = {
        fansLabelId: JSON.stringify(fansLabelId),
        fansId: fansId
      };
      let res = await this.$axios.labelOperation(params);
      if (res.code === 0) {
        this.getFansAndLables();
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
    //下拉框改变事件
    handleChange(val) {
      this.lableId = val;
    },
    //打开添加标签对话框
    open() {
      this.$prompt("标签名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.addFansLabel(value);
          this.$message({
            type: "success",
            message: "添加成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    //修改备注
    handleClick(index, row) {
      this.$prompt("修改备注", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.updateFansRemark(row, value);
          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //转换时间格式
    getTime(time) {
      return this.$funs.getTime(time);
    },
    //修改标签名称type 0修改 1删除
    async updateLabel(type,id) {
       this.dialogFormVisible = false;
      let params = {
        'id': JSON.stringify(this.selectLabelRowsId) ,
        'lableName':JSON.stringify(this.form.name) ,
        'type': JSON.stringify(type) 
      };
      let res = await this.$axios.updateLabel(params);
      if (res.code === 0) {
        console.log(res);
        this.getFansAndLables();
      }else{
         return
      }
     
    },
    //点击打标签确定
    printTag() {
      this.labelOperation(this.lableId, this.selectRowsId);
      this.showSelectTag = false;
    }
  },
  created() {
    this.getFansAndLables();
  }
};
</script>

<style  scoped lang="scss">
.search {
  text-align: right;
}
.search-input {
  width: 300px;
}
.el-tab-pane {
  .lefttable {
    border-right: 1px solid $border-color;
    // border-bottom: 1px solid $border-color;
    height: 651px;
    margin-top: 22px;
    border-bottom: none;
  }
}

.el-message-box {
  width: 381px !important;
  height: 128px !important;
}

.content-r {
  position: relative;
  height: 697px;
  .add {
    height: 24px;
    min-width: 10px;
    padding: 0;
    width: 24px;
    top: 10px;
    right: 10px;
    position: absolute;
    // background-color: #438cfa;

    background-size: 24px;
  }
}
.content {
  display: flex;
  .content-l {
    width: 1200px;
  }
  .content-r {
    width: 280px;
  }
}
.msg-count {
  padding: 0 6px;
  background: #ff8c5b;
  border-radius: 5px;
  font-size: 12px;
  color: #fff;
  position: absolute;
  top: 13px;
  left: 75px;
}

// thead {
//   height: 40px;
//   th {
//     height: 40px;
//     padding: 0;
//     display: flex;
//     > span {
//       width: 90%;
//       text-align: left;
//       margin-left: 20px;
//       span {
//         margin-left: 6px;
//         line-height: 40px;
//       }
//     }
//   }
// }

.perCount {
  color: $sub-text-color;
  display: inline-block;
  margin-left: 15px;
}
.dialogs {
  height: 300px;
  > div {
    height: 128px !important;
    right: 0;
    position: absolute;
  }
}
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
    padding: 0 10px;
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

.udlabelname {
  height: 128px;
}
.selectTag {
  position: absolute;
  width: 310px;
  height: 121px;
  padding-top: 10px;
  z-index: 999;
  background-color: #ffffff;
  top: 50px;

  .sure {
    margin-left: 20px;
  }
  .cancel {
    margin-left: 10px;
  }
}
.opreationBtn {
}
.updateLabel {
  background: url("../../../assets/images/edit@2x.png") no-repeat center;
  background-size: 14px;
  width: 14px;
  height: 14px;
  display: inline-block;
  margin-left: 10px;
  cursor: pointer;
}
.deleteLabel {
  background: url("../../../assets/images/delete@2x.png") no-repeat center;
  background-size: 14px;
  width: 14px;
  height: 14px;
  display: inline-block;
  margin-left: 14px;
  cursor: pointer;
}
</style>
