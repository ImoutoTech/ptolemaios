<script setup lang="ts">
import { RouterView } from 'vue-router'

import SideMenu from '@/components/layout/SideMenu.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import { useSidebarStore } from '@/stores/sidebar'

const sidebar = useSidebarStore()

</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      bordered 
      :collapsed="sidebar.collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      @collapse="sidebar.toggleSideBar(true)"
      @expand="sidebar.toggleSideBar(false)"
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
      <n-layout-footer bordered>
        <site-footer />
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
