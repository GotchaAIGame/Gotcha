/* eslint-disable */

import Loading from "@components/common/Loading";
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

// 회원가입 성공시 /edit으로 이동

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["refreshToken"]);
  const [snsUser, setSnsUser] = useState<ISNSUser>();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;

    console.log(params);
    // const nickname = decodeURIComponent(params.get("nickname"));
    // const email = params.get("email");
    // const registrationId = params.get("registrationId");

    // if (email && registrationId) {
    //   dispatch(setLogin({ email, registrationId }));
    //   navigate("/signup");
    // } else {
    //   dispatch(setLogin({ nickname, email, registrationId }));
    //   const accessToken = params.get("access");
    //   const refreshToken = params.get("refresh");

    //   sessionStorage.setItem("accessToken", accessToken);
    //   setCookie("refreshToken", refreshToken);
    //   navigate("/");
    // }
  }, []);

  return <Loading />;
};

export default SocialLogin;
