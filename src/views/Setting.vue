<template>
  <div>
    <div ref="drop" class="dropify-wrapper" @click="showFileDialog">
      <div class="dropify-message">{{message}}</div>
    </div>
    <video :src="src" ref="video"></video>
    <el-button type="primary" @click="play">播放</el-button>
  </div>
</template>

<script>
import electron from 'electron'
export default {
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      message: "点击或将文件拖拽到至此处",
      src: '',
    };
  },
  methods: {
    play() {
      const v = this.$refs.video;
      v.play()
    },
    // 拖拽文件
    drop() {
      const drop = this.$refs.drop;

      drop.ondragover = () => {
        return false;
      };
      drop.ondragleave = drop.ondragend = () => {
        return false;
      };
      drop.ondrop = e => {
        e.preventDefault();
        for (let f of e.dataTransfer.files) {
          this.message = "已选择文件：" + f.path;
        }
        return false;
      };
    },
    showFileDialog(name = "file") {
      const dialog = electron.remote.dialog;
      dialog.showOpenDialog(
          {
            properties: name === "save" ? ["openDirectory"] : ["openFile"]
          },
      ).then((result) => {
        if (!result.canceled) {
          const filename = result.filePaths
          if ((filename && filename.length) === 1) {
            this.message = "已选择文件：" + filename[0];
            this.src = filename[0]
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.drop();
  }
};
</script>

<style scoped>
.dropify-wrapper {
  min-height: 190px;
  max-width: 100%;
  font-size: 14px;
  padding: 20px 10px;
  color: #777;
  background-color: #fff;
  text-align: center;
  border: 2px dashed #e5e5e5;
}
video {
  width: 300px;
  height: 200px;
}
</style>
