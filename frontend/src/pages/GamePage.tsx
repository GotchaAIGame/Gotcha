import React, { useState, useEffect } from "react";
import "@styles/GamePage.scss";
import { Grid } from "@mui/material";
import Timer from "@components/Game/Timer";
import ProblemCardList from "@components/Game/ProblemCardList";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "@components/common/CustomNavbar";
import Button from "@components/common/Button";
import { useAppSelector } from "@stores/storeHooks";
import { gamePlayAPI } from "@apis/apis";

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [locationState, _] = useState(location.state);
  const { solved } = useAppSelector((state) => state.gamePlay);

  useEffect(() => {
    // validation check
    // if (!locationState) {
    //   alert("정상적인 접근이 아닙니다.");
    //   navigate("/");
    // } else {
    //   // 정보 받아오기
    // }
  }, []);

  console.log(locationState);

  const gameEndHandler = () => {
    const { roomId, nickname } = locationState;
    const endTime = new Date(Date.now()).toISOString();

    let solvedCnt = 0;
    solved.forEach((item) => {
      if (item.solved) {
        solvedCnt += 1;
      }
    });

    gamePlayAPI.clear(roomId, nickname, solvedCnt, endTime);

    localStorage.removeItem("curUserInfo");
    localStorage.removeItem("solved");
    navigate("/");
    alert("고생하셨습니다.");
  };

  return (
    <>
      <CustomNavbar />
      <Grid container className="gamepage-container">
        <Grid item xs={11} md={9} className="gamepage-item">
          {/* <ProblemTitle /> */}
          <Timer />
          <ProblemCardList />
        </Grid>
      </Grid>
      <Button text="게임 종료" onClick={gameEndHandler} />
    </>
  );
}
