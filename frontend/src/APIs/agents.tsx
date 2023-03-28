import axios, { AxiosResponse } from "axios";
import axiosInstance, { requestConfig } from "./configs";

const responseBody = (response: AxiosResponse) => {
  // console.log(response);
  return response;
};

const requests = {
  get: (url: string, config?: requestConfig) =>
    axiosInstance.get(url, config).then(responseBody),
  post: (url: string, data: any, config?: requestConfig) =>
    axiosInstance.post(url, data, config).then(responseBody),
  put: (url: string, data : any, config?: requestConfig) =>
    axiosInstance.put(url, data, config).then(responseBody),
  delete: (url: string, config?: requestConfig) =>
    axiosInstance.delete(url, config).then(responseBody),
};

export default requests;
