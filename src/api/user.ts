import { api } from './base'
import { ENV } from '@/config'
import type { UserDataResult, UserValidateData } from './types'

export const validateToken = (token: string) =>
  api.Get<UserValidateData>(`${ENV.SSO_API}/user/validate`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const getUserData = (token: string, id: number) =>
  api.Get<UserDataResult>(`${ENV.SSO_API}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
