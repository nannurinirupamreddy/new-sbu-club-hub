import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sbu-clubhub-tracker.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
