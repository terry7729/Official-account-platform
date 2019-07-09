<template>
  <div class="resources border radius">
    <el-radio-group v-model="tabType">
      <el-radio-button v-for="item in types" :key="item" :label="item" @click.native="handleChange(item)">
        <span v-if="item === 'text'">
          <i class="el-icon-edit-outline"></i> 文字
        </span>
        <span v-if="item === 'img'">
          <i class="el-icon-picture-outline"></i> 图片
        </span>
        <span v-if="item === 'imgText'">
          <i class="el-icon-tickets"></i> 图文
        </span>
        <span v-if="item === 'video'">
          <i class="el-icon-film"></i> 视频
        </span>
      </el-radio-button>
    </el-radio-group>
    <div class="border-bottom"></div>

    <!-- 文字输入 -->
    <el-input 
      ref="input"
      v-show="tabType === 'text'"
      type="textarea"
      placeholder="请输入内容"
      :value="currentValue"
      maxlength="600"
      @input="handleInput"
      :autosize="{ minRows: 6, maxRows: 60 }"
      resize="none"
      show-word-limit>
    </el-input>

    <!-- 图文 -->
    <img-text-resource 
      v-if="tabType === 'imgText'"
      :imgTextData.sync="imgTextData"
      @submit="handleSubmit" 
      @delete="handleDelete">
    </img-text-resource>

    <!-- 图片 -->
    <img-resource 
      v-if="tabType === 'img'"
      :imgData.sync="imgData" 
      @submit="handleSubmit" 
      @delete="handleDelete">
    </img-resource>

    <!-- 视频 -->
    <video-resource 
      v-if="tabType === 'video'"
      :videoData.sync="videoData" 
      @submit="handleSubmit" 
      @delete="handleDelete">
    </video-resource>
  </div>
</template>

<script>

  import imgTextResource from '@/components/ImgTextResource'
  import imgResource from '@/components/ImgResource'
  import videoResource from '@/components/VideoResource'

  export default {
    components: {
      imgTextResource,
      imgResource,
      videoResource,
    },
    props: {
      tabType: {
        type: String,
        default: 'text'
      },
      types: {      //类型数组，可选有：'text', 'img', 'textImg', video
        type: Array,
        default: ['text']
      },
      imgData: {},
      imgTextData: {},
      videoData: {},
      value: {},
    },
    data() {
      return {
        currentValue: '',
      }
    },
    watch: {
      value: {
        immediate: true,
        handler(value) {
          this.currentValue = value
        }
      }
    },
    methods: {
      handleChange(tabType){
        this.$emit('update:tabType', tabType)
      },

      handleSubmit(data) {
        this.$emit('submit', data)
      },
      
      handleDelete(data) {
        this.$emit('delete')
      },

      handleInput(value) {
        this.$emit('input', value)
      },
    },
  }
</script>

<style lang="scss">
  .resources {
    .el-radio-button:first-child .el-radio-button__inner {
      border: none;
      border-bottom-left-radius: 0;
      border-right: 1px solid $border-color;
    }
    .el-radio-button:not(:first-child) .el-radio-button__inner {
      border: none;
      border-radius: 0;
      border-right: 1px solid $border-color;
    }

    .el-textarea .el-textarea__inner {
      padding-top: 10px;
      padding-bottom: 10px;
      border: none;
    }
  }
</style>