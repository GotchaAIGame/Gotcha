import React from "react";
import Button from "@components/common/Button";

export default function RankButtons() {
  const eventModalHandler = () => {
    console.log("이벤트 참여하기");
  };

  const rewardModalHandler = () => {
    console.log("경품보기");
  };
  return (
    <div className="buttons-container">
      <Button color="darkblue" text="경품보기" onClick={rewardModalHandler} />
      <Button text="이벤트 참여하기" onClick={eventModalHandler} />
    </div>
  );
}
