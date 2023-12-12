import { ssoAPI } from './base'
import type { UserDataResult, UserValidateData } from './types'

export const validateToken = (token: string) =>
  ssoAPI.Get<UserValidateData>(`/user/validate`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const getUserData = (token: string, id: number) =>
  ssoAPI.Get<UserDataResult>(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
