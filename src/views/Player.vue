<template>
  <div class="flex relative flex-col items-center justify-center">
    <div ref="anim"  class="container" :style="{ width: `${width}px`, height: `${height}px` }"></div>
    <div class="absolute left-10px top-10px">
      <el-button type="primary" @click="back">
        Back
      </el-button>
    </div>
  </div>
</template>
<script>
import Vap from 'video-animation-player'
import {remote} from "electron";
  export default {
    name: 'Player',
    state() {
      return {
        vap: null,
      }
    },
    methods: {
      back() {
        this.$router.push('/')
      },
      play () {
        const config = {
          container: this.$refs.anim,
          // 素材视频链接
          src: this.src,
          config: this.configJson,
          width: this.width,
          height: this.height,
          fps: this.fps,
          // 精准模式
          accurate: true
        }

        this.params.forEach(i => {
          config[i.name] = i.text
        })
        this.vap = new Vap(config)
            .on('playing', () => {
              console.log('playing')
            })
            .on('ended', () => {
              console.log('play ended')
              this.vap = null;
              this.$router.push('/')
            })
      }
    },
    computed : {
      screenSize() {
        return this.$store.getters.screenSize;
      },
      src() {
        return this.$store.getters.src;
      },
      configJson() {
        return this.$store.getters.configJson || {};
      },
      params() {
        return this.$store.getters.params || {};
      },
      // 从config中获取width height 以及 fps
      info() {
        return this.configJson.info || {}
      },
      width() {
        return this.info.w
      },
      height() {
        return this.info.h
      },
      fps() {
        return this.info.fps
      }
    },
    beforeMount() {
      // 计算尺寸
      let playW = this.width
      let playH = this.height
      let ratio = this.width / this.height
      const screenW = this.screenSize[0]
      const screenH = this.screenSize[1]
      if (playW >= screenW) {
        playW = screenW - 100
        playH = playW / ratio
      }
      if (playH >= screenH) {
        playH = screenH - 100
        playW = playH * ratio
      }
      remote.getCurrentWindow().setSize(playW, playH)
      // set position
      remote.getCurrentWindow().setPosition((screenW - playW) / 2, (screenH - playH) / 2 )
    },
    mounted() {
      this.play()
    },
    beforeDestroy () {
      if (this.vap) {
        try {
          this.vap.destroy();
        } catch (e) {
          console.log(e)
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
 .container {
   background-image: url(~@/assets/bg.png);
   background-size: cover;
 }
</style>
