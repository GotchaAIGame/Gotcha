import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@assets/logo.svg";
import "./styles/GlobalNavbar.scss";

/* 추후 커스텀 네브바를 전역으로 바꾸고, 글로벌 네브바가 필요한 부분에만 적용할 것!!! */

export default function GlobalNavbar() {
  // nav 가릴 주소
  // 추후 가릴 페이지가 많아지면, router로 가리기
  // 해당 링크 참고: https://changmin.tistory.com/40
  const location = useLocation();

  let hasLogo = true;
  if (
    location.pathname === "/create/game" ||
    location.pathname.startsWith("/edit")
  )
    hasLogo = false;

  return (
    <header className="global-nav-header">
      {/* 게임 생성 페이지에서는 로고를 생략합니다. */}
      <Link to="/">{hasLogo ? <img src={logo} alt="logo" /> : ""}</Link>
    </header>
  );
}
