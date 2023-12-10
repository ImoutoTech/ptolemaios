import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore(
  'sidebar',
  () => {
    const collapsed = ref(true)

    const toggleSideBar = (value?: boolean) => (collapsed.value = value ?? !collapsed.value)

    return { collapsed, toggleSideBar }
  },
  {
    persist: {
      key: 'siderbar-store'
    }
  }
)
