import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InputGameInfo from "@components/CreateGame/InputGameInfo";
import GameCardCarousel from "@components/CreateGame/GameCardCarousel";
import helpButton from "@assets/helpButton.svg";
import Button from "@components/common/Button";
import CreateGameTutorialPage from "@pages/CreateGameTutorialPage";
import "@styles/CreateGamePage.scss";
import { creatorAPI } from "@apis/apis";

export default function CreateGamePage() {
  const [needHelp, setNeedHelp] = useState<boolean>(false);
  const gameInfo = useSelector((state: any) => state.game);
  const navigate = useNavigate();

  const tempHelperHandler = () => {
    setNeedHelp(!needHelp);
  };

  const postGameCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    console.log(gameInfo);
    // const problemLength = gameInfo.problems.length();

    // 제목, 기간, 정보 입력 여부 확인
    if (
      (gameInfo.title,
      gameInfo.startTime,
      gameInfo.endTime,
      gameInfo.description,
      gameInfo.problems[0].image)
    ) {
      // 문제 중 마지막 미입력값 배열이 있으면 제거
      const result = creatorAPI.createGameRoom(gameInfo);
      result
        .then((res) => {
          console.log(res, "됐다");
          navigate("/creator");
        })
        .catch((res) => {
          console.log(res, "안됐다");
        });
    } else {
      alert("내용을 입력해 주세요");
    }
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
      <Button text="생성" onClick={postGameCreate} />
    </div>
  );
}