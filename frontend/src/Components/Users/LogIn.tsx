import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "@stores/users/userSlice";
import InputBox from "@components/common/InputBox";
import Button from "@components/common/Button";

export default function LogIn() {
  // 추후 유효성 검사 이후 페이지 이동되게 수정 예정
  const existId = useSelector((state: any) => state.users.userId);
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 입력값 변경내용 확인
  const idTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const loginHandler = (e: any) => {
    if (!inputText) {
      e.preventDefault();
      alert("ID를 입력해 주세요.");
    } else {
      const userId = inputText;
      dispatch(setLogin({ userId }));
      if (existId) {
        navigate("/");
      } else {
        navigate("/creator");
      }
    }
  };
  return (
    <div className="login-inputs-container">
      <form action="submit" onSubmit={loginHandler}>
        <InputBox
          type="text"
          txt="아이디"
          onChange={idTypingHandler}
          value={inputText}
        />
        <InputBox type="password" txt="비밀번호" />
        <Button text="로그인하기" type="submit" />
      </form>

      
      {/* <Button> color랑 이미지 수정할 것!!! */}
      <div className="social-logins-container">
        <div className="social-login-title">
          <hr />
          <p>SNS 로그인 / 회원가입</p>
          <hr />
        </div>
        <Button text="Google 로그인" />
        <Button text="카카오톡 로그인" />
        <div className="signup-btn-wrapper">
          <Link to="/signup">
            <Button text="회원가입" color="skyblue" />
          </Link>
        </div>
      </div>
    </div>
  );
}
