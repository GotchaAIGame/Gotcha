import React, { useRef, useState } from "react";
import { gamePlayAPI } from "@apis/apis";
import { useLocation } from "react-router-dom";
import InputBox from "@components/common/InputBox";
import OTPInput from "@components/common/OTPInput";
import Button from "@components/common/Button";
import { HttpStatusCode } from "axios";

// 1. 먼저 재참여자는 이전에 참여했던
//    닉네임과 비밀번호가 일치하는지 확인(/game/login)
// 2. isFinished == true (랭킹확인)
// 3. isFinished == false (이어하기)

export default function RejoinPlayerInfo() {
  const [otp, setOtp] = useState("");
  const nicknameHandler = useRef<HTMLInputElement>(null);
  const changeHandler = (value: string) => setOtp(value);

  const currentRef = nicknameHandler.current;
  const location = useLocation();
  const rejoinGameHandler = () => {
    // if (otp.length < 4) {
    //   alert("비밀번호 4자리를 입력해주세요.");
    // }
    const roomId = location.state;

    if (currentRef) {
      let nicknameValue = currentRef.value;
      const password = parseInt(otp.slice(0, 4), 10);
      const request = gamePlayAPI.login(roomId, nicknameValue, password);

      request
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          const errCode = err.response.data.status;
          switch (errCode) {
            case 401:
              alert("닉네임과 비밀번호를 확인해주세요.");
              break;
            case 404:
              alert("참여한 전적이 없습니다. \n새게임을 시작해주세요.");
              break;
            default:
              console.error();
          }
        });
      if (currentRef) {
        nicknameValue = "";
      }
      setOtp("");
    }
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
