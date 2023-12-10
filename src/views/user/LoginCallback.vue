<template>
  <n-result v-bind="displayResultBinds" class="mt-20">
    <template v-if="displayResultBinds.status === 'loading'" #icon>
      <div class="animate-bounce h-20 w-20">
        <n-icon :component="HeartSharp" size="80" />
      </div>
    </template>
    <template #footer>
      <n-button v-if="displayResultBinds.status === 'success'" @click="loginRedirect"
        >立即跳转</n-button
      >
    </template>
  </n-result>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { validateToken, getUserData } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'
import { useRequest } from 'alova'
import { type AxiosResponse } from 'axios'
import { HeartSharp } from '@vicons/ionicons5'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const redirectTimer = ref<number>()

const {
  loading: validateLoading,
  error: validateError,
  data: validateData,
  onSuccess: onValidated
} = useRequest(() => validateToken(route.query.ticket as string))

const {
  loading: userDataLoading,
  error: userDataError,
  data: userData,
  onSuccess: onGotUserData,
  send: queryUserData
} = useRequest((id) => getUserData(route.query.ticket as string, id), {
  immediate: false
})

const displayResultBinds = computed(() => {
  if (validateLoading.value || userDataLoading.value) {
    return {
      title: '加载中',
      description: '转啊转啊转',
      status: 'loading'
    }
  }

  if (validateError.value || userDataError.value) {
    const e = (validateError.value || userDataError.value) as AxiosResponse['data']
    return {
      title: '出错了',
      description: e.response.data.msg,
      status: String(e.response.status)
    }
  }

  if (validateData.value.data.role !== 0) {
    return {
      title: '登录失败',
      description: '只对管理员开放哦',
      status: '403'
    }
  }

  return {
    title: '登录成功',
    description: '3秒后跳转',
    status: 'success'
  }
})

const loginRedirect = () => {
  clearTimeout(redirectTimer.value)
  router.push({ name: 'landing' })
}

onValidated(() => {
  if (validateData.value.data.role !== 0) {
    return
  }
  queryUserData(validateData.value.data.id)
})

onGotUserData(() => {
  userStore.userLogin(
    {
      ...userData.value.data,
      role: Number(userData.value.data.role) as 0 | 1
    },
    route.query.ticket as string
  )
  redirectTimer.value = setTimeout(loginRedirect, 3000)
})
</script>
