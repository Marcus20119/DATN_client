import axios from 'axios';
import { Cookie } from './helpers';

export const myAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});

const createMyAxios = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  });

  instance.interceptors.request.use(
    config => {
      const accessToken = Cookie.get('accessToken');
      if (!config.headers['Authorization'] && accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    // Nếu không có lỗi thì chạy bình thường
    response => response,
    // Nếu trả về lỗi thì config lại để reset được access token
    async error => {
      // return new Promise(async resolve => {
      const originalRequest = error.config;
      // Nếu có lỗi và lỗi trả về là 403 thì gửi lại request yêu cầu reset access token
      if (error.response && error.response.status === 403) {
        const refreshToken = Cookie.get('refreshToken');
        const { data } = await myAxios.post('/auth/refresh-token', {
          refreshToken,
        });

        Cookie.set({
          cName: 'accessToken',
          cValue: data.newAccessToken,
          exDays: 7,
        });

        // Đổi lại headers và gọi lại request cữ
        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${data.newAccessToken}`;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const privateAxios = createMyAxios();
