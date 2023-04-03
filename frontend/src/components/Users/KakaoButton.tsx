/* eslint-disable */

import Button from "@components/common/Button";
import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

// const KakaoButton: React.FC = () => {
// const navigate = useNavigate();
// const dispatch = useDispatch();
// const [cookies, setCookie] = useCookies(["refreshToken"]);

// useEffect(() => {
//   const params = new URL(window.location.href).searchParams;

//   console.log(params);
// const nickname = decodeURIComponent(params.get("nickname"));
// const email = params.get("email");
// const registrationId = params.get("registrationId");

// if (nickname === "null") {
//   dispatch(setPendingLogin({ email, registrationId }));
//   navigate("/signup");
// } else {
//   dispatch(setLogin({ nickname, email, registrationId }));
//   const accessToken = params.get("access");
//   const refreshToken = params.get("refresh");
//   sessionStorage.setItem("accessToken", accessToken);
//   setCookie("refreshToken", refreshToken);
//   navigate("/");
// }
// }, []);

function KakaoButton() {
  // const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  // const REDIRECT_URI = "https://j8a602.p.ssafy.io/login/oauth2/code/kakao";
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // const BASE_URL = "https://j8a602.p.ssafy.io";

  // const kakaoLogin = () => {
  //   window.open(KAKAO_AUTH_URL, "_self");
  //   useEffect(() => {
  //     const url = new URL(window.location.href);
  //     console.log(url);
  //     const code = url.searchParams.get("code");
  //     axios.post(`${BASE_URL}/oauth2/authorization/kakao`).then((res) => {
  //       console.log(res);
  //     });
  //   }, []);
  // };
  const params = useParams<{ token?: string }>();

  console.log(params);
  // useEffect(() => {
  // localStorage.clear();
  // localStorage.setItem("token", params.token ?? "");
  // window.location.replace("/");
  // }, []);

  return <Button text="카카오톡 로그인" color="kakao" />;
}

export default KakaoButton;
