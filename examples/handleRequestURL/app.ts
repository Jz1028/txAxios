// examples/handleRequestURL/app.ts

import axios from "../../src/axios";
// 普通参数
axios({
  method: 'get',
  url: '/api/handleRequestURL/get',
  params: {
    a: 1,
    b: 2
  }
})

// 参数值为数组
axios({
  method: 'get',
  url: '/api/handleRequestURL/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// 参数值为对象
axios({
  method: 'get',
  url: '/api/handleRequestURL/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// 参数值为 Date 类型
const date = new Date()
axios({
  method: 'get',
  url: '/api/handleRequestURL/get',
  params: {
    date
  }
})

// 参数值包含特殊字符
axios({
  method: 'get',
  url: '/api/handleRequestURL/get',
  params: {
    foo: '@:$, '
  }
})

// 参数值包含null或`undefined`
axios({
  method: 'get',
  url: '/api/handleRequestURL/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

// url 中存在哈希#标记
axios({
  method: 'get',
  url: '/api/handleRequestURL/get#hash?bar=baz',
  params: {
    foo: 'bar'
  }
})

// url 中已存在的参数
axios({
  method: 'get',
  url: '/api/handleRequestURL/get?foo=bar',
  params: {
    bar: 'baz'
  }
})