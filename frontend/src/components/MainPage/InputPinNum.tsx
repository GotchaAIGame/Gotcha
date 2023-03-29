import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gamePlayAPI } from "@apis/apis";

export default function InputPinNum() {
  const [inputPin, setInputPin] = useState<any>("");
  const navigate = useNavigate();

  const checkingMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.value;
    const newTarget = target ? parseInt(target, 10) : null;
    setInputPin(newTarget);
  };

  // string 막기
  const rejoinHandler = () => {
    // Pin번호 6자리
    if (inputPin.toString().length === 6) {
      const request = gamePlayAPI.enter(inputPin);
      request
        .then((res) => {
          navigate("/rejoin");
          setInputPin("");
        })
        .catch((err) => {
          alert("유효하지 않은 방입니다.");
          console.error(err);
          setInputPin("");
        });
    } else {
      alert("6자리의 PIN번호를 모두 입력해주세요.");
      setInputPin("");
    }
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
      <button className="rejoin-link" type="button" onClick={rejoinHandler}>
        <h3>게임에 이미 참여하신 적이 있나요?</h3>
      </button>
    </div>
  );
}
