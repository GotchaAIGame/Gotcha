import React, { useState } from "react";
import GameInfo from "@components/CreatorGameDeatil/GameInfo";
import ProblemList from "@components/CreatorGameDeatil/ProblemList";
// import CustomModal from "@components/CustomGame/CustomModal";
import GameThemeSide from "./GameThemeSide";

interface IroomInfo {
  id: number;
  color: string;
  logoUrl: string;
  title: string;
  eventUrl: string;
  eventDesc: string;
  code: number;
  startTime: string;
  endTime: string;
  hasReward: boolean;
}

interface IproblemsInfo {
  id: number;
  color: string;
  problems: [
    {
      id: number;
      name: string;
      hint: string;
      imageUrl: string;
    }
  ];
}

interface IthemeInfo {
  id: number;
  color: string;
  problems: [
    {
      id: number;
      name: string;
      hint: string;
      imageUrl: string;
    }
  ];
}

export default function GameDetail(props: any) {
  const { gameInfo, setGameInfo } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <GameInfo gameInfo={gameInfo} setGameInfo={setGameInfo} />
      <ProblemList />
      {/* <GameThemeSide gameInfo={gameInfo} setGameInfo={setGameInfo} /> */}
      {!isOpen && (
        <button type="button" className="open-button" onClick={modalHandler}>
          ◀
        </button>
      )}
      <GameThemeSide gameInfo={gameInfo} setGameInfo={setGameInfo} />
    </div>
  );
}
