<template>
  <div class="h-[calc(100vh-119px)] flex items-center justify-center">
    <n-result v-bind="globalStore.resultData"></n-result>
  </div>
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
</script>
