import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

interface UserData {
  id: number
  role: 0 | 1
  avatar: string
  email: string
}

const INIT_USER_DATA: UserData = {
  id: -1,
  role: 1,
  avatar: '',
  email: ''
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userData = reactive<UserData>(INIT_USER_DATA)

    const token = ref('')

    const hasLoggedIn = computed(() => userData.id !== -1 && !!token.value)

    const userLogin = (data: UserData, tk: string) => {
      Object.assign(userData, data)
      token.value = tk
    }

    const userLogout = () => {
      Object.assign(userData, INIT_USER_DATA)
      token.value = ''
    }

    return { userData, token, hasLoggedIn, userLogin, userLogout }
  },
  {
    persist: {
      key: 'user-store'
    }
  }
)
