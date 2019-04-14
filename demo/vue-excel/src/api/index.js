import axios from 'axios';
import {ajaxHost} from '../constant';
import {store} from '../main';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (window.localStorage.getItem('jwt')) {
    config.headers.common.authorization = window.localStorage.getItem('jwt');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  const {validStatus} = response.data;

  if (!validStatus || !validStatus.status) {
    store.commit('saveUserInfo', {});
  } else {
    const user = validStatus.data.user;
    if (store.getters['user'].user !== user) {
      store.commit('saveUserInfo', {user: validStatus.data.user});
    }
  }
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export const getAllReports = () => {
  return axios.post(`${ajaxHost}/fileList`);
}
