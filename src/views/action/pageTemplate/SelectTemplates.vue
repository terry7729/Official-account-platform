<template>
  <card title="选择模板">
    <div class="template-list">

      <page-template-item
        class="mt-20 mr-40"
        type="1"
        :templateList="templateList_1"
      >
        <p class="tc mt-20 bold">列表模板</p>
        <p class="tc mt-10 info-text fz-12">图文视频组成的列表页面</p>
        <div class="tc mt-20 mb-20">
          <el-button type="primary" class="mt-20">选择</el-button>
        </div>
      </page-template-item>

      <page-template-item
        class="mt-20 mr-40"
        type="2"
        :templateList="templateList_2"
      >
        <p class="tc mt-20 bold">综合模板</p>
        <p class="tc mt-10 info-text fz-12">封面与多内容组成的页面</p>
        <div class="tc mt-20 mb-20">
          <el-button type="primary" class="mt-20">选择</el-button>
        </div>
      </page-template-item>

      <page-template-item
        class="mt-20 mr-40"
        type="3"
        :templateList="templateList_3"
      >
        <p class="tc mt-20 bold">视频模板</p>
        <p class="tc mt-10 info-text fz-12">图文视频组成的列表页面</p>
        <div class="tc mt-20 mb-20">
          <el-button type="primary" class="mt-20">选择</el-button>
        </div>
      </page-template-item>

    </div>
  </card>
</template>

<script>
  import pageTemplateItem from '@/components/PageTemplateItem'
  export default {
    components: {
      pageTemplateItem,
    },
    data() {
      return {
        templateList_1: {
          templateName: "面板名称",
          sourceMaterials: [
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
          ]
        },
        
        templateList_2: {
          templateName: "面板名称",
          sourceMaterials: [
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
          ],
          classifications: [
            {
              templateClassificationName: "分类1",
              sourceMaterials: [
                {
                  sourceMaterialTitle: '内容标题',
                  sourceMaterialIcon: '',
                },
                {
                  sourceMaterialTitle: '内容标题',
                  sourceMaterialIcon: '',
                },
              ]
            },
            {
              templateClassificationName: "分类2",
              sourceMaterials: [
                {
                  sourceMaterialTitle: '内容标题',
                  sourceMaterialIcon: '',
                },
                // {
              ]
            }
          ]
        },
        
        templateList_3: {
          templateName: "面板名称",
          sourceMaterials: [
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
            {
              sourceMaterialTitle: '内容标题',
              sourceMaterialIcon: '',
            },
          ]
        },
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .template-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
</style>