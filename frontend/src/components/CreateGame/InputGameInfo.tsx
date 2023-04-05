import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGame } from "@stores/game/gameSlice";

export default function InputGameInfo() {
  const dispatch = useDispatch();
  const gameInfo = useSelector((state: any) => state.game);

  const changeInfoHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGeameInfo = {
      title: gameInfo.title,
      eventDesc: gameInfo.eventDesc,
      startTime: gameInfo.startTime,
      endTime: gameInfo.endTime,
    };
    if (e.target.id === "title") {
      newGeameInfo.title = e.target.value;
    }
    if (e.target.id === "start") {
      if (gameInfo.endTime && e.target.value >= gameInfo.endTime) {
        alert("시작일은 종료일 이전으로 설정해주세요");
      } else {
        newGeameInfo.startTime = e.target.value;
      }
    }
    if (e.target.id === "end") {
      if (gameInfo.startTime && e.target.value <= gameInfo.startTime) {
        alert("종료일은 시작일 이후로 설정해주세요");
      } else {
        newGeameInfo.endTime = e.target.value;
      }
    }
    dispatch(setGame(newGeameInfo));
  };

  const changeDescriptionHanlder = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // console.log(e.target.value);
    const newGeameInfo = {
      title: gameInfo.title,
      eventDesc: e.target.value,
      startTime: gameInfo.startTime,
      endTime: gameInfo.endTime,
    };
    dispatch(setGame(newGeameInfo));
  };

  return (
    <div className="input-game-info-container">
      {/* 기간, 정보  */}
      <div className="game-info-inputs-container">
        {/* 제목 입력 */}
        <div className="duration-inputs-container">
          <h5>게임 제목</h5>
          <div className="right-inputs-container">
            <input
              className="game-title-input"
              type="text"
              placeholder="게임의 타이틀을 입력해주세요"
              id="title"
              value={gameInfo.title}
              onChange={changeInfoHanlder}
            />
          </div>
        </div>

        {/* 진행 기간 */}
        <div className="duration-inputs-container">
          <h5>진행 기간</h5>
          <div className="right-inputs-container">
            <input
              id="start"
              type="datetime-local"
              value={gameInfo.startTime}
              onChange={changeInfoHanlder}
            />
            <p>~</p>
            <input
              id="end"
              type="datetime-local"
              value={gameInfo.endTime}
              onChange={changeInfoHanlder}
            />
          </div>
        </div>

        {/* 퀴즈 정보 */}
        <div className="game-inputs-container">
          <h5>게임 정보</h5>
          <div className="right-inputs-container">
            <textarea
              placeholder="게임의 정보를 입력해주세요."
              value={gameInfo.eventDesc}
              onChange={changeDescriptionHanlder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
