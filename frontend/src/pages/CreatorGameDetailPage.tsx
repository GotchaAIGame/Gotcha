import React, { useState, useEffect } from "react";
import { creatorAPI } from "@apis/apis";
import { useLocation } from "react-router-dom";
import "@styles/CreatorGameDetailPage.scss";

interface IgameInfo {
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
  rewards?: [
    {
      id: number;
      name: string;
      grade: number;
      image: string;
    }
  ];
  problems: [
    {
      id: number;
      name: string;
      hint: string;
      imageUrl: string;
    }
  ];
}

export default function CreatorGameDetailPage() {
  const [gameInfo, setGameInfo] = useState<IgameInfo>({
    id: -1,
    color: "",
    logoUrl: "",
    title: "",
    eventUrl: "",
    eventDesc: "",
    code: -1,
    startTime: "",
    endTime: "",
    hasReward: false,
    rewards: [
      {
        id: -1,
        name: "",
        grade: -1,
        image: "",
      },
    ],
    problems: [
      {
        id: -1,
        name: "",
        hint: "",
        imageUrl: "",
      },
    ],
  });

  const location = useLocation();
  const roomId = location.state.gameId;

  useEffect(() => {
    console.log("생겼따!");
    const result = creatorAPI.getGameDetail(roomId);
    result.then((res) => {
      console.log(res.data.result);
      const newInfo = res.data.result;
      setGameInfo(newInfo);
    });
  }, []);

  const check = () => {
    console.log(gameInfo, "있음");
  };

  if (gameInfo) {
    return (
      <div>
        <p>이곳에서 게임 정보를 조회, 수정하고, Custom할 수 있어야합니다</p>
        <button type="button" onClick={check}>
          수정하기
        </button>
        <button type="button">삭제하기</button>
        {gameInfo.color && <p>ㅋ</p>}
      </div>
    );
  }
  return null;
}
