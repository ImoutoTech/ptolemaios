<template>
  <div class="site-header">
    <span class="font-bold text-xl cursor-default select-none">{{ SITE_TITLE }}</span>
    <n-space>
      <n-button class="top-[3.5px]" text @click="globalStore.switchTheme">
        <template #icon>
          <n-icon
            :component="globalStore.theme === 'dark' ? SunnyOutline : MoonOutline"
            :size="16"
          />
        </template>
      </n-button>
      <n-button v-if="userStore.hasLoggedIn" text>{{ userStore.userData.nickname }}</n-button>
      <n-button v-for="item in menu" :key="item.label" text @click="item.onClick">
        {{ item.label }}
      </n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SITE_TITLE, ENV } from '@/config/index'
import { type SiteHeaderMenuItem } from './types'
import { useUserStore } from '@/stores/user'
import { useGlobalStore } from '@/stores/global'
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'

defineOptions({
  name: 'SiteHeader'
})

const userStore = useUserStore()
const globalStore = useGlobalStore()

const handleRedirectSSO = () => {
  window.location.href = `${ENV.SSO_URL}/callback/${ENV.SSO_KEY}`
}

const menu = computed<SiteHeaderMenuItem[]>(() => {
  return [
    {
      label: '登录',
      show: !userStore.hasLoggedIn,
      onClick: handleRedirectSSO
    },
    {
      label: '注册',
      show: !userStore.hasLoggedIn,
      onClick: handleRedirectSSO
    },
    {
      label: '登出',
      show: userStore.hasLoggedIn,
      onClick: userStore.userLogout
    }
  ].filter((item) => item.show)
})
</script>

<style lang="scss" scoped>
.site-header {
  @apply flex justify-between items-center px-4 h-16;
}
</style>
