import axios, { AxiosResponse } from "axios";
import axiosInstance, { requestConfig } from "./configs";

const responseBody = (response: AxiosResponse) => {
  // console.log(response);
  return response.data;
};

const requests = {
  get: (url: string, config: requestConfig) =>
    axiosInstance.get(url, config).then(responseBody),
  post: (url: string, config: requestConfig) =>
    axiosInstance.post(url, config).then(responseBody),
  put: (url: string, config: requestConfig) =>
    axiosInstance.put(url, config).then(responseBody),
  delete: (url: string, config: requestConfig) =>
    axiosInstance.delete(url, config).then(responseBody),
};

export default requests;
