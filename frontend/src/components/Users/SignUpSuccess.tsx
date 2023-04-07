import Button from "@components/common/Button";
import React from "react";
import { Link } from "react-router-dom";
import "@styles/SignUpPage.scss";
import GlobalNavbar from "@components/common/GlobalNavbar";
import Hambugerbar from "@components/common/Hambugerbar";

export default function SignUpSuccess() {
  return (
    <>
      <Hambugerbar />
      <GlobalNavbar />
      <div className="signup-success-container">
        <div>
          <h3>가입 완료!</h3>
          <p>
            커스텀할 수 있는 나만의 AI서비스, Gotcha! <br />와 함께 즐거운 시간
            보내세요.
          </p>
        </div>
        <Link to="/login">
          <Button type="button" color="lime" text="로그인하러 가기" />
        </Link>
      </div>
    </>
  );
}
