<script setup lang="ts">
import { RouterView } from 'vue-router'

import SideMenu from '@/components/layout/SideMenu.vue'
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider class="layout-sider">
      <side-menu />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>颐和园路</n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <RouterView />
      </n-layout-content>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
  .layout-sider {
    background-color: rgb(250, 250, 250);
    @apply min-h-screen;
  }
</style>
