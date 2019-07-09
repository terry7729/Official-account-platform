<template>
  <div class="img-text-content pos-r radius">
    <el-image style="width: 100%; height: 100%;" :src="url" fit="fill"></el-image>
    <div class="img-text-btns tc white-text fz-20">
      <i class="el-icon-edit-outline" @click="handleEdit"></i>
      <i class="el-icon-delete ml-20" @click="handleDelete"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'url'
    ],
    data() {
      return {}
    },
    methods: {
      handleEdit() {
        this.$emit('edit')
      },
      handleDelete() {
        this.$emit('delete')
      }
    }
  }
</script>

<style scoped lang="scss">
  .img-text-content {
    width: 260px; 
    height: 180px; 
    overflow: hidden;
  }
  .img-text-btns {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 35px;
    line-height: 35px;
    background: rgba(0, 0, 0, 0.5);
  }
</style>