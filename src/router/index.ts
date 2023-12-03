import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import route, { type RouteItem} from './route'


const traverseRoute = (root: RouteItem[]): RouteRecordRaw[] => {
  return root.map((item) => {
    const newItem: RouteRecordRaw = {
      ...item,
      children: [],
      component: () => import(/* @vite-ignore */`../${item.component}`),
    }
    
    if (item.children && Array.isArray(item.children) && item.children.length) {
      newItem.children = traverseRoute(item.children);
    }
    return newItem;
  })
}

const routes = traverseRoute(route);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
