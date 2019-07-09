<template>
  <div>
    <div style="overflow: hidden;">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="pos-r" :body-style="{ padding: '0', height: '150px', background: 'linear-gradient(to right, #9174FF, #5C43FE)' }">
            <div class="data-num white-text pt-30 pr-20 tr">1399</div>
            <div class="mt-10 pr-20 white-text tr">新消息</div>
            <div class="show-more">
              查看更多
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="pos-r" :body-style="{ padding: '0', height: '150px', background: 'linear-gradient(to right, #FF9F9D, #FF5760)' }">
            <div class="data-num white-text pt-30 pr-20 tr">1328</div>
            <div class="mt-10 pr-20 white-text tr">新增人数</div>
            <div class="show-more">
              查看更多
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="pos-r" :body-style="{ padding: '0', height: '150px', background: 'linear-gradient(to right, #FF7C9D, #FF4966)' }">
            <div class="data-num white-text pt-30 pr-20 tr">9999999999</div>
            <div class="mt-10 pr-20 white-text tr">用户总数</div>
            <div class="show-more">
              查看更多
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-card class="mt-20" shadow="never">
      <div class="el-card-body-title">
        <span class="primary-text">最近编辑</span>
        <el-button class="fr" type="primary" size="mini">
          <span class="el-icon-plus"></span>
          新建群发
        </el-button>
      </div>

      <message-panel
        class="mt-20"
        url="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        title="文章标题最多可设置十六个文字文章">
        <el-button size="small">编辑</el-button>
        <el-button size="small">群发</el-button>
      </message-panel>
    </el-card>

    <el-card class="mt-20" shadow="never">
      <div class="el-card-body-title">
        <span class="primary-text">已群发消息</span>
      </div>

      <message-panel 
        class="mt-20"
        border
        url="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" 
        title="文章标题最多可设置十六个文字文章">
        <div slot='head' class="pr-30 tc">
          <div class="msg-panel-time"><i class="el-icon-time"></i> 昨天  12:41</div>
          <div class="msg-panel-status msg-panel-status-success white-text radius">发送成功</div>
        </div>
        <i class="el-icon-delete delete-btn"></i>
      </message-panel>

      <message-panel 
        class="mt-20"
        border
        url="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" 
        title="文章标题最多可设置十六个文字文章">
        <div slot='head' class="pr-30 tc">
          <div class="msg-panel-time"><i class="el-icon-time"></i> 昨天  12:41</div>
          <div class="msg-panel-status msg-panel-status-delete white-text radius">已删除</div>
        </div>
        <i class="el-icon-delete delete-btn"></i>
      </message-panel>

      <message-panel 
        class="mt-20"
        border
        url="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" 
        title="文章标题最多可设置十六个文字文章">
        <div slot='head' class="pr-30 tc">
          <div class="msg-panel-time"><i class="el-icon-time"></i> 昨天  12:41</div>
          <div class="msg-panel-status msg-panel-status-delete white-text radius">已删除</div>
        </div>
        <i class="el-icon-delete delete-btn"></i>
      </message-panel>

      <message-panel 
        class="mt-20"
        border
        url="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" 
        title="文章标题最多可设置十六个文字文章">
        <div slot='head' class="pr-30 tc">
          <div class="msg-panel-time"><i class="el-icon-time"></i> 昨天  12:41</div>
          <div class="msg-panel-status msg-panel-status-delete white-text radius">已删除</div>
        </div>
        <i class="el-icon-delete delete-btn"></i>
      </message-panel>

      <message-panel 
        class="mt-20"
        border
        url="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" 
        title="文章标题最多可设置十六个文字文章">
        <div slot='head' class="pr-30 tc">
          <div class="msg-panel-time"><i class="el-icon-time"></i> 昨天  12:41</div>
          <div class="msg-panel-status msg-panel-status-delete white-text radius">已删除</div>
        </div>
        <i class="el-icon-delete delete-btn"></i>
      </message-panel>

    </el-card>

  </div>
</template>

<script>
  import messagePanel from '../../components/MessagePanel'

  export default {
    components: {
      messagePanel,
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .data-num {
    font-size: 36px;
  }

  .show-more {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    line-height: 30px;
    padding: 0 20px;
    background: #000;
    opacity: 0.1;
    font-size: 14px;
    color: #FFFFFF;

    i {
      position: absolute;
      top: 5px;
      right: 20px;
      font-size: 20px;
    }
  }

  .msg-panel-time {
    font-size: 14px;
    color: $sub-text-color;
  }

  .msg-panel-status {
    display: inline-block;
    margin: 0 auto;
    margin-top: 10px;
    padding: 5px 10px;
    font-size: 12px;
  }
  .msg-panel-status-success {
    background: $success-color; 
  }
  .msg-panel-status-delete {
    background: $danger-color; 
  }

  .delete-btn {
    &:hover {
      cursor: pointer;
      color: $primary-color;
    }
  }
</style>