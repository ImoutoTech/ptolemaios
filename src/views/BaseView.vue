<script setup lang="ts">
import { RouterView } from 'vue-router'

import SideMenu from '@/components/layout/SideMenu.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import { useGlobalStore } from '@/stores/global'

const global = useGlobalStore()
</script>

<template>
  <n-layout has-sider content-style="min-height: 100vh">
    <n-layout-sider
      bordered
      :collapsed="global.sidebarCollapsed"
      collapse-mode="width"
      :collapsed-width="64"
      @collapse="global.toggleSideBar(true)"
      @expand="global.toggleSideBar(false)"
      show-trigger
    >
      <side-menu />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
        <site-header />
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <RouterView />
      </n-layout-content>
      <n-layout-footer bordered position="absolute">
        <site-footer />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
