import React, { useEffect } from "react";
import { creatorAPI } from "@apis/apis";
import plusBtn from "@assets/smallPlusButton.svg";
import deleteBtn from "@assets/smallDeleteButton.svg";

import RewardCard from "./RewardCard";
import "@styles/CustomModalPage.scss";

export default function RewardList(props: any) {
  const { rewardsList, setRewardsList, isRewardOpen, rewardHandler } = props;

  return (
    <div className="reward-cards-container">
      <div className="head-wrapper">
        <p>경품 등록</p>
        <button type="button" onClick={rewardHandler}>
          {isRewardOpen ? (
            <img src={deleteBtn} alt="" />
          ) : (
            <img src={plusBtn} alt="" />
          )}
        </button>
      </div>
      {isRewardOpen ? (
        <div>
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
      ) : (
        <div className="empty-bottom-box" />
      )}
    </div>
  );
}
