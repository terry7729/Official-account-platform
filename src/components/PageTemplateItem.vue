<template>
  <div class="template-item border pd-10">
    <phone-window class="border">
      <div class="phone-box">
        
        <p class="template-title pl-10 pr-10 no-wrap">{{ templateList.templateName }}</p>
        <div class="author pt-10 pl-10 pr-10">
          <span class="author-head" :class="{'default-bg': !authorHead}">
            <el-image
              style="width: 100%; height: 100%;"
              v-if="authorHead"
              :src="authorHead"
              :fit="fit">
            </el-image>
          </span>
          <span class="fz-12">
            {{ author }}
          </span>
        </div>

        <!-- 图文模板 -->
        <div class="template-content pt-10 pl-10 pr-10" v-if="type === '1'">
          <div class="list-item border-top cf" v-for="(item, index) in templateList.sourceMaterials" :key="index">
            <span class="title">{{ item.sourceMaterialTitle }}</span>
            <span class="list-img fr" :class="{'default-bg': item && !item.sourceMaterialIcon}">
              <el-image
                style="width: 100%; height: 100%;"
                v-if="item && item.sourceMaterialIcon"
                :src="item.sourceMaterialIcon"
                :fit="fit">
              </el-image>
            </span>
          </div>
        </div>

        <!-- 自定义模板 -->
        <div class="template-content mt-10" v-if="type === '2'">
          <div class="carousel-box">
            <el-carousel
              height="110px"
              arrow="never"
              :autoplay="false"
              :loop="false"
              indicator-position="none">
              <el-carousel-item v-for="(item, index) in templateList.sourceMaterials" :key="index">
                <div class="h-100 pos-r" :class="{'default-bg': item && !item.sourceMaterialIcon}">
                  <el-image
                    style="width: 100%; height: 100%;"
                    v-if="item && item.sourceMaterialIcon"
                    :src="item.sourceMaterialIcon"
                    :fit="fit">
                  </el-image>
                  <p class="title-2 no-wrap">{{ item.sourceMaterialTitle }}</p>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="pl-10 pr-10 page-template-tabs">
            <el-tabs v-model="activeName">
              <el-tab-pane 
              :label="item.templateClassificationName" 
              :name="item.templateClassificationName" 
              v-for="(item, index) in templateList.classifications" :key="index">

                <div class="list-item border-top cf" v-for="(child, b) in item.sourceMaterials" :key="b">
                  <span class="title">{{ child.sourceMaterialTitle }}</span>
                  <span class="list-img fr" :class="{'default-bg': child && !child.sourceMaterialIcon}">
                    <el-image
                      style="width: 100%; height: 100%;"
                      v-if="child && child.sourceMaterialIcon"
                      :src="child.sourceMaterialIcon"
                      :fit="fit">
                    </el-image>
                  </span>
                </div>

              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <!-- 视频模板 -->
        <div class="template-content pt-10 pl-10 pr-10" v-if="type === '3'">
          <div class="pos-r mb-10" 
            style="height: 110px;"
            :class="{'default-bg': item && !item.sourceMaterialIcon}" 
            v-for="(item, index) in templateList.sourceMaterials" :key="index">
            <el-image
              style="width: 100%; height: 100%;"
              v-if="item && item.sourceMaterialIcon"
              :src="item.sourceMaterialIcon"
              :fit="fit">
            </el-image>
            <p class="title-2 no-wrap">{{ item.sourceMaterialTitle }}</p>
          </div>
        </div>
          
      </div>

    </phone-window>

    <slot></slot>
  </div>
</template>

<script>
  import phoneWindow from '@/components/PhoneWindow'
  export default {
    components: {
      phoneWindow,
    },
    props: {
      type: {
        type: String,
        default: '1',       //模板类型： 1-图文，2-自定义分类 , 3-视频(必传)
      },
      templateTitle: {
        type: String,
        default: '面板名称',
      },
      authorHead: {
        type: String,
        default: '',
      },
      author: {
        type: String,
        default: 'Bochat2019',
      },
      templateList: {
        type: Object,
        default: {
          templateName: "面板名称",
          // sourceMaterialIds: [ 5, 12 ],
          sourceMaterials: [
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            }
          ],
          classifications: []
        }
      },
    },
    data() {
      return {
        activeName: '',
      }
    },
    methods: {

    },
    created() {
      if(this.type === '2') {
        this.activeName = this.templateList.classifications[0].templateClassificationName
      }
    }
  }
</script>

<style scoped lang="scss">
  .template-item {
    width: 262px;
    box-sizing: border-box;
  }

  .phone-box {
    height: 388px;
    padding-top: 12px;
    box-sizing: border-box;
  }

  .template-title {
    font-size: 13px;
    color: #333333;
    font-weight:bold;
  }

  .author-head {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    vertical-align: middle;
    border-radius:50%;
  }

  .template-content {
    overflow: hidden;
  }

  .list-item {
    padding: 7px 0;
  }
  .title {
    font-size: 12px;
    color: #333333;
    font-weight:bold;
  }
  .list-img {
    display: inline-block;
    width: 50px;
    height: 45px;
    vertical-align: top;
    border-radius: 2px;
  }

  .default-bg {
    background:rgba(210,210,210,1);
  }

  .carousel-box {
    width: 208px;
    margin: 0 auto;
  }
  .el-carousel--horizontal {
    overflow-x: visible;
  }
  .el-carousel__item {
    width: 200px;
    padding: 0 4px;
    border-radius: 4px;
  }

  .title-2 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    background:rgba(238,238,238,1);
    font-size: 12px;
    padding: 0 10px;
  }
</style>