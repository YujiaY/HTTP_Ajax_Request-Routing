import axios from 'axios';

const instance = axios.create({
  headers: {
    common: {},
  },
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = "INSTANCE AUTH TOKEN";

instance.interceptors.request.use(request => {
  console.log('Here is the instance request:');
  console.log(request);
  return request;
}, error => {
  console.log('Here is the request error:');
  console.log(error);
  return Promise.reject(error);
});

export default instance;
