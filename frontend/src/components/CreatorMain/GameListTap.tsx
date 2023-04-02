import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { creatorAPI } from "@apis/apis";
import Button from "@components/common/Button";
import EntireGames from "./EntireGames";
import OnGoingGames from "./OnGoingGames";
import BeforeStartedGames from "./BeforeStartedGames";
import FinishedGames from "./FinishedGames";

export default function GameListTap() {
  const userId = useSelector((state: any) => state.users.id);

  const [isOpen, setIsOpen] = useState({
    entire: true,
    ongoing: false,
    before: false,
    finished: false,
  });

  const [createGames, setCreateGames] = useState<object[]>([]);

  const tabHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const newtarget = target.id as keyof typeof isOpen;
    const newTab = {
      entire: false,
      ongoing: false,
      before: false,
      finished: false,
    };
    newTab[newtarget] = true;
    setIsOpen(newTab);
  };

  useEffect(() => {
    console.log("렌더링!");
    const result = creatorAPI.getAllGameRoom(userId, 0);
    result.then((res) => {
      console.log(res.data.result);
      setCreateGames(res.data.result.content);
    });
  }, []);

  return (
    <div className="game-tabs-container">
      <h3>내가 만든 게임</h3>
      <div className="game-tab-buttons-container">
        <button
          type="button"
          onClick={tabHandler}
          id="entire"
          className={isOpen.entire ? "button-active" : ""}
        >
          전체보기
        </button>
        <button
          type="button"
          onClick={tabHandler}
          id="ongoing"
          className={isOpen.ongoing ? "button-active" : ""}
        >
          진행중
        </button>
        <button
          type="button"
          onClick={tabHandler}
          id="before"
          className={isOpen.before ? "button-active" : ""}
        >
          시작전
        </button>
        <button
          type="button"
          onClick={tabHandler}
          id="finished"
          className={isOpen.finished ? "button-active" : ""}
        >
          종료
        </button>
      </div>
      {isOpen.entire && <EntireGames createGames={createGames} />}
      {isOpen.ongoing && <OnGoingGames createGames={createGames}/>}
      {isOpen.before && <BeforeStartedGames createGames={createGames}/>}
      {isOpen.finished && <FinishedGames createGames={createGames}/>}
      <Link to="/create/game" className="create-button-wrapper">
        <Button color="lime" size="small" text="생성하기" />
      </Link>
    </div>
  );
}
