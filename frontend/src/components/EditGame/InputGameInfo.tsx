/* eslint-disable jsx-a11y/label-has-associated-control */
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
    const newGeameInfo = {
      title: gameInfo.title,
      eventDesc: e.target.value,
      startTime: gameInfo.startTime,
      endTime: gameInfo.endTime,
    };
    dispatch(setGame(newGeameInfo));
  };

  return (
    <div className="create-game-info-container">
      {/* 기간, 정보  */}

      <div className="create-input-commom-wrapper">
        <label>게임 제목</label>
        <input
          className="create-game-title-input"
          type="text"
          placeholder="게임의 타이틀을 입력해주세요"
          id="title"
          value={gameInfo.title}
          onChange={changeInfoHanlder}
        />
      </div>

      {/* 진행 기간 */}
      <div className="create-duration-wrapper">
        <label>진행 기간</label>
        <div className="input-date-wrapper">
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
      <div className="create-input-commom-wrapper">
        <label>게임 정보</label>
        <textarea
          placeholder="게임의 정보를 입력해 주세요."
          value={gameInfo.eventDesc}
          onChange={changeDescriptionHanlder}
        />
      </div>
    </div>
  );
}
