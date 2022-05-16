const toString = Object.prototype.toString;
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]';
}
export function isObject(val: any): val is Object {
  return toString.call(val) === '[object Object]';
}
export function isURLSearchParams(val: any): val is Object {
  return val instanceof URLSearchParams;
}
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null);

  for (let i = 0; i < objs.length; i++) {
    const obj = objs[i];
    for (let key in obj) {
      assignValue(obj[key], key);
    }
  }

  function assignValue(val: any, key: string) {
    if (isObject(result[key]) && isObject(val)) {
      result[key] = deepMerge(result[key], val);
    } else if (isObject(val)) {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

export default function isAbsoluteURL(url: string): boolean {
  // 如果URL以“<scheme>：//”或“//”（协议相对URL）开头，则该URL被视为绝对值。
  // RFC 3986将方案名称定义为以字母开头的字符序列，
  // 后跟字母，数字，加号，句点或连字符的任意组合。
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
