import React, { useState } from "react";
import { Grid } from "@mui/material";
import InputGameInfo from "@components/CreateGame/InputGameInfo";
import GameCardCarousel from "@components/CreateGame/GameCardCarousel";
import helpButton from "@assets/helpButton.svg";
import CreateGameTutorialPage from "./CreateGameTutorialPage";
import "@styles/CreateGamePage.scss";

export default function CreateGamePage() {
  const [needHelp, setNeedHelp] = useState<boolean>(false);

  const tempHelperHandler = () => {
    setNeedHelp(!needHelp);
  };

  return (
    <div>
      <Grid container className="create-game-grid-container">
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
        <button
          type="button"
          onClick={tempHelperHandler}
          className="helper-button"
        >
          <img
            src={helpButton}
            alt="helper"
            title="도움말을 보시려면 클릭하세요"
          />
        </button>
      </Grid>
    </div>
  );
}
