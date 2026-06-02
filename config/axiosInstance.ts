import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://bamjiye-agent-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 20000,
});

export default axiosInstance;
