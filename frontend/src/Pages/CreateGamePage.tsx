import React from "react";
import InputGameInfo from "../Components/CreateGame/InputGameInfo";
import GameCardCarousel from "../Components/CreateGame/GameCardCarousel";
import "../Styles/CreateGamePage.scss";

export default function CreateGamePage() {
  return (
    <div>
      <InputGameInfo />
      <GameCardCarousel />
    </div>
  );
}
