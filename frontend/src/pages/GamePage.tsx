import React, { useState, useEffect } from "react";
import { useAppSelector } from "@stores/storeHooks";
import "@styles/GamePage.scss";
import { Grid } from "@mui/material";
import ProblemTitle from "@components/Game/ProblemTitle";
import Timer from "@components/Game/Timer";
import ProblemCardList from "@components/Game/ProblemCardList";
import { useLocation, useNavigate } from "react-router-dom";

export default function GamePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [locationState, _] = useState(location.state);
  const { solved, problems } = useAppSelector((state) => state.gamePlay);

  const roomTitle = "같은 것을 찾아라 같챠!";

  useEffect(() => {
    // validation check
    // if (!locationState) {
    //   alert("정상적인 접근이 아닙니다.");
    //   navigate("/");
    // } else {
    //   // 정보 받아오기
    // }
  }, []);

  return (
    <Grid container className="gamepage-container">
      <Grid item xs={11} md={9} className="gamepage-item">
        <ProblemTitle />
        <Timer />
        <button
          type="button"
          onClick={() => {
            console.log({ problems });
          }}
        >
          상태 확인
        </button>
        <ProblemCardList />
      </Grid>
    </Grid>
  );
}
