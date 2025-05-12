import { BASE_API } from "@/constants";
import axios from "axios";

const http = axios.create({
  baseURL: BASE_API,
});

// Interceptor: añade JWT de LocalStorage en cada petición
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
