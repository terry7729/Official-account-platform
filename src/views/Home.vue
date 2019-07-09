<template>
  <el-container class="h-100">
    <!-- 顶部内容 -->
    <el-header class="border-bottom">
      <span class="logo-title">博信公众号平台</span>
      <div class="user-info h-100 cf">
        <i class="el-icon-bell"></i>
        <span class="ml-5">消息</span>
        <span class="msg-count ml-5">0</span>
        <img :src="$store.state.userInfo.icon" alt="" class="head-icon ml-40">
        <div class="ml-10 tc">
          <el-dropdown placement="bottom" trigger="click">
            <span class="el-dropdown-link">
              {{ $store.state.userInfo.officialName }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:40px;">
              <el-dropdown-item icon="el-icon-user">账号详情</el-dropdown-item>
              <el-dropdown-item icon="el-icon-coordinate">认证详情</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <p class="default-color mt-5">
            订阅号 | 未认证
          </p>
        </div>
      </div>
    </el-header>

    <el-main style="padding: 20px 0; padding-left: 40px; background: #F3F3F3;">
      <el-container class="h-100">

        <!-- 左侧菜单栏 -->
        <el-aside width="260px">
          <el-menu
            :default-active="index"
            class="pb-20 radius"
            text-color="#70707C"
            active-text-color="#438CFA"
            style="border: none;"
            @select="handleSelect"
          >

            <el-menu-item index="1" class="mt-20">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-takeaway-box"></i>
                <span>功能</span>
              </template>
              <el-menu-item index="2-1">自动回复</el-menu-item>
              <el-menu-item index="2-2">自定义菜单</el-menu-item>
              <el-menu-item index="2-3">页面模板</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-set-up"></i>
                <span>管理</span>
              </template>
              <el-menu-item index="3-1">粉丝管理</el-menu-item>
              <el-menu-item index="3-2">消息管理</el-menu-item>
              <el-menu-item index="3-3">素材管理</el-menu-item>
              <el-menu-item index="3-4">轻应用管理</el-menu-item>
            </el-submenu>            

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-coin"></i>
                <span>统计</span>
              </template>
              <el-menu-item index="4-1">粉丝数据</el-menu-item>
            </el-submenu>            

            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-wallet"></i>
                <span>财务</span>
              </template>
              <el-menu-item index="5-1">收益广场</el-menu-item>
              <el-menu-item index="5-2">收益提现</el-menu-item>
            </el-submenu>            

            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>设置</span>
              </template>
              <el-menu-item index="6-1">公众号设置</el-menu-item>
              <el-menu-item index="6-2">人员设置</el-menu-item>
              <el-menu-item index="6-3">财务设置</el-menu-item>
              <el-menu-item index="6-4">公众号认证</el-menu-item>
              <el-menu-item index="6-5">安全中心</el-menu-item>
            </el-submenu>            
            
          </el-menu>
        </el-aside>

        <!-- 主体内容 -->
        <el-main style="padding: 0; padding-left: 20px; padding-right: 40px;">
          <router-view/>
        </el-main>

      </el-container>
    </el-main>
  </el-container>
</template>

<script>
  //路由以及对应菜单index对照表，各页面的子路由添加到当前页面所在数组里
  import views from './views'

  export default {
    data() {
      return {
        index: '1',   //默认显示首页
        indexArr: [], //所有index的数组
      }
    },
    computed: {
      routeName() {
        return this.$route.name
      }
    },
    watch: {
      routeName() {
        this.routeToList()
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        if(key !== this.index) {
          this.index = key
          this.$router.push({name: views[key][0]})
        }
      },

      //设置路由对应列表标识
      routeToList() {
        let name = this.$route.name
        this.indexArr.map( val => {
          if(views[val].indexOf(name) !== -1) {
            this.index = val
          }
        })
      },

      // 退出登录
      async logout() {
        let res = await this.$axios.logout()
        if(res.code === 0) {
          sessionStorage.removeItem('Authorization')
          sessionStorage.removeItem('userInfo')
          this.$store.commit('setUserInfo', {})
          this.$router.replace({name: 'SignIn'})
        }
      }
    },
    created() {
      this.indexArr = Object.keys(views)
      this.routeToList()

      let userInfo = sessionStorage.getItem('userInfo')
      if(userInfo) this.$store.commit('setUserInfo', JSON.parse(userInfo))

      this.$funs.getImgTypes()
    },
  }
</script>

<style scoped lang="scss">
  .el-header {
    display: flex;
    align-items: center;
    justify-content: space-between
  }
  .logo-title {
    font-size: 20px;
    color: #666;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .ml-5 {
    margin-left: 5px;
  }
  .mt-5 {
    margin-top: 5px;
  }
  .default-color {
    color: $default-color;
  }

  .msg-count {
    padding: 0 6px;
    background:#FF8C5B;
    border-radius:5px;
    font-size: 12px;
    color: #fff;
  }

  .head-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: $primary-color;
    font-size: 14px;
  }

</style>