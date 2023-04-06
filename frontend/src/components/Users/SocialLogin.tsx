/* eslint-disable */

import Loading from "@components/common/Loading";
import { setLogin } from "@stores/users/userSlice";
import { memberAPI } from "@apis/apis";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
// 회원가입 성공시 /edit으로 이동

export default function SocialLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["refreshToken"]);
  const [registrationId, setRegistrationId] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRegistrationId(params.get("registrationId") || "");
    setAccessToken(params.get("access_token") || "");
  }, []);

  useEffect(() => {
    console.log("registrationId: ", registrationId);
    console.log("accessToken: ", accessToken);

    if (accessToken && registrationId) {
      memberAPI
        .socialLogin(accessToken, registrationId)
        .then((res) => {
          console.log(res.data.result);
          const snsUserInfo = res.data.result;
          const { nickname } = res.data.result;
          console.log(nickname);
          // Store에 user 정보 저장
          dispatch(setLogin(snsUserInfo));

          // token 저장
          const { accessToken, refreshToken } = snsUserInfo;
          sessionStorage.setItem("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);

          alert(`${nickname}님 환영합니다!`);
          navigate("/mypage");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accessToken, registrationId]);

  return <Loading />;
}
