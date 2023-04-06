import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RejoinPlayerInfo from "@components/PlayerMain/RejoinPlayerInfo";
import "@styles/PlayerNewGamePage.scss";

export default function PlayerRejoinPage() {
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);
  return (
    <div
      className="player-info-container"
      style={{ backgroundColor: themeColor }}
    >
      <header>
        <Link to="/">
          <div className="rejoin-page-logo-img">
            <img src={themeLogo} alt="로고" />
          </div>
        </Link>
      </header>
      <RejoinPlayerInfo />
    </div>
  );
}
