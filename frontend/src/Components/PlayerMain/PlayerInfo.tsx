import InputBox from "@components/common/InputBox";
import React from "react";

export default function PlayerInfo() {
  return (
    <div>
      <InputBox txt="닉네임" type="text" />
      <InputBox txt="비밀번호" type="password" />
    </div>
  );
}
