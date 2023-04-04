import React from "react";
import GameCard from "./GameCard";

export default function FinishedGames(props: any) {
  const { createGames } = props;
  const today = new Date();

  const finishedGames = createGames.filter((item: any) => {
    const start = new Date(item.startTime);
    const end = new Date(item.endTime);

    // 진행 중: 진행 시작일 <= 오늘, 종료일 > 오늘
    return start <= today && end > today;
  });

  return (
    <>
      {finishedGames.length > 0 ? (
        finishedGames.map((item: any) => (
          <GameCard gameInfo={item} key={item.id} />
        ))
      ) : (
        <div className="make-new-game-alert">
          <p>현재 진행 중인 게임이 없어요!</p>
        </div>
      )}
      {createGames.length === 0 && (
        <div className="make-new-game-alert">
          <p>아직 생성된 게임이 없어요!</p>
          <p>게임을 생성하러 가볼까요?</p>
        </div>
      )}
    </>
  );
}