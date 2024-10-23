import axios from "axios";
import { useAuthStore } from "../../store/authStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: any) => response.data,
  (error) => {
    if (error.response.status === 401) {
      const clearToken = useAuthStore.getState().clearToken;
      clearToken();
      // window.location.href = "/login";
      if (error.config.redirectCallback) {
        error.config.redirectCallback();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
