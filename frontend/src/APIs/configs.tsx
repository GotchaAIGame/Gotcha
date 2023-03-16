import axios from "axios";

export interface requestConfig {
  params?: {};
  data?: {};
  headers?: {};
}

const axiosInstance = axios.create({
  baseURL: "https://5710eb1b-27e6-408a-9a33-ee51d3f7737d.mock.pstmn.io",
});

export default axiosInstance;
