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
import Progressbar from "@components/CreateGame/Progressbar";
import Modal from "@components/common/Modal";

export default function CreateGamePage() {
  const [needHelp, setNeedHelp] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const gameInfo = useSelector((state: any) => state.game);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading);

  const tempHelperHandler = () => {
    setNeedHelp(!needHelp);
  };

  const postGameCreate = () => {
    // e.preventDefault();
    console.log("최종적으로 쏘는 정보");
    console.log(gameInfo);
    // const problemLength = gameInfo.problems.length();
    setModalOpen(false);
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
          alert("내용을 입력해주세요");
        });
    } else {
      dispatch(setLoading(false));
      alert("내용을 입력해주세요");
    }
  };

  const modalHandelr = () => {
    setModalOpen(true);
  };

  return (
    <div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          modalHandler={() => setModalOpen(false)}
          btnType="right-two"
          mainBtnHandler={postGameCreate}
        >
          <h5>게임을 생성하시겠습니까?</h5>
          <p>문제는 생성되면 수정할 수 없습니다.</p>
        </Modal>
      )}
      <GlobalNavbar />
      {isLoading.loading && <Loading />}
      <Grid container className="create-game-grid-container">
        <Grid item xs={11} md={8}>
          <Progressbar progress={1} />
          {needHelp && (
            <div className="create-main-box-container">
              <CreateGameTutorialPage tempHelperHandler={tempHelperHandler} />
            </div>
          )}
          <div className="create-main-box-container">
            <InputGameInfo />
            <GameCardCarousel />
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
          </div>
          <Button text="생성" onClick={modalHandelr} />
        </Grid>
      </Grid>
    </div>
  );
}
