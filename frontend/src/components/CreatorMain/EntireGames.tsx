import React from "react";
import GameCard from "./GameCard";

export default function EntireGames(props: any) {
  const { createGames } = props;

  return (
    <>
      {createGames.map((item: any) => {
        return <GameCard gameInfo={item} key={item.id} />;
      })}
      {createGames.length === 0 && (
        <div className="make-new-game-alert">
          <p>아직 생성된 방이 없어요!</p>
          <p>게임을 생성하러 가볼까요?</p>
        </div>
      )}
    </>
  );
}
