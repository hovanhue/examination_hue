import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

// url nào không nằm trong array thì sẽ refresh token
const routerNotRefreshed = ['/auth/login'];

export const baseURL = 'https://frontend-exam.digitalfortress.dev';

export const instanceAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instanceAxios.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('persist:auth') ?? '';

  // khi đăng nhập thì userInfo có kiểu string, những lần sau sẽ là object json
  const persist = typeof userInfo === 'string' ? JSON.parse(userInfo) : userInfo;
  const tokenInfo = typeof persist.token === 'object' ? persist.token : JSON.parse(persist.token);
  if (tokenInfo.access_token) {
    const modifiedConfig = { ...config };
    modifiedConfig.headers.Authorization = `Bearer ${tokenInfo.access_token}`;
    return modifiedConfig;
  }

  return config;
});

instanceAxios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;
    const persist = JSON.parse(localStorage.getItem('persist:auth') ?? '');
    const tokenInfo = JSON.parse(persist.token ?? '');
    // khi api bị lỗi 401
    if (
      error.response?.status === 401 &&
      !routerNotRefreshed.includes(originalRequest.url as string)
    ) {
      // kiểm tra có accessToken hoặc refreshToken khong
      if (!tokenInfo?.refreshToken || !tokenInfo?.access_token) {
        localStorage.setItem(
          'persist:auth',
          JSON.stringify({
            token: '',
            user: '',
          })
        );
      }
    }
    return Promise.reject(error);
  }
);
