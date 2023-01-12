import Vue from 'vue'
import Router from 'vue-router'
import Setting from '../views/Setting.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Setting',
    component: Setting
  },
  {
    path: '/player',
    name: 'Player',
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Player')
  }
]

const createRouter = () => {
  return new Router({
    mode: 'hash',
    // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
}

const router = createRouter()

export default router
