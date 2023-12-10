import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import route, { type RouteItem } from './route'
import { SITE_TITLE } from '@/config'

import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '@/stores/global'

const traverseRoute = (root: RouteItem[]): RouteRecordRaw[] => {
  return root.map((item) => {
    const newItem: RouteRecordRaw = {
      ...item,
      meta: {
        needAuth: item.needAuth,
        title: item.label
      },
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

router.beforeEach((to) => {
  const userStore = useUserStore()
  const globalStore = useGlobalStore()

  if (to.meta.needAuth && !userStore.hasLoggedIn) {
    globalStore.updateResultData({
      title: '嘿！停下来！',
      status: '403',
      description: '需要先登录哈'
    })
    router.push({ name: 'info' })
    return
  }

  document.title = `${SITE_TITLE} | ${to.meta.title}`
})

export default router
