import { h, type Component } from 'vue'
import { RouterView } from 'vue-router'
import { NIcon, type MenuOption } from 'naive-ui'
import { HomeOutline, PlanetOutline } from '@vicons/ionicons5'

export interface RouteBaseInfo {
  path: string
  name: string
  key: string
  component: string | Component
  label: string
  icon?: MenuOption['icon']
  show: boolean
  needAuth?: boolean
}

export interface RouteItem extends RouteBaseInfo {
  children?: RouteItem[]
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// component字段在使用时会自动在前面加上 ../

const route: RouteItem[] = [
  {
    path: '/',
    name: 'landing',
    component: 'views/HomeView.vue',
    key: 'landing',
    label: '首页',
    icon: renderIcon(HomeOutline),
    show: true,
    needAuth: false
  },
  {
    path: '/login',
    name: 'login',
    component: 'views/user/LoginCallback.vue',
    key: 'login',
    label: '登录',
    show: false,
    needAuth: false
  },
  {
    path: '/info',
    name: 'info',
    component: 'views/GlobalResult.vue',
    key: 'info',
    label: '发生了一些事情',
    show: false,
    needAuth: false
  },
  {
    path: '/panel',
    name: 'panel',
    key: 'panel',
    component: RouterView,
    label: '快捷面板',
    icon: renderIcon(PlanetOutline),
    show: true,
    needAuth: true,
    children: [
      {
        path: 'server',
        name: 'panel-server',
        component: 'views/panel/IndexView.vue',
        key: 'panel-server',
        label: '服务器状态',
        show: true
      }
    ]
  }
]

export default route
