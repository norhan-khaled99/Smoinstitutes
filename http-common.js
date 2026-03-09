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
    const isAuthTokenEndpoint =
      error.config &&
      (error.config.url || "").includes("/api/v1/auth/token");

    if (error.response) {
      const { status } = error.response;

      if (status === 400) {
        Notify.create({
          type: "negative",
          position: "bottom-right",
          message: "Validation error",
        });
      } else if (status === 403) {
        Notify.create({
          type: "negative",
          position: "bottom-right",
          message: "Permission denied",
        });
      } else if (status === 404) {
        Notify.create({
          type: "negative",
          position: "bottom-right",
          message: "Object not found",
        });
      } else if (status === 500) {
        Notify.create({
          type: "negative",
          position: "bottom-right",
          message: "Server error",
        });
      } else if (status === 401 && !isAuthTokenEndpoint) {
        localStorage.clear();
        window.location.href = "/ui/login";
        Notify.create({
          type: "negative",
          position: "bottom-right",
          message: "Check your Authentication",
        });
      }
    }

    return Promise.reject(error);
  },
);
