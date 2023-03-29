import React from "react";
import { Link } from "react-router-dom";
import NewPlayerInfo from "@components/PlayerMain/NewPlayerInfo";
import logo from "@assets/logo.svg";
import "@styles/PlayerNewGamePage.scss";

export default function PlayerNewGamePage() {
  return (
    <div className="player-info-container">
      <header>
        <Link to="/">
          <img className="logo-img" src={logo} alt="로고" />
        </Link>
      </header>
      <NewPlayerInfo />
    </div>
  );
}
