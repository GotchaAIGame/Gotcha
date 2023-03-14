import React from "react";
import InputGameInfo from "@components/CreateGame/InputGameInfo";
import GameCardCarousel from "@components/CreateGame/GameCardCarousel";
import "@styles/CreateGamePage.scss";

export default function CreateGamePage() {
  return (
    <div>
      <InputGameInfo />
      <GameCardCarousel />
    </div>
  );
}
