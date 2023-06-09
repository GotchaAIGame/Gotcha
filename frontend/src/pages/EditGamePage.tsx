import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InputGameInfo from "@components/EditGame/InputGameInfo";
import GameCardCarousel from "@components/EditGame/GameCardCarousel";
import helpButton from "@assets/questionButton.svg";
import Button from "@components/common/Button";
import CreateGameTutorialPage from "@pages/CreateGameTutorialPage";
import "@styles/CreateGamePage.scss";
import { creatorAPI } from "@apis/apis";
import {
  resetGame,
  setGame,
  setProblems,
  setOriginGame,
} from "@stores/game/gameSlice";
import { setTheme } from "@stores/player/themeSlice";
import GlobalNav from "@components/common/GlobalNavbar";
import Progressbar from "@components/CreateGame/Progressbar";
import Modal from "@components/common/Modal";
import Hambugerbar from "@components/common/Hambugerbar";

export default function EditGamePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [needHelp, setNeedHelp] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const gameInfo = useSelector((state: any) => state.game);
  const themeInfo = useSelector((state: any) => state.theme);
  const nickname = useSelector((state: any) => state.users.nickname);
  const location = useLocation();

  const { gamePin, roomId } = location.state;

  const tempHelperHandler = () => {
    setNeedHelp(!needHelp);
  };

  // 게임 수정 put 요청
  const putGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 제목, 기간, 정보 입력 여부 확인
    if (
      gameInfo.title &&
      gameInfo.startTime &&
      gameInfo.endTime &&
      gameInfo.eventDesc
    ) {
      // 수정할 값들
      const putInfo = {
        roomId,
        color: themeInfo.themeColor,
        logoImage: themeInfo.themeLogo,
        title: gameInfo.title,
        eventUrl: gameInfo.eventUrl,
        eventDesc: gameInfo.eventDesc,
        startTime: gameInfo.startTime,
        endTime: gameInfo.endTime,
      };
      const result = creatorAPI.putGameRoom(putInfo);
      result
        .then((res) => {
          // 보내는 정보
          // 성공적으로 생성했다면 slice내용 비우기
          navigate(`/custom/${gamePin}`, { state: { roomId, prevLoc : "edit" } });
          dispatch(resetGame());
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("내용을 입력해 주세요");
    }
  };

  useEffect(() => {
    // edit인 경우 gameSlice에 값 갱신
    if (roomId) {
      const result = creatorAPI.getGameDetail(roomId);
      result.then((res) => {
        const gotInfo = res.data.result;
        const newInfo = { ...gotInfo };
        newInfo.startTime = newInfo.startTime.slice(0, 16);
        newInfo.endTime = newInfo.endTime.slice(0, 16);
        dispatch(setOriginGame(newInfo));
        dispatch(setProblems(newInfo.problems));
        dispatch(
          setTheme({
            room: roomId,
            reward: gotInfo.hasReward,
            themeColor: gotInfo.color,
            themeLogo: gotInfo.logoUrl,
            themeTitle: gotInfo.title,
            eventDesc: gotInfo.eventDesc,
            eventUrl: gotInfo.eventUrl,
          })
        );
      });
    }
  }, []);

  const deleteGame = () => {
    const result = creatorAPI.deleteGameRoom(roomId);
    result
      .then((res) => {
        dispatch(resetGame());
        navigate("/mypage");
      })
      .catch((err) => {
        alert(err);
      });
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
          mainBtnHandler={deleteGame}
        >
          <h5>게임을 삭제하시겠습니까?</h5>
          <p>삭제한 게임과 관련 기록은 다시 복구할 수 없습니다.</p>
        </Modal>
      )}
      <Hambugerbar />
      <GlobalNav />
      <Grid container className="create-game-grid-container">
        {needHelp && (
          <div className="create-main-box-container">
            <CreateGameTutorialPage tempHelperHandler={tempHelperHandler} />
          </div>
        )}
        <Grid item xs={11} md={9}>
          <Progressbar progress={1} />
          <div className="create-main-box-container">
            <InputGameInfo />
            <GameCardCarousel />
          </div>
          <div className="edit-page-buttons-container">
            <Button size="medium" text="다음" onClick={putGame} />
            <Button
              size="medium"
              color="gray-blue"
              text="게임 삭제"
              onClick={modalHandelr}
            />
          </div>
        </Grid>

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
