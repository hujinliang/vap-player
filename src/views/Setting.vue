<template>
  <div :class="[isMac ? 'pt-60px' : 'pt-50px']" class="pb-20px">
    <div :class="[isMac ? 'top-10px' : 'top-0']" class="title-bar bg-white fixed left-0 right-0 h-50px w-full flex flex-row justify-between px-20px items-center">
      <img :src="logo" class="w-30px h-30px rounded-full">
      <div @click="close" class="title-bar-button cursor-pointer" v-if="!isMac">
        <svg-icon :width="30" :height="30" class-name="" name="close"></svg-icon>
      </div>
    </div>
    <div class="flex w-full flex-col items-center px-20px">
      <div class="flex w-full flex-row items-center justify-between">
        <file-upload action="SET_SRC" @drop='onDrop'>
          <div class="break-all">{{ src || srcUploadMsg}}</div>
        </file-upload>
        <file-upload action="SET_CONFIG" @drop='onDrop'>
          <div class="break-all">{{ config || configUploadMsg }}</div>
        </file-upload>
      </div>
      <p class="self-start text-12px mt-10px info" v-if="configJson.info">config信息已获取，可以不上传config文件</p>
      <div class="w-full exts mt-20px relative">
        <p class="absolute text-12px text-gray-700 bg-white mix-tip">融合信息</p>
        <div class="rounded-full w-30px h-30px add px-10px py-10px">
          <img class="" :src="addIcon"  @click="add">
        </div>
        <ext-editor v-for="(item, index) in exts" :key="index" :info="item" @remove="del(index)"></ext-editor>
      </div>
      <div class="flex flex-row justify-center mt-20px">
<!--        <el-button type="primary" class="mr-20px" @click="save">Save</el-button>-->
        <el-button type="primary" class="" @click="play">Play</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload.vue'
import ExtEditor from '@/components/ExtEditor.vue'
import { ipcRenderer, remote } from 'electron';

const SETTING_PAGE_SIZE = [1000, 600]

export default {
  data() {
    return {
      srcUploadMsg: '点击或拖拽mp4文件到至此处',
      configUploadMsg: '点击或拖拽config文件到至此处',
      exts: [],
      logo: require('@/assets/icon.png'),
      addIcon: require('@/assets/plus.png')
    };
  },
  components: {
    ExtEditor,
    FileUpload,
  },
  computed: {
    isMac() {
      return this.$store.getters.isMac;
    },
    screenSize() {
      return this.$store.getters.screenSize;
    },
    src() {
      return this.$store.getters.src;
    },
    config() {
      return this.$store.getters.config;
    },
    configJson() {
      return this.$store.getters.configJson || {};
    },
    params() {
      return this.$store.getters.params;
    },
  },
  methods: {
    play() {
      this.save();
      this.$router.push('/player')
    },
    async onDrop(action, path) {
      this.$store.commit(action, path)
      if (action === 'SET_SRC') {
        const res = await ipcRenderer.invoke('read-config', path);
        try {
          const config = JSON.parse(res)

          this.$store.commit('SET_CONFIG_JSON', config)
        } catch (e) {
          console.error(e)
        }
      }
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
    },
    // 关闭应用
    close() {
      ipcRenderer.send('close-application')
    }
  },
  watch: {
    params(v) {
      this.exts = v;
    }
  },
  async mounted() {
    const res = await ipcRenderer.invoke('get-screen-size');
    this.$store.commit('SET_SCREEN_SIZE', res)

    const mac = await ipcRenderer.invoke('is-mac');
    this.$store.commit('SET_IS_MAC', mac)

    remote.getCurrentWindow().setSize(SETTING_PAGE_SIZE[0], SETTING_PAGE_SIZE[1])
    // position
    const screenW = this.screenSize[0]
    const screenH = this.screenSize[1]
    remote.getCurrentWindow().setPosition((screenW - SETTING_PAGE_SIZE[0]) / 2, (screenH - SETTING_PAGE_SIZE[1]) / 2 )
  }
};
</script>

<style scoped>
.exts {
  padding: 20px;
  background-color: #fff;
  border: 2px dashed #e5e5e5;
}
.info {
  color: #21B36C;
}
.add {
  background: #409EFF;
}
.mix-tip {
  top: -10px;
}
.title-bar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
.title-bar-button {
  -webkit-app-region: no-drag;
}
</style>
