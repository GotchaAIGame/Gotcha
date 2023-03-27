import axios from "axios";

export interface requestConfig {
  params?: object;
  data?: object;
  headers?: object;
}

const axiosInstance = axios.create({
  baseURL: "https://j8a602.p.ssafy.io/api/",
});

export default axiosInstance;
