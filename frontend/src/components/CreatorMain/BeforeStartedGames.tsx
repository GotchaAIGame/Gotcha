import React from "react";
import GameCard from "./GameCard";

export default function BeforeStartedGames(props: any) {
  const { createGames } = props;
  const today = new Date();

  return (
    <>
      {createGames.map((item: any) => {
        const start = new Date(item.startTime);
        const end = new Date(item.endTime);

        // 시작 전: 진행 시작일 > 오늘, 종료일 > 오늘
        if (start > today && end > today) {
          return <GameCard gameInfo={item} key={item.id} />;
        }
        return (
          <div className="make-new-game-alert" key={item.id}>
            <p>시작한 방이 없어요!</p>
          </div>
        );
      })}
      {createGames.length === 0 && (
        <div className="make-new-game-alert">
          <p>아직 생성된 방이 없어요!</p>
          <p>게임을 생성하러 가볼까요?</p>
        </div>
      )}
      {/* <GameCard /> */}
    </>
  );
}
