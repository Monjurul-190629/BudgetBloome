import { Config } from "@/config/settings";
import { useAuth } from "@/features/auth/store/auth.store";
import axios, { AxiosError, type AxiosResponse } from "axios";
const baseUrl = Config.BACKEND_URL;

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = useAuth?.getState()?.token;
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error?.response && error?.response?.status === 401) {
      const logOut = useAuth.getState()?.logOut;
      logOut();
    }

    return Promise.reject(error);
  },
);
