import axios from '../../src/axios';

axios.get('/api/checkStatus').then((res) => {
  console.log(res);
});

axios
  .get('/api/checkStatus', {
    validateStatus: (status) => status >= 200 && status < 400,
  })
  .then((res) => {
    console.log(res);
  });
