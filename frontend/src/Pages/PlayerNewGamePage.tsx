import React from "react";
import { Link } from "react-router-dom";
import logo from "@assets/Gotcha.png";
import PlayerInfo from "@components/PlayerMain/PlayerInfo";

export default function PlayerNewGamePage() {
  return (
    <>
      <header>
        <Link to="/">
          <img src={logo} alt="" className="login-banner" />
        </Link>
      </header>
      <PlayerInfo />
    </>
  );
}
