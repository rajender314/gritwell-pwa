import axios from 'axios';
import {clearLocalStorage, getLocalStorage} from '../core/localStorageService';

const token = getLocalStorage('gritwell_client_access_token');
const Http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // 'Authorization':  token
  },
  withCredentials: true,
  responseType: 'json',
});
Http.interceptors.request.use(
    (config) => {
      if (token) {
        // config.headers.Authorization = token;
      } else {
        delete Http.defaults.headers.common.Authorization;
      }
      return config;
    },
    (error) => Promise.reject(error),
);

Http.interceptors.response.use(
    (response) => {
      const responseCode = response.data.status_code;
      const statusCode = responseCode ? responseCode : '';
      if (statusCode === 403) {
        clearLocalStorage();
        sessionStorage.clear();
        // window.location.reload();
      }
      return response;
    },
    (error) => {
      if (error.response.status === 403 || error.response.status === 401) {
        clearLocalStorage();
        sessionStorage.clear();
        window.location.replace(process.env.REACT_APP_HOMEPAGE +'sign-up');
      }
      Promise.reject(error);
    },
);
export default Http;
