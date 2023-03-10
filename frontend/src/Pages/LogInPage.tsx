import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Gotcha.png";
import "../Styles/LogInPage.scss";

export default function LogInPage() {
  // 추후 유효성 검사 이후 페이지 이동되게 수정 예정

  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/creator");
  };

  return (
    <div className="login-page-container">
      <Link to="/">
        <img src={logo} alt="logo" className="logo-img" />
      </Link>
      <div className="login-inputs-container">
        <form action="submit" onSubmit={loginHandler}>
          <input type="text" placeholder="ID" />
          <input type="password" placeholder="PW" />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}
