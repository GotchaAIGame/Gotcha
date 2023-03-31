import React from "react";
import gold from "@assets/goldmedal.png";
import silver from "@assets/silvermedal.png";
import bronze from "@assets/bronzemedal.png";

interface IRewardProps {
  grade: number;
  imgUrl: string;
  rewardName: string;
}

export default function Reward({ grade, imgUrl, rewardName }: IRewardProps) {
  let medal = null;
  if (grade === 1) {
    medal = gold;
  } else if (grade === 2) {
    medal = silver;
  } else if (grade === 3) {
    medal = bronze;
  } else {
    medal = "";
  }

  return (
    <div>
      <div className="reward-box">
        <img className="medal" src={medal} alt="메달" />
        <img className="reward-img" src={imgUrl} alt="경품사진" />
        <p>{rewardName}</p>
      </div>
    </div>
  );
}
