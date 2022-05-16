import axios from '../../src/axios';

const instance = axios.create({
  baseURL: 'http://192.168.120.248:3000/',
});

instance.get('/api/baseURL');

instance.get('http://192.168.120.248:3000/api/baseURL');
