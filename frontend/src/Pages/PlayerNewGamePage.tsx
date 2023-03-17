import React from "react";
import { Link } from "react-router-dom";
import logo from "@assets/Gotcha.png";
import PlayerInfo from "@components/PlayerMain/PlayerInfo";
import '@styles/PlayerNewGamePage.scss';

export default function PlayerNewGamePage() {
  return (
    <div className="player-info-container">
      <header>
        <Link to="/">
          <img src={logo} alt="로고" />
        </Link>
      </header>
      <PlayerInfo />
    </div>
  );
}
