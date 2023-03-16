import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiClient {
  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
}

const apiClient: ApiClient = axios.create({
  baseURL: "https://5710eb1b-27e6-408a-9a33-ee51d3f7737d.mock.pstmn.io", // mock server url
});

export default apiClient;
