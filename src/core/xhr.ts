import cookie from '../helpers/cookies';
import { isFormData } from '../helpers/data';
import { createError } from '../helpers/error';
import { parseHeaders } from '../helpers/headers';
import isURLSameOrigin from '../helpers/isURLSameOrigin';
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
      xsrfCookieName,
      xsrfHeaderName,
      // 新增
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus,
    } = config;
    const request = new XMLHttpRequest();

    let xsrfValue =
      (withCredentials || isURLSameOrigin(url!)) && xsrfCookieName
        ? cookie.read(xsrfCookieName)
        : undefined;

    if (xsrfValue) {
      headers[xsrfHeaderName!] = xsrfValue;
    }

    if (withCredentials) {
      request.withCredentials = true;
    }

    if (onDownloadProgress) {
      request.onprogress = onDownloadProgress;
    }

    if (onUploadProgress) {
      request.upload.onprogress = onUploadProgress;
    }
    if (isFormData(data)) {
      delete headers['Content-Type'];
    }

    if (auth) {
      const username = auth.username || '';
      const password = auth.password || '';
      headers['Authorization'] = 'Basic ' + btoa(username + ':' + password);
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
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request.status,
            response
          )
        );
      }
    }
  });
}
