import Button from "@components/common/Button";
import InputBox from "@components/common/InputBox";
import InputValidBox from "@components/common/InputValidBox";
import React from "react";

export default function PlayerInfo() {
  const joinGameHandler = () => {
    // 닉네임이랑 비밀번호를 다 입력했다면 -> 게임참여페이지로 리다이렉트
  };

  const handleValidation = () => {
    // 닉네임 중복확인
    // return값이 false면 <p>이미 사용 중인 닉네임입니다.</p>
    // return값이 true면 check 이미지 렌더링 -> InputValidBox.tsx
    console.log("click");
  };

  return (
    <div>
      <InputValidBox text="닉네임" type="text" onClick={handleValidation} />
      <InputBox text="닉네임" type="text" />
      <InputBox text="비밀번호" type="password" />
      <Button
        text="입장하기"
        type="button"
        color="gray-blue"
        onClick={joinGameHandler}
      />
    </div>
  );
}
