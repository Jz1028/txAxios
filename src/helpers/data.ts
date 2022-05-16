import { isObject } from './util';

export function transformRequest(data: any): any {
  if (isObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {}
  }
  return data;
}
export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData;
}
