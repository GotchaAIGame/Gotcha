import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";
import "./styles/CustomNavbar.scss";

export default function CustomNavbar() {
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);

  return (
    <header className="custom-nav-container">
      <h1>커스텀네브지롱</h1>
      <button type="button" style={{ backgroundColor: themeColor }}>
        테스트중입니다.
      </button>
      <img src={themeLogo} alt="로고" />
    </header>
  );
}
