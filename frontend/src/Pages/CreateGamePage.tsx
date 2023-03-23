import React, { useState } from "react";
import { Grid } from "@mui/material";
import InputGameInfo from "@components/CreateGame/InputGameInfo";
import GameCardCarousel from "@components/CreateGame/GameCardCarousel";
import CreateGameTutorialPage from "./CreateGameTutorialPage";
import "@styles/CreateGamePage.scss";

export default function CreateGamePage() {
  const [needHelp, setNeedHelp] = useState<boolean>(false);

  const tempHelperHandler = () => {
    setNeedHelp(!needHelp);
  };

  return (
    <div>
      <Grid container className="create-game-main-container">
        {needHelp ? (
          <Grid item xs={11} md={9}>
            <CreateGameTutorialPage />
          </Grid>
        ) : (
          <Grid item xs={11} md={9}>
            <InputGameInfo />
            <GameCardCarousel />
          </Grid>
        )}
      </Grid>
      <button
        type="button"
        onClick={tempHelperHandler}
        style={{ marginTop: "50px" }}
      >
        임시 도움말 버튼
      </button>
    </div>
  );
}
