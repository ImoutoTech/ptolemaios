import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import route, { type RouteItem } from './route'
import { SITE_TITLE } from '@/config'

const traverseRoute = (root: RouteItem[]): RouteRecordRaw[] => {
  return root.map((item) => {
    const newItem: RouteRecordRaw = {
      ...item,
      children: [],
      component: () => import(/* @vite-ignore */ `../${item.component}`)
    }

    if (item.children && Array.isArray(item.children) && item.children.length) {
      newItem.children = traverseRoute(item.children)
    }
    return newItem
  })
}

const routes = traverseRoute(route)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// router.beforeEach((to) => {
//   if (to.meta.needAuth && !userStore.isLogin && !userStore.loginLoading) {
//     MessagePlugin.warning('请先登录')
//     router.push('/')
//   }

//   document.title = `${SITE_TITLE} | ${to.meta.title}`
// })

export default router
