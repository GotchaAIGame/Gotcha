import React, { useState } from "react";
import { creatorAPI } from "@apis/apis";
import RewardCard from "./RewardCard";
import "@styles/CustomModalPage.scss";

export default function RewardList(props: any) {
  const { gameId } = props;
  const [rewardsList, setRewardsList] = useState([
    {
      name: "",
      grade: 1,
      image: "",
    },
    {
      name: "",
      grade: 2,
      image: "",
    },
    {
      name: "",
      grade: 3,
      image: "",
    },
  ]);

  const rewardsAPI = () => {
    console.log(rewardsList);
    const rewardsInfo = {
      roomId: gameId,
      rewards: rewardsList,
    };

    const result = creatorAPI.setRewards(rewardsInfo);
    result.then((res)=>{
      console.log(res)
    })
  };

  return (
    <div className="reward-cards-container">
      <div className="head-wrapper">
        <p>경품 등록</p>
      </div>
      {rewardsList.map((reward, idx) => {
        return (
          <div key={reward.grade}>
            <RewardCard
              rewardsList={rewardsList}
              setRewardsList={setRewardsList}
              idx={idx}
            />
          </div>
        );
      })}
      <button type="button" onClick={rewardsAPI}>
        경품 API
      </button>
    </div>
  );
}
