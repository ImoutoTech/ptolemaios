export interface Restful<T> {
  code: number
  msg: string
  data: T
}

export type UserValidateData = Restful<{
  email: string
  role: number
  refresh: boolean
  id: number
}>

export type UserDataResult = Restful<{
  email: string
  nickname: string
  avatar: string
  id: number
  role: 0 | 1
}>
