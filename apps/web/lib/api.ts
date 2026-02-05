import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let queue: (() => void)[] = [];

const processQueue = () => {
  queue.forEach((cb) => cb());
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // ignore refresh endpoint itself
    if (originalRequest.url?.includes('/auth/refresh')) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push(() => resolve(api(originalRequest)));
        });
      }

      try {
        isRefreshing = true;
        await api.post('/auth/refresh');
        processQueue();
        return api(originalRequest);
      } catch (refreshErr) {
        if (originalRequest.url?.includes('/users/me')) {
          return Promise.reject(err);
        }

        if (!window.location.pathname.startsWith('/auth/')) {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);
