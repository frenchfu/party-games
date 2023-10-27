import axios from 'axios';
import { tip } from './utilities';

// Request failed with status code
const errorHandle = (status, message) => {
  switch (status) {
    // 400: 未認證，或可能是帳號或密碼錯誤
    case 400:
      tip(message);
      break;
    // 401: 登入失敗，可能是帳號或密碼錯誤
    case 401:
      tip('連線逾時，請重新登入');
      alert('連線逾時，請重新登入');
      // 跳轉至登入頁
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('persist:root');
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('no')
      window.location = (`${window.location.origin}/party-games`);
      break;
    case 402:
      tip('遊戲已重啟 請重新報名');
      alert('遊戲已重啟 請重新報名');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('persist:root');
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('no')
      window.location = (`${window.location.origin}/party-games`);
      break;            
    case 403:
    case 406:   
     alert("權限錯誤");
     break;
    // case 404:
    // 其它錯誤
    default:
      console.log(`未攔截到的錯誤：${message}`);
  }
}

// Axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_URL
});



// request interceptors
instance.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem('token');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject();
  }
);

// response interceptors
instance.interceptors.response.use(
  (response) => {
    if(!!response){//如果有返回  reflashToken 就用新的
      if(!!response.data){
        if(!!response.data.reflashToken){
          sessionStorage.setItem("jwtKey", response.data.reflashToken);
        }
      }
    }
    return response
  },
  (error) => {
    const { response } = error;

    if (response) {
      // 成功發出 request 且收到 response，但有 error
      errorHandle(response.status, response.data.error);
      return Promise.reject(error);
    } else {
      // 成功發出 request 但沒收到 response
      if (!window.navigator.onLine) {
        // 如果是網路連線問題
        tip('網路異常，請重新連線後再重新整理頁面');
      } else {
        // 其它問題，例如跨域或程式問題
        return Promise.reject(error);
      }
    }
  }
)

export const cyproPlugin = axios.create({
  baseURL: 'https://localhost:9991',
  headers: { 'Content-Type': 'text/plain' }
});

export const cyproChtPlugin = axios.create({
  baseURL: 'http://localhost:61161',
  headers: { 'Content-Type': 'text/plain' }
});

export default instance;
