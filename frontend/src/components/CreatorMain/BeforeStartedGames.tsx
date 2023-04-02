import React from "react";
import GameCard from "./GameCard";

export default function BeforeStartedGames(props: any) {
  const { createGames } = props;
  const today = new Date();

  return (
    <div>
      {createGames.map((item: any) => {
        const start = new Date(item.startTime);
        const end = new Date(item.endTime);

        // 시작 전: 진행 시작일 > 오늘, 종료일 > 오늘
        if (start > today && end > today) {
          return <GameCard gameInfo={item} key={item.id} />;
        }
        return null;
      })}
      {/* <GameCard /> */}
    </div>
  );
}