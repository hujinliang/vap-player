<template>
  <div class="flex relative flex-col items-center justify-center">
    <div :class="[isMac ? 'h-70px' : 'h-50px']" class="title-bar absolute top-0 left-0 right-0 w-full flex flex-row justify-between px-20px items-center">
      <div @click="back" class="title-bar-button cursor-pointer text-white">
        <svg-icon :width="30" :height="30" class-name="" name="back"></svg-icon>
      </div>
    </div>
    <div ref="anim" class="container" :style="{ width: `${playW}px`, height: `${playH}px` }"></div>
    <div class="flex absolute bottom-30px h-50px left-30px right-30px toolbar justify-center items-center">
      <img class="w-30px h-30px" @click="togglePlay" :src="playing ? pauseIcon : playIcon">
    </div>
  </div>
</template>
<script>
import Vap from 'video-animation-player'
import {remote} from "electron";
  export default {
    name: 'Player',
    data() {
      return {
        vap: null,
        playIcon: require('@/assets/play.png'),
        pauseIcon: require('@/assets/pause.png'),
        playing: false,
        playW: 500,
        playH:300,
      }
    },
    methods: {
      back() {
        this.$router.push('/')
      },
      togglePlay() {
        if (!this.vap) {
          this.play()
        }
        if (this.playing) {
          this.vap.pause()
        } else {
          this.vap.play()
        }
      },
      play () {
        const config = {
          container: this.$refs.anim,
          // 素材视频链接
          src: this.isMac ? `file:${this.src}` : this.src,
          config: this.configJson,
          width: this.playW,
          height: this.playH,
          fps: this.fps,
          // 精准模式
          accurate: true
        }

        this.params.forEach(i => {
          config[i.name] = i.text
        })
        this.vap = new Vap(config)
            .on('playing', () => {
              this.playing = true
              console.log('playing')
            })
            .on('ended', () => {
              this.playing = false
              console.log('play ended')
              this.vap = null;
              // this.$router.push('/')
            })
            .on('pause', () => {
              this.playing = false
              console.log('pause')
            })
      }
    },
    computed : {
      screenSize() {
        return this.$store.getters.screenSize;
      },
      isMac() {
        return this.$store.getters.isMac;
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
      },
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
      this.playW = playW
      this.playH = playH
      remote.getCurrentWindow().setSize(Math.round(playW), Math.round(playH))
      // set position
      remote.getCurrentWindow().setPosition(Math.round((screenW - playW) / 2), Math.round((screenH - playH) / 2) )
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
 .title-bar {
   background: rgba(0, 0, 0, .4);
   -webkit-user-select: none;
   -webkit-app-region: drag;
 }
 .title-bar-button {
   -webkit-app-region: no-drag;
 }
 .toolbar {
   background: rgba(0, 0, 0, .4);
 }
</style>
