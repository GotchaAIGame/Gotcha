/* eslint-disable */

import Loading from "@components/common/Loading";
import { setLogin } from "@stores/users/userSlice";
import { memberAPI } from "@apis/apis";
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

export default function SocialLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["refreshToken"]);
  const [snsUser, setSnsUser] = useState<ISNSUser>();

  const snsLogin = async () => {
    // useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const registrationId = params.get("registrationId") || "";
    const accessToken = params.get("access_token") || "";

    console.log(registrationId);
    console.log(accessToken);

    memberAPI
      .socialLogin(accessToken, registrationId)
      .then((res) => {
        console.log(res);
        setSnsUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // Loading 컴포넌트 등록 해제 로직
      });
  };

  useEffect(() => {
    console.log("여기");
    snsLogin();
  }, []);

  return <Loading />;
}
