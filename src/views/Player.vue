<template>
  <div class="flex flex-col items-center justify-center px-15px">
    <div ref="anim"  class="container" :style="{ width: `${width}px`, height: `${height}px` }"></div>
    <el-button type="primary" @click="back">
      返回
    </el-button>
  </div>
</template>
<script>
import Vap from 'video-animation-player'
  export default {
    name: 'Player',
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
            })
      }
    },
    computed : {
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
    mounted() {
      this.play()
    },
  }
</script>
<style lang="scss" scoped>
 .container {
   background: rgba(189, 17, 217, .4);
 }
</style>
