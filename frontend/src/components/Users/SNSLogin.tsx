/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import Button from "@components/common/Button";
import GoogleButton from "./GoogleButton";
import KakaoButton from "./KakaoButton";

export default function SNSLogin() {
  return (
    <div className="social-logins-container">
      <div className="social-login-title">
        <hr />
        <h5>SNS 로그인 / 회원가입</h5>
        <hr />
      </div>

      <a href="https://j8a602.p.ssafy.io/oauth2/authorization/google">
        <Button text="구글 로그인" color="google" />
      </a>
      <a href="https://j8a602.p.ssafy.io/oauth2/authorization/kakao">
        <Button text="카카오톡 로그인" color="kakao" />
      </a>
      <Link to="/signup">
        <Button text="회원가입" color="skyblue" />
      </Link>
    </div>
  );
}
