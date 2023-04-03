import React from "react";
import TutorialTap from "@components/CreateGameTutorial/TutorialTap";
import Button from "@components/common/Button";
import "@styles/CreateGameTutorialPage.scss";

export default function CreateGameTutorialPage(props: any) {
  const { tempHelperHandler } = props;
  return (
    <div className="tutorial-page-container">
      <TutorialTap />
      <div className="go-game-button-wrapper">
        <Button text="게임 만들러 가기" onClick={tempHelperHandler} />
      </div>
    </div>
  );
}
