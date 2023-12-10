import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import { axiosRequestAdapter } from '@alova/adapter-axios'

import { ENV } from '@/config'

import { useUserStore } from '@/stores/user'

export const api = createAlova({
  // VueHook用于创建ref状态，包括请求状态loading、响应数据data、请求错误对象error等
  statesHook: VueHook,

  // 请求适配器
  requestAdapter: axiosRequestAdapter(),

  baseURL: ENV.API_URL,

  beforeRequest(method) {
    // 假设我们需要添加token到请求头
    const userStore = useUserStore()
    if (userStore.hasLoggedIn) {
      method.config.headers.Authorization = userStore.token
    }
  },

  // GlobalFetch适配器将会返回Response实例，
  // 你可以设置一个全局的响应拦截器返回json数据
  responded: {
    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response) => {
      const json = response.data
      if (json.code !== 0 || response.status !== 200) {
        // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
        throw new Error(json)
      }

      return json
    }

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    // onError: (err) => {
    //   return err
    // }
  }
})
