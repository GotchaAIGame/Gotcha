import React, { useState } from "react";
import { gamePlayAPI } from "@apis/apis";
import InputBox from "@components/common/InputBox";
import OTPInput from "@components/common/OTPInput";
import Button from "@components/common/Button";

// 1. 먼저 재참여자는 이전에 참여했던
//    닉네임과 비밀번호가 일치하는지 확인(/game/login)
// 2. isFinished == true (랭킹확인)
// 3. isFinished == false (이어하기)

export default function RejoinPlayerInfo() {
  const [otp, setOtp] = useState("");
  const nicknameHandler = React.createRef<HTMLInputElement>();

  const changeHandler = (value: string) => setOtp(value);

  const rejoinGameHandler = () => {
    console.log(nicknameHandler.current?.value);
    console.log(otp.slice(0, 4));
    nicknameHandler.current?.setAttribute("value", "하위");
    setOtp("");
    // nicknameHandler = React.createRef<HTMLInputElement>();
  };

  return (
    <div>
      <InputBox type="text" text="닉네임" ref={nicknameHandler} />
      <OTPInput value={otp} valueLength={4} onChange={changeHandler} />
      <div className="enter-button">
        <Button
          text="입장하기"
          type="submit"
          color="gray-blue"
          onClick={rejoinGameHandler}
        />
      </div>
    </div>
  );
}
