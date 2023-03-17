import Button from "@components/common/Button";
import InputBox from "@components/common/InputBox";
import React from "react";

export default function PlayerInfo() {
  const joinGameHandler = () => {
    // 닉네임이랑 비밀번호를 다 입력했다면 -> 게임참여페이지로 리다이렉트
  }

  return (
    <div>
      <InputBox text="닉네임" type="text" />
      <InputBox text="비밀번호" type="password" />
      <Button text="입장하기" type="button" color="gray-blue" onClick={joinGameHandler}/>
    </div>
  );
}
