<template>
  <n-menu
    :value="menuValue"
    :options="menuOptions"
    :collapsed="global.sidebarCollapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    @update:value="handleUpdateValue"
  />
</template>

<script setup lang="ts">
import { watch, ref, onUnmounted, computed } from 'vue'
import type { MenuOption } from 'naive-ui'
import route, { type RouteItem } from '@/router/route'
import { useRouter, useRoute } from 'vue-router'

import { useGlobalStore } from '@/stores/global'
import { useUserStore } from '@/stores/user'

const global = useGlobalStore()
const userStore = useUserStore()

defineOptions({
  name: 'SideMenu'
})

const router = useRouter()
const routeRef = useRoute()

const menuValue = ref('')

const getMenuFromRoute = (root: RouteItem[]): MenuOption[] => {
  return root.map((item) => {
    return {
      ...item,
      show: item.needAuth && !userStore.hasLoggedIn ? false : item.show,
      children: item.children ? getMenuFromRoute(item.children) : item.children,
      component: undefined
    }
  })
}

const menuOptions = computed<MenuOption[]>(() => getMenuFromRoute(route))

const handleUpdateValue = (key: string) => {
  menuValue.value = key
  router.push({ name: key })
}

const unwatch = watch(
  () => routeRef.name,
  (val) => {
    menuValue.value = (val || '') as string
  },
  { immediate: true }
)

onUnmounted(unwatch)
</script>
