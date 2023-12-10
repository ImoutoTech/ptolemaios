<template>
  <div class="py-20">
    <n-result v-bind="globalStore.resultData"></n-result>
  </div>
</template>
<script setup lang="ts">
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()
</script>
