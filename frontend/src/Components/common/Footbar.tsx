import React from "react";
import { useLocation } from "react-router-dom";
import "@styles/App.scss"

export default function Footbar() {
  // foorbar 가릴 주소
  const location = useLocation();

  // 새게임페이지
  if (location.pathname === "/newgame") {
    return null;
  }
  // 재참여페이지
  if (location.pathname === "/rejoin") {
    return null;
  }

  return (
    <div className="app-main-footer">
      <p>
        SAMSUNG Software Academy // A602 Gotcha! @Taegyu @Yezi @Minsu @Dasom
        @Veomchan @Qyuonii
      </p>
    </div>
  );
}
