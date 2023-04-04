import React from "react";
import { useLocation } from "react-router-dom";
import "@styles/App.scss";

export default function Footbar() {
  // foorbar 가릴 주소
  const location = useLocation();

  // 새게임페이지
  if (
    location.pathname.startsWith("/newgame") ||
    location.pathname.startsWith("/rejoin") ||
    location.pathname === "/main"
  ) {
    return null;
  }

  return <div className="app-main-footer" />;
}
