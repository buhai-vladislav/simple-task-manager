import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = 'http://localhost:4000/';
axiosClient.defaults.headers['Content-Type'] = 'application/json';
axiosClient.defaults.headers['Accept'] = 'application/json';

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor for the refetching access and refresh tokens on 401 error.
axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    if (
      originalConfig.url !== '/auth/signin' &&
      originalConfig.url !== '/users/myself' &&
      err.response
    ) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const token = localStorage.getItem('refresh-token');
          const response = await axios.post(
            `http://localhost:4000/auth/token-pair/${token}`,
          );
          const { data } = response;
          localStorage.setItem('access-token', data.accessToken);
          localStorage.setItem('refresh-token', data.refreshToken);
          return axiosClient(originalConfig);
        } catch (error) {
          localStorage.clear();
          window.location.href = `${window.location.origin}/login`;
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(err);
  },
);

export default axiosClient;
