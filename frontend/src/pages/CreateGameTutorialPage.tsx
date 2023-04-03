import React from "react";
import TutorialTap from "@components/CreateGameTutorial/TutorialTap";
import Button from "@components/common/Button";
import "@styles/CreateGameTutorialPage.scss";

export default function CreateGameTutorialPage(props: any) {
  const { tempHelperHandler } = props;
  return (
    <div className="tutorial-page-container">
      <header>
        <h1>Tutorial</h1>
        <p>나만의 AI 게임 서비스 Gotcha! 게임 만드는 방법을 알려드릴게요!</p>
      </header>
      <TutorialTap />
      <div className="go-game-button-wrapper">
        <Button text="게임 만들러 가기" onClick={tempHelperHandler} />
      </div>
    </div>
  );
}
