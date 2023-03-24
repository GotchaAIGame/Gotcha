import React, { useState } from "react";
import InputBox from "@components/common/InputBox";
import OTPInput from "@components/common/OTPInput";
import Button from "@components/common/Button";

export default function RejoinPlayerInfo() {
  const [otp, setOtp] = useState("");

  const changeHandler = (value: string) => setOtp(value);

  const rejoinGameHandler = () => {
    // 닉네임이랑 비밀번호를 다 입력했다면 -> 게임참여페이지로 리다이렉트
  };

  return (
    <div>
      <InputBox type="text" text="닉네임" />
      <OTPInput value={otp} valueLength={4} onChange={changeHandler} />
      <div className="enter-button">
        <Button
          text="입장하기"
          type="button"
          color="gray-blue"
          onClick={rejoinGameHandler}
        />
      </div>
    </div>
  );
}
