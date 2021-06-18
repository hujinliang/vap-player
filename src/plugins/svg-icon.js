import SvgIcon from '@/components/SvgIcon.vue'

/**
 * 引入所有的 svg icon，这样就不需要在单独的组件中引入了
 */
const importAllSvgIcons = () => {
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  const req = require.context('@/assets/svg/icons', true, /\.svg$/)
  requireAll(req)
}

export const install = (app) => {
  importAllSvgIcons()
  app.component(SvgIcon.name, SvgIcon)
}
