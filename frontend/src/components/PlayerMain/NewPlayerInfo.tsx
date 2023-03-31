import React, { useState, useRef } from "react";
import Button from "@components/common/Button";
import OTPInput from "@components/common/OTPInput";
import InputValidBox from "@components/common/InputValidBox";
import { memberAPI } from "@apis/apis";
import { registerUser } from "@stores/game/gamePlaySlice";
import { useAppDispatch } from "@stores/storeHooks";
import { useNavigate } from "react-router-dom";

export default function PlayerInfo(props : {roomPin : number, roomId : number}) {
  const {roomPin, roomId} = props

  const [otp, setOtp] = useState("");
  const [checked, setChecked] = useState(false);

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const handleValidation = async () => {
    // const { data } = memberAPI.duplicateNickNames;
    if (nicknameInputRef.current && nicknameInputRef.current.value) {
      const nicknameInput = nicknameInputRef.current.value;
      // console.log(nicknameInput);
      const response = await memberAPI.duplicateNickName(nicknameInput);

      if (response.data.result === false) {
        // when valid (not duplicated)
        setChecked(true);
      } else {
        // when invalid (duplicated)
        alert("이미 사용중인 닉네임입니다!");
        nicknameInputRef.current.value = "";
      } 
    }
  };

  const changeHandler = (value: string) => {
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
      const nickname = nicknameInputRef.current?.value as string
      
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      
      dispatch(registerUser({roomId, nickname, password : otp}))

      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...
      // register user와 start를 둘 다 async 안에 담자...

      navigate(`/game/${roomPin}`)
    }
  };

  return (
    <div>
      <InputValidBox
        text="닉네임"
        type="text"
        onClick={handleValidation}
        inputRef={nicknameInputRef}
        checked={checked}
      />
      <OTPInput value={otp} valueLength={4} onChange={changeHandler} />
      <div className="enter-button">
        <Button
          text="입장하기"
          type="button"
          color="gray-blue"
          onClick={joinGameHandler}
        />
      </div>
    </div>
  );
}
