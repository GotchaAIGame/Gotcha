import axios, { AxiosResponse } from "axios";
import axiosInstance, { requestConfig } from "./configs";

const responseBody = (response: AxiosResponse) => {
  return response.data;
};

const requests = {
  get: (url: string, config: requestConfig) =>
    axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
