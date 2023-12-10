<template>
  <n-spin :show="loading">
    <div class="h-[calc(100vh-119px)]">
      <iframe v-if="iframeUrl" class="w-full h-full" :src="iframeUrl" frameborder="0"></iframe>
    </div>
  </n-spin>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRequest } from 'alova'
import { getConfigData } from '@/api/config'

const route = useRoute()

const { data: iframeMap, loading } = useRequest(() => getConfigData('pto-iframe'))

const iframeUrl = computed(() => {
  return iframeMap.value?.[route.name as string] || ''
})
</script>
