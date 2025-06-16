import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Constants from "expo-constants";
import { ApiError } from "../types/api";

const API_URL = Constants.expoConfig?.extra?.apiUrl || "http://localhost:8080";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    if (error.response) {
      // Spring 서버에서 반환하는 에러 처리
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 인증 에러 처리
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          // 권한 에러 처리
          break;
        case 404:
          // 리소스 없음 처리
          break;
        case 500:
          // 서버 에러 처리
          break;
      }

      return Promise.reject(data);
    }

    return Promise.reject(error);
  }
);
