<template>
  <div>
    <el-card shadow="never">
      <div class="el-card-body-title">
        <span class="primary-text">自定义菜单</span>
      </div>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="7">
          <div class="phone-content border mt-20 pos-r">
            <div class="menu-content border-top tc">
              <div class="placeholder-icon">
                <i class="el-icon-question"></i>
              </div>

              <div class="btns-content pos-r" v-for="(fartherItem, i) in menuList" :key="i" v-show="menuList.length">
                <div class="child-btns border-left border-right">
                  <div 
                    class="btns" 
                    :class="{active: fartherItem.id === currentMenu.id}" 
                    @click="selectMenu(fartherItem)">
                    {{ fartherItem.menuName }}
                  </div>

                  <div 
                    class="btns child-btn border-top" 
                    :class="{active: childMenu.id === currentMenu.id}" 
                    v-for="(childMenu, b) in fartherItem.sonCustomMenus" 
                    :key="b" 
                    v-show="!isNaN(b)" 
                    @click="selectMenu(childMenu)">
                    {{ childMenu.menuName }}
                  </div>

                  <div class="btns border-top" v-if="fartherItem.sonCustomMenus.length < 3" @click="addNewMenu(0, fartherItem.id)">
                    <i class="el-icon-plus add-menu-btn"></i>
                  </div>
                </div>
              </div>

              <div class="btns" v-if="menuList.length < 3" @click="addNewMenu(1, null)">
                <i class="el-icon-plus add-menu-btn" v-if="menuList.length"></i>
                <i class="el-icon-plus" v-if="!menuList.length">添加菜单</i>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs='0' :sm="1" :md="2" :lg="0" :xl="0" style="height: 100px;"></el-col>

        <el-col :xs="24" :sm="22" :md="20" :lg="14" :xl="12" v-if="currentMenu.menuName !== undefined">
          <div class="mt-20 el-card-body-title">
            <span>编辑菜单</span>
            <el-button type="danger" size="mini" class="fr" @click="deleteMenu">删除菜单</el-button>
          </div>

          <el-form class="mt-20" label-width="80px" label-position="left" hide-required-asterisk>
            <el-form-item label="菜单名称">
              <el-input
                v-model="currentMenu.menuName"
                :maxlength="4"
                show-word-limit>
              </el-input>
            </el-form-item>
            
            <el-form-item label="菜单内容">
              <el-radio-group v-model="currentMenu.menuType">
                <el-radio label="1" border>发送消息</el-radio>
                <el-radio label="2" border>跳转网页</el-radio>
                <el-radio label="3" border>轻应用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          
          <!-- 发送消息 -->
          <resources 
            :tabType.sync="tabType"
            :imgTextData.sync="imgTextData"
            :imgData.sync="imgData"
            :videoData.sync="videoData"
            v-show="currentMenu.menuType === '1'"
            @submit="handleResSubmit"
            @delete="handleResDelete"
            :types="['imgText', 'img', 'video']">
          </resources>

          <!-- 跳转网页 -->
          <div class="border radius" v-show="currentMenu.menuType === '2'">
            <div class="border-bottom pt-10 pb-10 pl-20">
              订阅者点击该子菜单会跳转到以下链接
            </div>
            <el-form class="pd-20" label-width="80px" label-position="left" hide-required-asterisk>
              <el-form-item label="页面地址">
                <el-input
                  v-model="url"
                  placeholder="认证后可手动输入地址">
                </el-input>
              </el-form-item>
            </el-form>
          </div>

          <!-- 跳转网页 -->
          <div class="border radius" v-show="currentMenu.menuType === '3'">
            <div class="border-bottom pt-10 pb-10 pl-20">
              订阅者点击该子菜单会跳转到以下轻应用
            </div>
            <el-form class="pd-20" label-width="80px" label-position="left" hide-required-asterisk>
              <el-form-item label="轻应用">
                <el-select v-model="lightApp" placeholder="请选择轻应用">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>

          <div class="mt-40 tc">
            <el-button type="primary" @click="submit">保 存</el-button>
          </div>
          
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
  import resources from '@/components/Resources'
  export default {
    components: {
      resources,
    },

    data() {
      return {
        // menuName: '',           // 菜单名
        // menuType: '1',          // 类型：1-发送消息， 2-跳转网页， 3-轻应用
        tabType: 'imgText',     // menuType 为1时三个tab的类型，默认图文类型
        imgTextData: {},        // menuType 为1，tabType为imgText时选中的数据
        imgData: {},            // menuType 为1，tabType为img时选中的数据
        videoData: {},          // menuType 为1，tabType为video时选中的数据

        url: '',                // menuType 为2时的链接地址
        lightApp: '',           // menuType 为3时的轻应用

        menuList: [],

        currentMenu: {},        //当前编辑的菜单
                                //currentMenu.id === undefined为未获取到菜单数据，禁止一切操作
                                //currentMenu.id !== undefined && isNaN(currentMenu.id)为添加菜单，执行添加操作
                                //currentMenu.id值为数字时是修改菜单，执行修改操作

        options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭北京烤鸭北京烤鸭北京烤鸭'
          }
        ],
      }
    },
    methods: {
      //增加菜单，id-需要增加的菜单的父菜单，level-菜单等级
      //isParent: 1-是，0-否
      //parentId当前菜单为子菜单时必传
      addNewMenu(isParent, parentId) {
        if(this.currentMenu.id === undefined) {
          this.$message.warning('菜单数据未正常获取，请刷新后重试')
          return
        }

        if(this.currentMenu.id === 'new') {
          this.$message.warning('新建菜单未保存，请保存或删除后添加')
          return
        }

        let newMenu = {
          id: 'new',
          menuName: "菜单名称",
          menuType: "1",
          isParent,
          parentId,
          // sourceMaterialId: 5,
          officiaUserId: this.$store.state.userInfo.id,
          // lightApplicationId: null,
          // isCustomUrl: "0",
          // customUrl: null,
          // isPageTemple: "0",
          // pageTempleId: null
        }

        if(isParent === 1) {   //增加父级菜单
          newMenu.sonCustomMenus = []
          this.menuList.push(newMenu)
        } else {   //增加子级菜单
          for( let i=0; i<this.menuList.length; i++) {
            if(this.menuList[i].id === parentId) {
              this.menuList[i].sonCustomMenus.push(newMenu)
            }
          }
        }

        this.tabType = 'imgText'
        this.imgTextData = {}
        this.imgData = {}
        this.videoData = {}

        this.currentMenu = newMenu
      },

      //删除菜单
      deleteMenu() {
        let title = '提示', msg = '是否删除此菜单?'
        if(this.currentMenu.isParent) {
          title = '警告'
          msg = '删除此菜单将同时删除子菜单，是否确认删除？'
        }

        this.$confirm(msg, title, {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
        }).then( async () => {
          let flag = true

          if(this.currentMenu.id !== undefined && !isNaN(this.currentMenu.id)) {  // 当前菜单已保存到数据库
            let res = await this.$axios.deleteCustomMenu({custommenuId: this.currentMenu.id})
            if(res.code !== 0) flag = false
          }
          
          if(flag) {
            for( let i=0; i<this.menuList.length; i++) {
              if(this.menuList[i].id === this.currentMenu.id) {
                this.menuList.splice(i, 1)
                break
              }
              if(this.menuList[i].sonCustomMenus.length) {
                for( let b=0; b<this.menuList[i].sonCustomMenus.length; b++) {
                  if(this.menuList[i].sonCustomMenus[b].id === this.currentMenu.id) {
                    this.menuList[i].sonCustomMenus.splice(b, 1)
                    break
                  }
                }
              }
            }

            this.currentMenu = {id: 'ok'}
          }
          
        }).catch( () => {
          //do nothing
        })
      },

      //点击选中菜单
      async selectMenu(menu) {
        if(this.currentMenu.id === menu.id) return

        if(this.currentMenu.id === 'new') {
          this.$message.warning('新建菜单未保存，请保存或删除后修改')
          return
        }

        this.currentMenu = {...menu}
        if(menu.menuType === '1') await this.getMetarialDetail(menu.sourceMaterialId)
      },

      //选择素材
      handleResSubmit(data) {
        switch(this.tabType) {
          case 'imgText':
            this.imgTextData = data
            break
          case 'img':
            this.imgData = data
            break
          case 'video':
            this.videoData = data
            break
        }
      },

      //删除素材
      handleResDelete() {
        switch(this.tabType) {
          case 'imgText':
            this.imgTextData = {}
            break
          case 'img':
            this.imgData = {}
            break
          case 'video':
            this.videoData = {}
            break
        }
      },

      //提交前验证
      validateData() {
        if(!this.currentMenu.menuName.trim()) {
          return '请输入菜单名称'
        }

        if(this.currentMenu.menuType === '1') {
          switch(this.tabType) {
            case 'imgText':
              if(!this.imgTextData.id) {
                return '请选择素材'
              }
              this.currentMenu.sourceMaterialId = this.imgTextData.id
              break
            case 'img':
              if(!this.imgData.id) {
                return '请选择素材'
              }
              this.currentMenu.sourceMaterialId = this.imgData.id
              break
            case 'video':
              if(!this.videoData.id) {
                return '请选择素材'
              }
              this.currentMenu.sourceMaterialId = this.videoData.id
              break
          }
        }

        if(this.currentMenu.menuType === '2') {
          return '未开放'
        }

        if(this.currentMenu.menuType === '3') {
          return '未开放'
        }
      },

      //保存提交
      submit() {
        let validMsg = this.validateData()
        if(validMsg) {
          this.$message.warning(validMsg)
          return
        }

        console.log(this.currentMenu)

        if(this.currentMenu.id !== undefined && isNaN(this.currentMenu.id)) {
          let params = {...this.currentMenu}  //去掉冗余参数
          delete params.id
          delete params.sonCustomMenus
          this.addMenu(params)
        }
        if(this.currentMenu.id !== undefined && !isNaN(this.currentMenu.id)) {
          this.updateMenu()
        }
      },

      //添加菜单
      async addMenu(params) {
        let res = await this.$axios.addCustomMenu(params)
        if(res.code === 0) {
          this.$message.success(res.msg)
          this.getMenuList()
        }
      },
      
      //更新菜单
      async updateMenu() {
        let res = await this.$axios.updateCustomMenu(this.currentMenu)
        if(res.code === 0) {
          this.$message.success(res.msg)
          this.getMenuList()
        }
      },
      
      // 获取菜单列表
      async getMenuList() {
        let res = await this.$axios.getMenuList({officiaUserId: this.$store.state.userInfo.id})
        // console.log(res)
        if(res.code === 0) {
          this.menuList = res.data
          this.currentMenu = {id: 'ok'}
        }
      },

      // menuType=1时获取素材详情
      async getMetarialDetail(id) {
        let res = await this.$axios.getMaterialById({sourceMaterialId: id})
        if(res.code === 0) {
          switch(res.data.sourceMaterialType) {
            case '1':   //图文
              this.tabType = 'imgText'
              this.imgTextData = res.data
              break

            case '2':   //图片
              this.tabType = 'img'
              this.imgData = res.data
              break

            case '3':   //视频
              this.tabType = 'video'
              this.videoData = res.data
              break
          }
        }
      },
    },
    created() {
      this.getMenuList()
    }
  }
</script>

<style scoped lang="scss">
  .phone-content {
    max-width: 375px;
    height: 600px;
    margin: 20px auto;
  }

  .menu-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
    >div{
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      &:not(:last-child) {
        border-right: 1px solid $border-color;
      }
      .add-menu-btn {
        font-size: 25px;
        transform: translateY(5px);
      }
    }
  }

  .placeholder-icon {
    width: 60px;
    background:rgba(248,248,248,1);
  }

  .btns-content {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
  }

  .btns {
    flex: 1;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
      color: $primary-color;
    }
  }

  .active {
    color: $primary-color;
  }

  .child-btns {
    position: absolute;
    bottom: 0;
    left: -1px;
    min-width: 100%;
    display: flex;
    flex-direction: column-reverse;
  }

  .el-radio {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }

</style>