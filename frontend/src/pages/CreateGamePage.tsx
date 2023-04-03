import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InputGameInfo from "@components/CreateGame/InputGameInfo";
import GameCardCarousel from "@components/CreateGame/GameCardCarousel";
import helpButton from "@assets/helpButton.svg";
import Button from "@components/common/Button";
import Loading from "@components/common/Loading";
import CreateGameTutorialPage from "@pages/CreateGameTutorialPage";
import GlobalNavbar from "@components/common/GlobalNavbar";
import "@styles/CreateGamePage.scss";
import { creatorAPI } from "@apis/apis";
import { resetGame } from "@stores/game/gameSlice";
import { setLoading } from "@stores/loading/loadingSlice";

export default function CreateGamePage() {
  const [needHelp, setNeedHelp] = useState<boolean>(true);
  const gameInfo = useSelector((state: any) => state.game);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading);

  const tempHelperHandler = () => {
    setNeedHelp(!needHelp);
  };

  const postGameCreate = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    console.log("최종적으로 쏘는 정보");
    console.log(gameInfo);
    // const problemLength = gameInfo.problems.length();

    // 제목, 기간, 정보 입력 여부 확인
    if (
      gameInfo.title &&
      gameInfo.startTime &&
      gameInfo.endTime &&
      gameInfo.eventDesc &&
      gameInfo.problems.length > 0
    ) {
      // 문제 중 마지막 미입력값 배열이 있으면 제거
      const result = creatorAPI.createGameRoom(gameInfo);
      dispatch(setLoading(true));
      result
        .then((res) => {
          // 보내는 정보
          console.log("보낸거");
          console.log(gameInfo);
          console.log(res, "됐다");
          // 성공적으로 생성했다면 slice내용 비우기
          dispatch(resetGame());
          const gamePin = res.data.result.code;
          const roomId = res.data.result.id;
          dispatch(setLoading(false));

          navigate(`/custom/${gamePin}`, { state: { roomId } });
        })
        .catch((res) => {
          dispatch(setLoading(false));
          alert("내용을 입력해 주세요");
        });
    } else {
      dispatch(setLoading(false));
      alert("내용을 입력해 주세요");
    }
  };

  return (
    <div>
      <GlobalNavbar />
      {isLoading.loading && <Loading />}
      <Grid container className="create-game-grid-container">
        {needHelp ? (
          <Grid item xs={11} md={9}>
            <CreateGameTutorialPage tempHelperHandler={tempHelperHandler} />
          </Grid>
        ) : (
          <Grid item xs={11} md={9}>
            <InputGameInfo />
            <GameCardCarousel />
            <Button text="생성" onClick={postGameCreate} />
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
        )}
      </Grid>
    </div>
  );
}
