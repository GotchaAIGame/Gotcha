import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Gotcha.png";

export default function Navbar() {
  // nav 가릴 주소
  // 추후 가릴 페이지가 많아지면, router로 가리기
  // 해당 링크 참고: https://changmin.tistory.com/40
  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  return (
    <header className="app-main-header">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          style={{ marginTop: "40px", width: "220px" }}
        />
      </Link>
    </header>
  );
}
