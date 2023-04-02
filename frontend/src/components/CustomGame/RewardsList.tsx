import React, { useEffect } from "react";
import { creatorAPI } from "@apis/apis";
import RewardCard from "./RewardCard";
import "@styles/CustomModalPage.scss";

export default function RewardList(props: any) {
  const { rewardsList, setRewardsList } = props;

  return (
    <div className="reward-cards-container">
      <div className="head-wrapper">
        <p>경품 등록</p>
      </div>
      {rewardsList.map(
        (reward: { grade: React.Key | null | undefined }, idx: any) => {
          return (
            <div key={reward.grade}>
              <RewardCard
                rewardsList={rewardsList}
                setRewardsList={setRewardsList}
                idx={idx}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
