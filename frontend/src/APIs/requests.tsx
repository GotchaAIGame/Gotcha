import axios, { AxiosResponse } from "axios";

// setting base URL
axios.defaults.baseURL =
  "https://5710eb1b-27e6-408a-9a33-ee51d3f7737d.mock.pstmn.io";

// define methods

const responseBody = (response: AxiosResponse) => {
  return response.data;
};

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
