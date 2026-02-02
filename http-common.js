import axios from "axios";
import apiConfigs from "src/config/api";
import { Notify } from "quasar";

function createAxiosInstance() {
  const token = localStorage.getItem("accessToken");

  const instance = axios.create({
    baseURL: apiConfigs.baseURL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  instance.interceptors.request.use((req) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  return instance;
}

export const axiosInstance = createAxiosInstance();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      Notify.create({
        type: "negative",
        position: "bottom-right",
        message: "Check your Authentication",
      });
    }
    return Promise.reject(error);
  }
);
