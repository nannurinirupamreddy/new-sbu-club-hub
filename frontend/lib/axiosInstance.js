import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sbu-clubhub-tracker.onrender.com/api",
  // baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

export default axiosInstance;
