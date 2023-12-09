<template>
  <n-menu :value="menuValue" :options="menuOptions" @update:value="handleUpdateValue"/>
</template>

<script setup lang="ts">
import { watch, ref, onUnmounted } from 'vue'
import type { MenuOption } from 'naive-ui'
import route, { type RouteItem } from '@/router/route'
import { useRouter, useRoute } from 'vue-router'

defineOptions({
  name: 'SideMenu',
})

const router = useRouter()
const routeRef = useRoute()

const menuValue = ref('');

const getMenuFromRoute = (root: RouteItem[]): MenuOption[] => {
  return root.map((item) => {
    return {
      ...item,
      children: item.children ? getMenuFromRoute(item.children) : item.children,
    }
  })
}

const menuOptions: MenuOption[] = getMenuFromRoute(route);

const handleUpdateValue =  (key: string) => {
  menuValue.value = key;
  router.push({ name: key })
}

const unwatch = watch(
  () => routeRef.name,
  (val) => {
    menuValue.value = (val || '') as string;
  },
  { immediate: true }
)

onUnmounted(unwatch);
</script>