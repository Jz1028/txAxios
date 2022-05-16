// src/defaultes.ts

import { AxiosRequestConfig } from './types';

const defaults: AxiosRequestConfig = {
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
  // 新增
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus(status: Number): boolean {
    return status >= 200 && status < 300;
  },
};

const methodsNoData = ['delete', 'get', 'head', 'options'];

methodsNoData.forEach((method) => {
  defaults.headers[method] = {};
});

const methodsWithData = ['post', 'put', 'patch'];

methodsWithData.forEach((method) => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
});
export default defaults;
