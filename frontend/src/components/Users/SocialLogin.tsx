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

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["refreshToken"]);
  const [snsUser, setSnsUser] = useState<ISNSUser>();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;

    console.log(params);
    // if (nickname === "null" && email && registrationId) {
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
