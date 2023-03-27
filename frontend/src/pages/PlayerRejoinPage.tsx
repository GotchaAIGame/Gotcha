import React from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";
import RejoinPlayerInfo from "@components/PlayerMain/RejoinPlayerInfo";
import "@styles/PlayerNewGamePage.scss";

export default function PlayerRejoinPage() {
  return (
    <div className="player-info-container">
      <header>
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
      </header>
      <RejoinPlayerInfo />
    </div>
  );
}
