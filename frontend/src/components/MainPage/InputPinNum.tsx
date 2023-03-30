import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gamePlayAPI } from "@apis/apis";

export default function InputPinNum() {
  const [inputPin, setInputPin] = useState<any>("");

  const navigate = useNavigate();
  const enterHandler = (type: number) => {
    // Pin번호 6자리
    if (inputPin.toString().length === 6) {
      const request = gamePlayAPI.enter(inputPin);
      request
        .then((res) => {
          const room = res.data.result.roomId;

          if (type === 1) {
            navigate(`/newgame/${inputPin}`); // 신규참여
          } else if (type === 2) {
            navigate(`/rejoin/${inputPin}`, { state: room }); // 재참여
          }
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
        value={inputPin.toString()}
        onChange={(e) => setInputPin(parseInt(e.target.value, 10))} // useRef로 바꿀 것
      />
      <button
        className="newgame-link"
        type="button"
        onClick={() => enterHandler(1)}
      >
        시작하기
      </button>
      <button
        className="rejoin-link"
        type="button"
        onClick={() => enterHandler(2)}
      >
        <h3>게임에 이미 참여하신 적이 있나요?</h3>
      </button>
    </div>
  );
}
