<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global'

const userStore = useUserStore()
const globalStore = useGlobalStore()

const router = useRouter()

const unwatch = watch(
  () => userStore.hasLoggedIn,
  (val) => {
    if (!val) {
      globalStore.updateResultData({
        title: '稍等片刻',
        status: '403',
        description: '看起来你还没有登录'
      })
      router.push({ name: 'info' })
    }
  },
  { immediate: true }
)

onUnmounted(unwatch)
</script>

<template>
  <main class="h-[calc(100vh-119px)] flex items-center justify-center">
    <n-result status="418" title="本来应该是一个看板" description="但是还没做TAT"></n-result>
  </main>
</template>
