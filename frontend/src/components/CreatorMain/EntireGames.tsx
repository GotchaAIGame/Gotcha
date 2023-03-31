import React from "react";
import GameCard from "./GameCard";

export default function EntireGames(props: any) {
  const { createGames } = props;
  console.log(createGames);

  // createGames.map((item: any) => {
  //   console.log(item);
  //   return null;
  // });

  return (
    <div>
      {createGames.map((item: any) => {
        return <GameCard gameInfo={item} key={item.id} />;
      })}
      {/* <GameCard /> */}
    </div>
  );
}
