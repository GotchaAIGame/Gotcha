import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGame } from "@stores/game/gameSlice";

export default function InputGameInfo() {
  const dispatch = useDispatch();
  const gameInfo = useSelector((state: any) => state.game);

  const changeInfoHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGeameInfo = {
      title: gameInfo.title,
      description: gameInfo.description,
      startTime: gameInfo.startTime,
      endTime: gameInfo.endTime,
    };
    if (e.target.id === "title") {
      newGeameInfo.title = e.target.value;
    }
    if (e.target.id === "start") {
      newGeameInfo.startTime = e.target.value;
    }
    if (e.target.id === "end") {
      newGeameInfo.endTime = e.target.value;
    }
    dispatch(setGame(newGeameInfo));
  };

  const changeDescriptionHanlder = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // console.log(e.target.value);
    const newGeameInfo = {
      title: gameInfo.title,
      description: e.target.value,
      startTime: gameInfo.startTime,
      endTime: gameInfo.endTime,
    };
    dispatch(setGame(newGeameInfo));
  };

  return (
    <div className="input-game-info-container">
      {/* 타이틀 입력 */}
      <input
        className="game-title-input"
        type="text"
        placeholder="문제 제목을 입력해 주세요"
        id="title"
        value={gameInfo.title}
        onChange={changeInfoHanlder}
      />

      {/* 기간, 정보  */}
      <div className="game-info-inputs-container">
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
              placeholder="게임의 정보를 입력해 주세요."
              value={gameInfo.description}
              onChange={changeDescriptionHanlder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
