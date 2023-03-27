import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@assets/logo.svg";

export default function Navbar() {
  // nav 가릴 주소
  // 추후 가릴 페이지가 많아지면, router로 가리기
  // 해당 링크 참고: https://changmin.tistory.com/40
  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  if (location.pathname === "/newgame") {
    return null;
  }
  if (location.pathname === "/rejoin") {
    return null;
  }
  if (location.pathname === "/game/1/rank") {
    return null;
  }
  return (
    <header className="app-main-header">
      {/* 게임 생성 페이지에서는 로고를 생략합니다. */}
      {location.pathname !== "/create/game" && (
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      )}
    </header>
  );
}
