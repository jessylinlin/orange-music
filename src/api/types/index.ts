//定义需要的接口
export type Method = 'GET' | 'POST' | 'DELETE' | 'PUT'
export type ResponseType = 'arrayBuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
  baseURL?: string;
  url: string;
  data?: any;
  params?: any;
  method?: Method;
  headers?: any;
  timeout?: number;
  responseType?: ResponseType
}

export interface AxiosResponse {
  data: any;
  headers: any;
  request?: any;
  status: number;
  statusText: string;
  config: AxiosRequest
}

export interface CustomerResponse {
  readonly status: boolean;
  readonly message: string;
  data: any;
  origin?: any
}

export interface getDemo {
  id: number;
  str: string;
}

export interface PostDemo {
  id: number;
  list: Array<{
    id: number;
    version: number
  }>
}