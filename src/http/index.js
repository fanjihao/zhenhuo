import axios from 'axios'
import router from '../router'

let http = axios.create({
  baseURL: 'http://192.167.6.130:8082',
  // baseURL: 'http://192.167.6.18:9000',
  // baseURL: 'http://110.89.45.40:1080/dah-cem-api',
  // baseURL: 'http://192.167.6.106:8081/dah-cem-api',
  // baseURL: 'http://192.167.6.146:8081/dah-cem-api',
  // timeout: 6000
})

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('fire-token');
    if (token) {
      // console.log(token)
      config.headers['Authorization'] = token;
    }
    // console.log(config)
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  })

http.interceptors.response.use(
  response => {
    if (response.data.token) {
      localStorage.setItem('fire-token', response.data.token);
    }
    // console.log(response)
    return response;
  },
  error => {
    // console.log(error)
    if (error.response.status === 401) {
      localStorage.removeItem('fire-oken');
      this.$message.error(error.response.data.error.message)
      // console.log(error.response.data.error.message);
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })
    } else if (error.response.status === 500) {
      return Promise.reject('服务器出错：', error.response.data);
    }
    return Promise.reject(error.response.data)
  })

export default http