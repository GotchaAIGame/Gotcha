/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { gamePlayAPI } from "@apis/apis";
import { useLocation, useNavigate } from "react-router-dom";
import InputBox from "@components/common/InputBox";
import OTPInput from "@components/common/OTPInput";
import Button from "@components/common/Button";
import { reStart, setPlayer } from "@stores/game/gamePlaySlice";
import { useAppDispatch } from "@stores/storeHooks";

// 1. 먼저 재참여자는 이전에 참여했던
//    닉네임과 비밀번호가 일치하는지 확인(/game/login)
// 2. isFinished == true (랭킹확인)
// 3. isFinished == false (이어하기)

export default function RejoinPlayerInfo() {
  const [otp, setOtp] = useState(""); // 비밀번호 state
  const [isClicked, setIsClicked] = useState(false); // 입장하기 버튼 클릭 여부
  const [isFinish, setIsFinish] = useState(false); // 참여자 게임 종료여부
  const [startedTime, setStartedTime] = useState(""); // 참여자 게임시작했던시간
  const location = useLocation(); // roomId props로 받기
  const navigate = useNavigate(); // 리다이렉트
  const dispatch = useAppDispatch();
  const nicknameHandler = useRef<HTMLInputElement>(null); // 닉네임 input
  const changeHandler = (value: string) => setOtp(value); // 비밀번호 input

  const roomId = location.state.room;
  const roomPin = location.state.inputPin;

  const currentRef = nicknameHandler.current;

  // 갱신 확인
  const playerRoom = useSelector((state: any) => state.theme.room);
  console.log(playerRoom);

  // 재참여 로그인
  const rejoinGameHandler = () => {
    if (otp.length < 4) {
      alert("비밀번호 4자리를 입력해주세요.");
    }
    if (currentRef) {
      const nickname = currentRef.value;
      console.log(nickname, " 이곳에서 저장할게요");
      const password = parseInt(otp.slice(0, 4), 10);
      const request = gamePlayAPI.login(roomId, nickname, password);

      request
        .then((res) => {
          console.log(currentRef.value);
          const { isFinished, startTime } = res.data.result;
          setIsFinish(isFinished);
          setStartedTime(startTime);
          setIsClicked(true);

          // 참여자 정보 store에 올리기
          dispatch(
            setPlayer({
              roomId,
              nickname: currentRef.value,
              startTime,
            })
          );
        })
        .catch((err) => {
          const errCode = err.response.data.status;
          switch (errCode) {
            case 400:
              alert("닉네임을 입력해주세요.");
              break;
            case 401:
              alert("닉네임과 비밀번호를 확인해주세요.");
              break;
            case 404:
              alert("참여한 전적이 없습니다. \n새게임을 시작해주세요.");
              navigate(`/newgame/${roomPin}`); // 새게임 페이지로 리다이렉트 -> 새게임페이지 나오면 닉네임 자동입력되게끔 추가해주기!!
              break;
            default:
              console.error(err);
          }
        });
      // currentRef.value = ""; // 비우면 store에 올라가지 않는 에러 발생
      setOtp("");
    }
  };

  // <이어하기> 버튼 클릭
  const rejoinClickHandler = () => {
    if (currentRef) {
      const nickname = currentRef.value;
      const password = parseInt(otp.slice(0, 4), 10);
      // console.log(nicknameValue);
      const request = dispatch(reStart({ roomId, nickname, password }));
      request.then(() => {
        navigate(`/game/${roomPin}`);
      });
    }
  };

  // <랭킹보기> 버튼 클릭
  const rankClickHandler = () => {
    console.log(playerRoom, "저장된 roomId");
    navigate(`/game/${roomPin}/rank`, { state: { roomId, fromMypage: false } });
  };

  return (
    <div>
      <InputBox type="text" text="닉네임" ref={nicknameHandler} />
      <OTPInput value={otp} valueLength={4} onChange={changeHandler} />
      <div className="enter-button">
        {isClicked ? (
          <>
            {isFinish ? (
              <Button text="랭킹보기" onClick={rankClickHandler} />
            ) : (
              <Button text="이어하기" onClick={rejoinClickHandler} />
            )}
          </>
        ) : (
          <Button
            text="입장하기"
            type="submit"
            color="gray-blue"
            onClick={rejoinGameHandler}
          />
        )}
      </div>
    </div>
  );
}
