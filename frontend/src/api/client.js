import axios from "axios";
import { storage } from "../utils/storage";

let apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
apiUrl = apiUrl.replace(/\/$/, "");
if (!apiUrl.endsWith("/api")) {
  apiUrl += "/api";
}

const client = axios.create({
  baseURL: apiUrl,
});

client.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error?.response?.data?.message || "Request failed")
);

export { client };
