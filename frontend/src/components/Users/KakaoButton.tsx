import Button from "@components/common/Button";
import React from "react";

export default function KakaoButton() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:3000/kakologin";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return <Button text="카카오톡 로그인" color="kakao" onClick={kakoLogin} />;
}
