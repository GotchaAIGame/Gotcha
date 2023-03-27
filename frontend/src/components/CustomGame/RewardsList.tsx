import React from "react";
import RewardCard from "./RewardCard";

export default function RewardsList() {
  return (
    <div className="reward-cards-container">
      <div className="head-wrapper">
        <p>경품 등록</p>
      </div>
      <RewardCard />
      <RewardCard />
      <RewardCard />
    </div>
  );
}
