import combineURLs from '../helpers/combineURLs';
import { transformRequest, transformResponse } from '../helpers/data';
import { flattenHeaders, processHeaders } from '../helpers/headers';
import { bulidURL } from '../helpers/url';
import isAbsoluteURL from '../helpers/util';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';
import xhr from './xhr';

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config);
  processConfig(config);
  return xhr(config).then((res: AxiosResponse) => transformResponseData(res));
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
  config.headers = flattenHeaders(config.headers, config.method!);
}
export function transformUrl(config: AxiosRequestConfig) {
  let { url, params, paramsSerializer, baseURL } = config;
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURLs(baseURL, url);
  }
  return bulidURL(url!, params, paramsSerializer);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}

// 如果已经请求取消，则抛出异常。
function throwIfCancellationRequested(config: AxiosRequestConfig) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

export default dispatchRequest;
