import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://chlothzy-backend.onrender.com",  // ← your actual Render URL
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

export default api;
