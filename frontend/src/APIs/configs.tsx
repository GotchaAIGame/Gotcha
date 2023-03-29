import axios from "axios";

export interface requestConfig {
  params?: object;
  headers?: object;
}

const axiosInstance = axios.create({
  baseURL: "https://j8a602.p.ssafy.io/api/",
});

const newInstance = axios.create({
  baseURL: "https://j8a602.p.ssafy.io/api/",
});

// 요청 헤더에 token 추가
newInstance.interceptors.request.use((config) => {
  console.log("interceptor request");
  const tempConfig = config;
  const accessToken = sessionStorage.getItem("accessToken");

  if (accessToken) {
    tempConfig.headers.Authorization = accessToken;
  } else {
    tempConfig.headers.Authorization = null;
  }
  return tempConfig;
});

// 응답 확인

export { axiosInstance, newInstance };
