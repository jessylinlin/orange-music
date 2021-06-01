import axios, { AxiosRequestConfig, Method } from 'axios'
import { ElLoading } from 'element-plus'
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
const cancelToken = axios.CancelToken;

//axios实例
const instance = axios.create({
  timeout: 10000,
  responseType: 'json'
})

let loadingInstance

