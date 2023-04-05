/* eslint-disable */

import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function KakaoLogin() {
  useEffect(() => {
    // const params = useParams();

    useEffect(() => {
      localStorage.clear();
      // localStorage.setItem("token", params.token);
      window.location.replace("/main");
      console.log("렌더링!!!");
    }, []);
  }, []);
  return <div>KakaoLogin</div>;
}

// import Button from "@components/common/Button";
// import axios from "axios";
// import React, { useEffect } from "react";

// export default function KakaoButton() {
//   const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
//   const REDIRECT_URI = "https://j8a602.p.ssafy.io/login/oauth2/code/kakao";
//   const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
//   const BASE_URL = "https://j8a602.p.ssafy.io";

//   const kakaoLogin = () => {
//     window.open(KAKAO_AUTH_URL, "_self");
//     useEffect(() => {
//       const url = new URL(window.location.href);
//       console.log(url);
//       const code = url.searchParams.get("code");
//       // axios.post(`${BASE_URL}/oauth2/authorization/kakao`).then((res) => {
//       //   console.log(res);
//       // });
//     }, []);
//   };

//   return <Button text="카카오톡 로그인" color="kakao" onClick={kakaoLogin} />;
// }
