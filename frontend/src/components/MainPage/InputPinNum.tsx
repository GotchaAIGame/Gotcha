import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gamePlayAPI } from "@apis/apis";
import { setTheme } from "@stores/player/themeSlice";
import { useDispatch } from "react-redux";

export default function InputPinNum() {
  const [inputPin, setInputPin] = useState<any>("");
  const [pinWritten, setPinWritten] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // <입장하기> 버튼 클릭
  const enterHandler = (type: number) => {
    // Pin번호 6자리
    if (inputPin.toString().length === 6) {
      setPinWritten(true);
      const request = gamePlayAPI.enter(inputPin);
      request
        .then((res) => {
          console.log(res.data.result);
          const room = res.data.result.roomId;
          const { roomId, color, logoUrl, title, hasReward } = res.data.result;
          dispatch(
            setTheme({
              room: roomId,
              reward: hasReward,
              themeColor: color,
              themeLogo: logoUrl,
              themeTitle: title,
            })
          );
          if (type === 1) {
            navigate(`/newgame/${inputPin}`, { state: { room, inputPin } }); // 신규참여
          } else if (type === 2) {
            navigate(`/rejoin/${inputPin}`, { state: { room, inputPin } }); // 재참여
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

  useEffect(() => {
    if (inputPin.toString().length === 6) {
      setPinWritten(true);
    } else {
      setPinWritten(false);
    }
  }, [pinWritten, inputPin]);

  return (
    <div className="input-pin-num-container">
      <input
        className={pinWritten ? "input-written-pin-num" : "input-pin-num"}
        type="number"
        placeholder="게임 PIN번호 입력"
        value={inputPin.toString()}
        onChange={(e) => setInputPin(parseInt(e.target.value, 10))} // useRef로 바꿀 것
      />
      {inputPin.toString().length === 6 && (
        <>
          <button
            className="newgame-link"
            type="button"
            onClick={() => enterHandler(1)}
          >
            처음이에요!
          </button>
          <button
            className="rejoin-link"
            type="button"
            onClick={() => enterHandler(2)}
          >
            이어하기 / 랭킹보기
          </button>
        </>
      )}
    </div>
  );
}
