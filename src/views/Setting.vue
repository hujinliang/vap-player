<template>
  <div class="flex w-full flex-col items-center px-20px">
    <div class="flex w-full flex-row items-center justify-between">
      <file-upload action="SET_SRC" @drop='onDrop'>
        <div class="break-all">{{ src || srcUploadMsg}}</div>
      </file-upload>
      <file-upload action="SET_CONFIG" @drop='onDrop'>
        <div class="break-all">{{ config || configUploadMsg }}</div>
      </file-upload>
    </div>
    <div class="w-full exts mt-20px">
      <el-button type="primary" @click="add">增加</el-button>
      <ext-editor v-for="(item, index) in exts" :key="index" :info="item" @remove="del(index)"></ext-editor>
    </div>
    <div class="flex flex-row justify-center mt-20px">
      <el-button type="primary" class="mr-20px" @click="save">保存</el-button>
      <el-button type="primary" class="" @click="play">播放</el-button>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'
import ExtEditor from '@/components/ExtEditor.vue'
import { ipcRenderer } from 'electron';
export default {
  data() {
    return {
      srcUploadMsg: '点击或拖拽mp4文件到至此处',
      configUploadMsg: '点击或拖拽config文件到至此处',
      exts: []
    };
  },
  components: {
    ExtEditor,
    FileUpload,
  },
  computed: {
    src() {
      return this.$store.getters.src;
    },
    config() {
      return this.$store.getters.config;
    },
    params() {
      return this.$store.getters.params;
    },
  },
  methods: {
    play() {
      this.$router.push('/player')
    },
    async onDrop(action, path) {
      this.$store.commit(action, path)
      // 解析文件
      if (action === 'SET_CONFIG') {
        const res = await ipcRenderer.invoke('read-file', path);
        this.$store.commit('SET_CONFIG_JSON', res)
      }
    },
    add() {
      this.exts.push({
        name: '',
        text: ''
      })
    },
    del(index) {
      this.exts.splice(index, 1)
    },
    save() {
      this.$store.commit('SET_PARAMS', this.exts)
    }
  },
  watch: {
    params(v) {
      this.exts = v;
    }
  }
};
</script>

<style scoped>
.exts {
  padding: 20px;
  background-color: #fff;
  border: 2px dashed #e5e5e5;
}
</style>
