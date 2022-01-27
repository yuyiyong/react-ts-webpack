import utils from 'Src/utils/utils'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import HookToast from 'Src/components/toast/HookToast'

let reqNum = 0
let toastId: undefined | string
// const store = useStore();
// * loading
const startLoading = () => {
  if (reqNum === 0) {
    // console.log('开始-=loading--', reqNum)
    //loading开始
    // store.commit("common/setLoading", true);
    // toastId = toast.loading("Loading...");
  }
  reqNum++
}
const endLoading = () => {
  // console.log('结束-=loading--', reqNum)
  if (reqNum <= 0) return
  reqNum--
  if (reqNum === 0) {
    if (toastId) {
      // toast.dismiss(toastId);
    }
    //loading结束
    // store.commit("common/setLoading", false);
  }
}

// * login
const toLogin = () => {
  console.log('去login界面')
}

// http.ts
// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { ElMessage } from "element-plus";

const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

const envBaseUrl = () => {
  console.log('process.env.NODE_ENV---', process.env.NODE_ENV)

  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://api.gmduck.com'
    case 'test':
      return 'http://test.api.gmduck.com'
    case 'development':
      return '/api'
    default:
      return 'http://test.api.gmduck.com'
  }

  // return process.env.NODE_ENV === "production" ? `http://test.api.gmduck.com` : "/api",
}

const service = axios.create({
  // 联调
  baseURL: envBaseUrl(),
  // process.env.NODE_ENV === 'production' ? `https://api.gmduck.com` : 'http://test.api.gmduck.com/gateway/',

  // baseURL: "/api",
  // headers: {
  //   get: `{
  //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  //   }`,
  //   post: `{
  //     "Content-Type": "application/json;charset=utf-8",
  //   }`,
  // },

  // 是否跨站点访问控制请求
  withCredentials: true,
  timeout: 60000,
  transformRequest: [
    (data) => {
      console.log('data---', typeof data)

      if (!utils.isFormData(data)) {
        data = JSON.stringify(data)
      }
      return data
    },
  ],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  },
  transformResponse: [
    (data) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    },
  ],
})

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log('heads', config.headers!.loading)
    // if (config.headers!.showLoading === CONST.LOADING) {
    //   startLoading()
    // }

    // removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    //获取token，并将其添加至请求头中
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers!.Authorization = `${token}`;
    // }

    utils.initHeaders(config)

    return config
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    endLoading()
    removePending(response) // 在请求结束后，移除本次请求
    const status = response.status
    let msg = ''
    if (status < 200 || status >= 300) {
      // 处理http错误，抛到业务代码
      msg = showStatus(status)
      //   if (typeof response.data === "string") {
      //     response.data = { msg };
      //   } else {
      //     response.data.msg = msg;
      //   }
      console.log('返回拦截', msg)
      HookToast(msg)
    }
    return response.data
  },
  (error) => {
    endLoading()
    if (axios.isCancel(error)) {
      HookToast(error.message)
    } else {
      // handle error code
      // 错误抛到业务代码
      error.data = {}
      error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
      HookToast(error.data.msg)
    }
    return Promise.reject(error)
  },
)

export default service
