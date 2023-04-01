import React from "react";
import { Link } from "react-router-dom";
import LogIn from "@components/Users/LogIn";
import "@styles/LogInPage.scss";
import banner from "@assets/TopBanner.svg";
import logo from "@assets/logo.svg";
import SNSLogin from "@components/Users/SNSLogin";

export default function LogInPage() {
  return (
    <div className="login-page-container">
      <div className="top-banner">
        <img src={banner} alt="" />
      </div>

      {/* 로고 이미지는 차후 커스텀 이미지로 변경할 예정 */}
      <Link to="/">
        <img src={logo} alt="" className="login-banner" />
      </Link>
      <div className="login-inputs-container">
        <LogIn />
        <SNSLogin />
      </div>
    </div>
  );
}
