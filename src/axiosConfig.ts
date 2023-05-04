import axios from 'axios';
import { Cookie } from './helpers';
import { forceSignOut } from './store/store';
// import store from './store/store';

// const { dispatch } = store;

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
      const access_token = Cookie.get('access_token');
      if (!config.headers['Authorization'] && access_token) {
        config.headers['Authorization'] = `Bearer ${access_token}`;
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
      // Nếu khi gọi request mà phát hiện người dùng đã bị xóa thì sẽ logOut
      if (
        error?.response?.data?.message === 'User Not Found or is Deleted' ||
        error?.response?.data?.message === 'access_token is needed'
      ) {
        forceSignOut();
      } else if (error?.response?.status === 403) {
        try {
          // Nếu có lỗi và lỗi trả về là 403 thì gửi lại request yêu cầu reset access token
          const refresh_token = Cookie.get('refresh_token');
          const { data } = await myAxios.post('/auth/refresh-token', {
            refresh_token,
          });

          Cookie.set({
            cName: 'access_token',
            cValue: data.new_access_token,
            exDays: 7,
          });

          // Đổi lại headers và gọi lại request cữ
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${data.new_access_token}`;
          return instance(originalRequest);
        } catch (err: any) {
          console.log(err);
          // Nếu refresh token hết hạn thì logOut
          if (err?.response?.data?.message === 'refreshToken not found') {
            forceSignOut();
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const privateAxios = createMyAxios();
