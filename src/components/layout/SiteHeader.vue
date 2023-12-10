<template>
  <div class="site-header">
    <span>{{ SITE_TITLE }}</span>
    <n-space>
      <n-button v-for="item in menu" :key="item.label" text>
        {{ item.label }}
      </n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SITE_TITLE } from '@/config/index'
import { type SiteHeaderMenuItem } from './types'

defineOptions({
  name: 'SiteHeader'
})

const menu = computed<SiteHeaderMenuItem[]>(() => {
  return [
    {
      label: '登录'
    },
    {
      label: '注册'
    },
    {
      label: '登出'
    }
  ]
})
</script>

<style lang="scss" scoped>
.site-header {
  @apply flex justify-between items-center px-4 h-16;
}
</style>
