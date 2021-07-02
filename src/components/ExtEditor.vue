<template>
  <div class="w-full mt-10px flex flex-row items-center">
    <div class="flex w-full flex-row justify-start items-center mr-20px">
      <p class="mr-15px flex-shrink-0">名称</p>
      <el-input v-model="info.name" class="mx-20px" placeholder="融合tagName，如imgAnchor，注意: 在素材工具中对于的参数应该是[imgAnchor]" />
    </div>
    <div class="flex w-full flex-row justify-start items-center">
      <p class="mr-15px flex-shrink-0">内容</p>
      <el-input v-model="info.text" class="mx-20px" placeholder="文字类型直接填写文字; 图片类型填写图片Url" />
    </div>
    <el-button type="danger" @click="remove">删除</el-button>
  </div>
</template>

<script>
export default {
  name: "ExtEditor",
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    remove() {
      this.$emit('remove')
    }
  },
}
</script>

<style scoped>

</style>
