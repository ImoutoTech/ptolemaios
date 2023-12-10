import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore(
  'global',
  () => {
    const sidebarCollapsed = ref(true)

    const theme = ref<'dark' | 'light'>()

    const toggleSideBar = (value?: boolean) =>
      (sidebarCollapsed.value = value ?? !sidebarCollapsed.value)

    const resultData = ref({ title: 'Oops', status: 'warning', description: '好像出了点错' })

    const updateResultData = (value: Record<'title' | 'status' | 'description', string>) =>
      (resultData.value = value)

    const switchTheme = () => {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    return { sidebarCollapsed, resultData, theme, toggleSideBar, updateResultData, switchTheme }
  },
  {
    persist: {
      key: 'global-store'
    }
  }
)
