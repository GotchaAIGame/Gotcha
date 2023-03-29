import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import InputGameInfo from "@components/CreateGame/InputGameInfo";
import GameCardCarousel from "@components/CreateGame/GameCardCarousel";
import helpButton from "@assets/helpButton.svg";
import Button from "@components/common/Button";
import CreateGameTutorialPage from "@pages/CreateGameTutorialPage";
import "@styles/CreateGamePage.scss";
import { creatorAPI } from "@apis/apis";

export default function CreateGamePage() {
  const [needHelp, setNeedHelp] = useState<boolean>(false);

  const tempHelperHandler = () => {
    setNeedHelp(!needHelp);
  };

  const tempPost = () => {
    const result = creatorAPI.createGameRoom();
    result
      .then((res) => {
        console.log(res, "됐다");
      })
      .catch((res) => {
        console.log(res, "안됐다");
      });
  };

  return (
    <div>
      <button type="button" onClick={tempPost}>
        {" "}
        post확인
      </button>
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
      <Link to="/custom/game">
        <Button text="다음" />
      </Link>
    </div>
  );
}
