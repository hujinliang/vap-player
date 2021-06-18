<template>
  <svg
    :class="proxyClassList"
    :height="normalizePixel(height)"
    :width="normalizePixel(width)"
    :viewBox="viewBox">
    <use :href="proxyName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: String,
    height: {
      type: [Number, String],
      default: '20px',
    },
    width: {
      type: [Number, String],
      default: '20px',
    },
    classList: String,
    viewBox: String,
  },
  computed: {
    proxyName() {
      return `#icon-${this.name}`
    },
    proxyClassList() {
      return this.classList ? `SvgIcon ${this.classList}` : 'SvgIcon'
    }
  },
  methods: {
    normalizePixel(val) {
      if (Number.isNaN(+val)) {
        return val;
      }
      return `${val}px`;
    }
  }
};
</script>

<style lang="scss" scoped>
.SvgIcon {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}
</style>
