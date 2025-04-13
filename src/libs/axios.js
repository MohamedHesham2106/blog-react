import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const requiresAuth = (url) => {
  const protectedRoutes = ["/blog"];
  return protectedRoutes.some((route) => url.includes(route));
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (
      token &&
      requiresAuth(config.url) &&
      ["post", "put", "patch"].includes(config.method.toLowerCase())
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
