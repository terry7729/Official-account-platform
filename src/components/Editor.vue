<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick">
    </editor>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver/theme'

  import 'tinymce/plugins/image'
  import 'tinymce/plugins/media'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/lists'
  // import 'tinymce/plugins/code'
  
  export default {
    components: {
      Editor
    },
    props: {
      //传入一个value，使组件支持v-model绑定
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'lists image media link'
      },
      toolbar: {
        type: [String, Array],
        default: 'undo redo |  formatselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | image media link unlink code | outdent indent | removeformat'
      },
      height: {
        type: [Number],
        default: 500
      }
    },
    data() {
      return {
        //初始化配置
        init: {
          language_url: '/static/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/ui/oxide',
          height: this.height,
          plugins: this.plugins,
          toolbar: this.toolbar,
          branding: false,
          menubar: false,
          statusbar: false,
          //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
          images_upload_handler: async (blobInfo, success, failure) => {
            let res = await this.$axios.uploadImg(blobInfo.blob())
            if(res.code === 0) {
              success(res.data.url)
            } else {
              failure()
            }
          }
        },
        myValue: this.value
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue
      },
      myValue(newValue) {
        this.$emit('input', newValue)
      }
    },  
    methods: {
      //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      //需要什么事件可以自己增加
      onClick(e) {
        this.$emit('onClick', e, tinymce)
      },
      //可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = ''
      }
    },
    mounted() {
      tinymce.init({})
    },
  }
</script>

<style scoped lang="scss">

</style>