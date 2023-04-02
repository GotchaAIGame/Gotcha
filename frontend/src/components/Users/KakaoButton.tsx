import Button from "@components/common/Button";
import axios from "axios";
import React, { MouseEvent, useEffect } from "react";

export default function KakaoButton() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "https://j8a602.p.ssafy.io/login/oauth2/code/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const BASE_URL = "https://j8a602.p.ssafy.io";

  const kakaoLogin = () => {
    window.open(KAKAO_AUTH_URL, "_self");
    console.log("카카오 로그인");

    useEffect(() => {
      // window.location.href =
      //   "https://j8a602.p.ssafy.io/login/oauth2/code/kakao";
      const url = new URL(window.location.href);
      const params = new URL(window.location.href).searchParams;
      console.log(params);
      console.log(url);
    });
  };

  return <Button text="카카오톡 로그인" color="kakao" onClick={kakaoLogin} />;
}
