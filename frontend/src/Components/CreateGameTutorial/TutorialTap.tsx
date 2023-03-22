import React, { useState } from "react";
import TutorialContent from "./TutorialContent";

export default function TutorialTap() {
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({
    page1: true,
    page2: false,
    page3: false,
  });

  const tabHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const newtarget = target.id as keyof typeof isOpen;
    const newTab: { [key: string]: boolean } = {
      page1: false,
      page2: false,
      page3: false,
    };
    newTab[newtarget] = true;
    setIsOpen(newTab);
  };

  const slideHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const direction = target.id;
  };

  return (
    <div>
      <div className="tutorial-tab-buttons-container">
        <button type="button" id="page1" onClick={tabHandler}>
          처음으로
        </button>
        <button
          type="button"
          id="page1"
          onClick={tabHandler}
          className={isOpen.page1 ? "button-active" : ""}
        >
          ① 기본 내용 설정하기
        </button>
        <button
          type="button"
          id="page2"
          onClick={tabHandler}
          className={isOpen.page2 ? "button-active" : ""}
        >
          ② 커스텀 하기
        </button>
        <button
          type="button"
          id="page3"
          onClick={tabHandler}
          className={isOpen.page3 ? "button-active" : ""}
        >
          ③ 시작이랑 종료는?
        </button>
      </div>
      <div className="tutotial-contents-slide">
        {isOpen.page1 ? null : (
          <button type="button" id="prev" onClick={slideHandler}>
            ◁
          </button>
        )}
        <TutorialContent isOpen={isOpen} setIsOpen={setIsOpen} />
        {isOpen.page3 ? null : (
          <button type="button" id="next" onClick={slideHandler}>
            ▷
          </button>
        )}
      </div>
    </div>
  );
}
