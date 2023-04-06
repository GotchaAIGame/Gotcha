import React from "react";
import Button from "@components/common/Button";
import closeBtn from "@assets/closeButton.svg";
import TutorialTap from "./TutorialTap";
import "@styles/PlayerTutorial.scss";

export default function PlayGameTutorialModal(props: any) {
  const { tutorialModalHandler, joinGameHandler } = props;

  return (
    <div className="tutorial-page-modal-bg">
      <div className="player-tutorial-modal-container">
        <header>
          <button type="button" onClick={tutorialModalHandler}>
            <img src={closeBtn} alt="" />
          </button>
          <h1>Tutorial</h1>
          <p>
            AI 게임 서비스 Gotcha! <br />
            이용법을 알려드릴게요
          </p>
        </header>
        <TutorialTap />
        <Button
          size="small"
          color="skyblue"
          text="게임하러 가기"
          onClick={joinGameHandler}
        />
      </div>
    </div>
  );
}
