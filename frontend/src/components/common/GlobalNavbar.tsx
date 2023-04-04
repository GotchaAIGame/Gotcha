import React from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";
import "./styles/GlobalNavbar.scss";
import Hambugerbar from "./Hambugerbar";

export default function GlobalNavbar() {
  // nav 가릴 주소
  // 추후 가릴 페이지가 많아지면, router로 가리기
  // 해당 링크 참고: https://changmin.tistory.com/40

  return (
    <>
      <Hambugerbar />
      <header className="global-nav-header">
        {/* 게임 생성 페이지에서는 로고를 생략합니다. */}
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </header>
    </>
  );
}
