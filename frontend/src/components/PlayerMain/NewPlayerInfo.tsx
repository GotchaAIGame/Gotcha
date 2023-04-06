import React, { useState, useRef } from "react";
import Button from "@components/common/Button";
import OTPInput from "@components/common/OTPInput";
import InputValidBox from "@components/common/InputValidBox";
import PlayGameTutorialModal from "@components/PlayGameTutorial/PlayGameTutorialModal";
import { gamePlayAPI } from "@apis/apis";
import { RegisterandStart } from "@stores/game/gamePlaySlice";
import { useAppDispatch } from "@stores/storeHooks";
import { useNavigate } from "react-router-dom";

export default function PlayerInfo(props: { roomPin: number; roomId: number }) {
  const { roomPin, roomId } = props;

  const [otp, setOtp] = useState("");
  const [checked, setChecked] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const handleValidation = async () => {
    // const { data } = memberAPI.duplicateNickNames;
    if (nicknameInputRef.current && nicknameInputRef.current.value) {
      const nickname = nicknameInputRef.current.value;
      gamePlayAPI
        .duplicate(roomId, nickname)
        .then((res) => {
          setChecked(true);
        })
        .catch((err) => {
          alert("이미 사용중인 닉네임입니다!");
          if (nicknameInputRef.current) {
            nicknameInputRef.current.value = "";
          }
        });
    }
  };

  const nicknameChangeHandler = () => {
    if (checked) {
      setChecked(!checked);
    }
  };

  const OTPchangeHandler = (value: string) => {
    if (value.length <= 4) {
      setOtp(value);
    }
  };

  const joinGameHandler = () => {
    // id validation test
    if (!checked) {
      // when nickname is invalid
      alert("닉네임 중복체크를 완료해주세요.");
    } else if (otp.length !== 4) {
      // when password is invalid
      alert("유효한 비밀번호를 입력해주세요");
    } else {
      // when every infos input are valid
      const nickname = nicknameInputRef.current?.value as string;
      const a = dispatch(RegisterandStart({ roomId, nickname, password: otp }));
      a.then((res) => {
        if (res.type.endsWith("fulfilled")) {
          navigate(`/game/${roomPin}`, { state: { roomId, nickname } });
        } else {
          alert("중복된 닉네임입니다.");
        }
      });
    }
  };

  const tutorialModalHandler = () => {
    setIsTutorialOpen(!isTutorialOpen);
  };

  return (
    <div>
      {isTutorialOpen && (
        <PlayGameTutorialModal
          tutorialModalHandler={tutorialModalHandler}
          joinGameHandler={joinGameHandler}
        />
      )}
      <InputValidBox
        text="닉네임"
        type="text"
        onClick={handleValidation}
        inputRef={nicknameInputRef}
        checked={checked}
        onChange={nicknameChangeHandler}
      />
      <OTPInput value={otp} valueLength={4} onChange={OTPchangeHandler} />
      <div className="enter-btn">
        <Button
          text="다음"
          type="button"
          color="gray-gray"
          onClick={tutorialModalHandler}
        />
      </div>
    </div>
  );
}
