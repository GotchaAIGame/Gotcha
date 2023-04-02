import axios, { AxiosResponse } from "axios";
import {
  requestConfig,
  axiosInstance,
  newInstance,
  axiosInstancePython,
} from "./configs";

const responseBody = (response: AxiosResponse) => {
  // console.log(response);
  return response;
};

const requests = {
  get: (url: string, config?: requestConfig) =>
    axiosInstance.get(url, config).then(responseBody),

  post: (url: string, data: any, config?: requestConfig) =>
    axiosInstance.post(url, data, config).then(responseBody),

  put: (url: string, data: any, config?: requestConfig) =>
    axiosInstance.put(url, data, config).then(responseBody),

  delete: (url: string, config?: requestConfig) =>
    axiosInstance.delete(url, config).then(responseBody),

  postPython: (url: string, data: any, config: requestConfig) =>
    axiosInstancePython.post(url, data, config).then(responseBody),

  // Creator Token 검증
  authGet: (url: string, config?: requestConfig) =>
    newInstance.get(url, config).then(responseBody),
  authPost: (url: string, data: any, config?: requestConfig) =>
    newInstance.post(url, data, config).then(responseBody),
  authPut: (url: string, data: any, config?: requestConfig) =>
    newInstance.put(url, data, config).then(responseBody),
  authDelete: (url: string, config?: requestConfig) =>
    newInstance.delete(url, config).then(responseBody),
};

export default requests;
