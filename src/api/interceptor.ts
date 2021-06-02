import axios, { AxiosRequestConfig, Method } from 'axios'
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

const components = [
  ElLoading
]

//定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: Function
}

//取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

//axios实例
const instance = axios.create({
  timeout: 10000,
  responseType: 'json'
})

let loadingInstance

//移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]

    //当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      //取消
      list.cancel('操作频繁，请稍后再试')
      pending.splice(item, 1)
    }
  }
}

//添加请求拦截器
instance.interceptors.request.use(
  request => {
    loadingInstance = ElLoading.service({
      text: '加载中',
      background: 'rgba(0,0,0,.3)'
    })

    removePending(request)

    request.cancelToken = new CancelToken((c) => {
      pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c });
    })

    return request
  },
  error => {
    return Promise.reject(error)
  }
)

//添加响应拦截器
instance.interceptors.response.use(
  response => {
    //loadingInstance.close();
    removePending(response.config)

    const errorCode = response?.data?.errorCode;
    switch (errorCode) {
      case '401':
        // 根据errorCode，对业务做异常处理(和后端约定)
        break
      default:
        break
    }

    return response
  },
  err => {
    //loadingInstance.close(0);
    const response = err.response;
    if (err && response) {
      // 根据返回的http状态码做不同的处理
      switch (response?.status) {
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '没有权限'
          break
        case 404:
          err.message = '请求错误'
          break
        case 500:
          err.message = '服务器出错'
          break;
        case 503:
          err.message = '服务不可用(503)';
          break;
        case 504:
          err.message = '网络超时(504)';
          break;
        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = '连接服务器失败'
    }

    // 超时重新请求
    const config = err.config;
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: err.message })
      }

      //增加重试次数
      config.__retryCount++

      // 创造新的Promise来处理指数后退
      const backoff = new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, RETRY_DELAY || 1);
      });

      //instance 重新请求的promise
      return backoff.then(() => {
        return instance(config)
      })
    }

    //弹出提示
    return Promise.reject(response || { message: err.message });
  }
)

export default instance

