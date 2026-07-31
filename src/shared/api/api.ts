import { AuthService } from "@/features/auth/model/auth.service";
import axios from "axios";

const authService = new AuthService();

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      !originalRequest ||
      // originalRequest.url?.includes("/auth/refresh") ||
      error.response?.status !== 401 ||
      originalRequest._retry ||
      error.response?.data.code === "NO_SESSION"
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;

      refreshPromise = authService.refresh().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    try {
      await refreshPromise;
      return api(originalRequest);
    } catch (e) {
      await authService.logout();
      return Promise.reject(e);
    }
  },
);
