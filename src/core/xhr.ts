import { createError } from '../helpers/error';
import { parseHeaders } from '../helpers/headers';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
    } = config;
    const request = new XMLHttpRequest();

    if (withCredentials) {
      request.withCredentials = true;
    }

    request.open(method.toUpperCase(), url as string, true);
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      }
      request.setRequestHeader(name, headers[name]);
    });

    if (responseType) {
      request.responseType = responseType;
    }
    if (timeout) {
      request.timeout = timeout;
    }

    request.send(data);

    if (cancelToken) {
      cancelToken.promise.then((reason) => {
        request.abort();
        reject(reason);
      });
    }
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 0) {
        return;
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText;
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      };
      handleResponse(response);
      // resolve(response);
    };

    request.onerror = function() {
      reject(createError('Net Error', config, null, request));
    };

    request.ontimeout = function() {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'TIMEOUT',
          request
        )
      );
    };

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        createError(
          `Request failed with status code ${response.status}`,
          config,
          null,
          request.status,
          response
        );
      }
    }
  });
}
