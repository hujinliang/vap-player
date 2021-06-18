const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

// TODO: 替换 css 变量，兼容不支持 css3 变量浏览器
// const postcssPresetEnv = require('postcss-preset-env')({
//   stage: 1,
//   importFrom: './src/styles/global/variables/ie-color.css',
// });

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './src/**/*.html',
    './src/**/*.vue'
  ],
  safelist: {
    standard: [/^el-/]
  }
})

const isBuild = process.env.NODE_ENV === 'production'

const plugins = [
  tailwindcss,
  autoprefixer
  // postcssPresetEnv,
]

isBuild && plugins.push(purgecss)

module.exports = {
  plugins
}
