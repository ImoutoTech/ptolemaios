<script setup lang="ts">
import BaseView from './views/BaseView.vue'
import { useGlobalStore } from './stores/global'
import { darkTheme } from 'naive-ui'

const globalStore = useGlobalStore()
</script>

<template>
  <n-config-provider :theme="globalStore.theme === 'dark' ? darkTheme : undefined">
    <n-message-provider>
      <base-view />
    </n-message-provider>
  </n-config-provider>
</template>
