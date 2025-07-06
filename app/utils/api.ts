// app/utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,        // ← no fallback to localhost!
  headers: { "Content-Type": "application/json" },
});

export default api;
