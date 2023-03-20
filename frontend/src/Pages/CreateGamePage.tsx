import React from "react";
import { Grid } from "@mui/material";
import InputGameInfo from "@components/CreateGame/InputGameInfo";
import GameCardCarousel from "@components/CreateGame/GameCardCarousel";
import "@styles/CreateGamePage.scss";

export default function CreateGamePage() {
  return (
    <Grid container className="create-game-main-container">
      <Grid item xs={11} md={9}>
        <InputGameInfo />
        <GameCardCarousel />
      </Grid>
    </Grid>
  );
}
