import axios, { AxiosHeaders } from "axios";

export interface requestConfig {
  params?: object;
  headers?: object;
  encType?: string;
}

const axiosInstance = axios.create({
  baseURL: "https://j8a602.p.ssafy.io/api/",
});

const axiosInstancePython = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // 바꿔야함 (invalid 뜰 경우 https인지 확인할 것)
});

export { axiosInstance, axiosInstancePython };
