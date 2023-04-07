import React from "react";
import TutorialTap from "@components/CreateGameTutorial/TutorialTap";
import Button from "@components/common/Button";
import closeBtn from "@assets/closeButton.svg";
import "@styles/CreateGameTutorialPage.scss";

export default function CreateGameTutorialPage(props: any) {
  const { tempHelperHandler } = props;
  return (
    <div className="tutorial-page-modal-bg">
      <div className="tutorial-page-container">
        <header>
          <button type="button" onClick={tempHelperHandler}>
            <img src={closeBtn} alt="" />
          </button>
          <h1>Tutorial</h1>
          <p>나만의 AI 게임 서비스 Gotcha! 게임 만드는 방법을 알려드릴게요!</p>
        </header>
        <TutorialTap />
        {/* <div className="go-game-button-wrapper">
          <Button
            size="medium"
            color="skyblue"
            text="튜토리얼 닫기"
            onClick={tempHelperHandler}
          />
        </div> */}
          {/* <button type="button">30일간 튜토리얼 보지 않기</button> */}
      </div>
    </div>
  );
}
