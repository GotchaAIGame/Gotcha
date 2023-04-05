import React from "react";

export default function GameInfo(props: any) {
  const { gameInfo, setGameInfo } = props;

  return (
    <div>
      <p>{gameInfo.title}</p>
    </div>
  );
}
