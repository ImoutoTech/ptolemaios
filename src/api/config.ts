import { api } from './base'
import { ENV } from '@/config'

export const getConfigData = (slug: string) =>
  api.Get<any>(`${ENV.CONFIG_API}/config/get?slug=${slug}`, {
    validateStatus() {
      return true
    }
  })
