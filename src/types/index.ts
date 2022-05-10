export type Method = 'get' | 'GET'
  | 'delete' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'

export interface AxiosRequestConfig {
    url?: string
    method?: Method
    headers?:any
    data?: any
    params?: any
    responseType ?:XMLHttpRequestResponseType
    timeout?:number
    cancelToken?:CancelToken
    [props:string]:any
}
export interface AxiosResponse <T = any>{
  data: T; // 服务端返回的数据
  status: number; // HTTP 状态码
  statusText: string; // 状态消息
  headers: any; // 响应头
  config: AxiosRequestConfig; // 请求配置对象
  request: any; // 请求的 XMLHttpRequest 对象实例
}

export interface AxiosPromise<T=any> extends Promise<AxiosResponse<T>> {}

export interface Axios {
  defaults: AxiosRequestConfig;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>;

  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  put<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;

  patch<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}
export interface AxiosInstance extends Axios {
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T>;
  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken
  
}
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;
  CancelToken:CancelTokenStatic
}
export interface AxiosInterceptorManager<T> {
  use(resolved:RejectedFn,rejected?:RejectedFn):number
  eject(id:number):void
}

export interface ResolvedFn<T=any>{
  (val:T):T|Promise<T>
}

export interface RejectedFn{
  (error:any):any
}

export interface CancelToken{
  promise:Promise<string>
  reason?:string
}

export interface CancelExecutor{
  (cancel:Canceler):void
}
export interface Canceler{
  (message?:string):void
}