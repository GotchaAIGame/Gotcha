import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NewPlayerInfo from "@components/PlayerMain/NewPlayerInfo";
import logo from "@assets/logo.svg";
import "@styles/PlayerNewGamePage.scss";

export default function PlayerNewGamePage() {
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);
  return (
    <div
      className="player-info-container"
      style={{ backgroundColor: themeColor }}
    >
      <header>
        <Link to="/">
          <img src={themeLogo} alt="로고" />
        </Link>
      </header>
      <NewPlayerInfo />
    </div>
  );
}
