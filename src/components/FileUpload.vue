<template>
  <div ref="drop" class="dropify-wrapper flex justify-center items-center" @click="showFileDialog">
    <slot />
  </div>
</template>

<script>
import electron from "electron";

export default {
  props: {
    action: {
      type: String,
      default: 'SET_SRC'
    },
  },
  data() {
    return {
    };
  },
  methods: {
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
          this.$emit('drop', this.action, f.path)
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
            this.$emit('drop', this.action, filename[0])
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
  },
  watch: {
    msg: {
      handler(v) {
        this.message = v;
      },
      immediate: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropify-wrapper {
  width: 48%;
  min-height: 190px;
  font-size: 12px;
  padding: 20px 10px;
  color: #777;
  background-color: #fff;
  text-align: center;
  border: 2px dashed #e5e5e5;
}
</style>
