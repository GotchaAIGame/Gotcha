/* eslint-disable */

import Button from "@components/common/Button";
import { setLogin } from "@stores/users/userSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

interface ISNSUser {
  id: number;
  email: string;
  nickname?: string;
  organization?: string;
  profileImage?: string;
  registrationId?: string;
  isLogin: boolean;
}

function KakaoButton() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [cookies, setCookie] = useCookies(["refreshToken"]);
  // const [snsUser, setSnsUser] = useState<ISNSUser>();

  // const snsClickHandler = () => {

  // };
  // useEffect(() => {
  //   const params = new URL(window.location.href).searchParams;

  //   console.log(params);
  //   if (nickname === "null" && email && registrationId) {
  //     dispatch(setLogin({ email, registrationId }));
  //     navigate("/signup");
  //   } else {
  //     dispatch(setLogin({ nickname, email, registrationId }));
  //     const accessToken = params.get("access");
  //     const refreshToken = params.get("refresh");

  //     sessionStorage.setItem("accessToken", accessToken);
  //     setCookie("refreshToken", refreshToken);
  //     navigate("/");
  //   }
  // }, []);

  return <Button text="카카오톡 로그인" color="kakao" />;
}

export default KakaoButton;
