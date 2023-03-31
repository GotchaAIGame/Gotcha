import React, { useState, useEffect } from "react";
import CustomModal from "@components/CustomGame/CustomModal";
import RewardList from "./RewardList";

export default function GameThemeSide(props: any) {
  const { gameInfo, setGameInfo } = props;

  const [themeInfo, setThemeInfo] = useState({
    color: "",
    logoUrl: "",
  });
  const [rewardsInfo, setRewardsInfo] = useState([
    {
      name: "",
      grade: -1,
      image: "",
    },
  ]);

  useEffect(() => {
    if (gameInfo.hasReward) {
      const gotRewardInfo = gameInfo.rewards;
      setRewardsInfo(gotRewardInfo);
    }
  }, []);

  return (
    <div>
      <p>{gameInfo.color}</p>
      {gameInfo.hasReward ? (
        <div>
          <p>있다</p>
          {gameInfo.rewards.map((item: any) => {
            return (
              <div key={item.id}>
                <p>{item.id}</p>
                <p>{item.name}</p>
                <p>{item.grade}</p>
                <img src={item.image} alt="" />
              </div>
            );
          })}
          <input type="text" />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h3>경품 없다</h3>
          <RewardList gameId={gameInfo.id} />
        </div>
      )}
    </div>
  );
}
