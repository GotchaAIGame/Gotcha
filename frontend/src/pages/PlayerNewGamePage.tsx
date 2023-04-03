import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import NewPlayerInfo from "@components/PlayerMain/NewPlayerInfo";
import "@styles/PlayerNewGamePage.scss";

export default function PlayerNewGamePage() {
  const location = useLocation();
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);

  return (
    <div
      className="player-info-container"
      style={{ backgroundColor: themeColor }}
    >
      <header>
        <Link to="/">
          <div className="logo-img">
            <img src={themeLogo} alt="로고" />
          </div>
        </Link>
      </header>
      <NewPlayerInfo
        roomPin={location.state.inputPin}
        roomId={location.state.room}
      />
    </div>
  );
}
