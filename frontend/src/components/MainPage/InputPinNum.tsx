import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gamePlayAPI } from "@apis/apis";

export default function InputPinNum() {
  const [inputPin, setInputPin] = useState<number>(0);

  const checkingMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    const newTarget = target ? parseInt(target, 10) : 0;
    setInputPin(newTarget);
  };

  const rejoinHandler = () => {
    if (inputPin == null) {
      console.log("입력값이 없습니다.");
      return;
    }
    const res = gamePlayAPI.enter(inputPin);
  };

  return (
    <div className="input-pin-num-container">
      <input
        type="number"
        placeholder="PIN번호를 입력해주세요"
        onChange={checkingMember} // 나중에 useRef로 바꾸기
        value={inputPin}
      />
      <button type="submit">시작하기</button>
      <Link to="/rejoin" className="rejoin-link" onClick={rejoinHandler}>
        <h3>게임에 이미 참여하신 적이 있나요?</h3>
      </Link>
    </div>
  );
}
