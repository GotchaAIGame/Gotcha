import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../stores/users/userSlice";

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
        <input
          type="text"
          placeholder="아이디"
          id="userId"
          onChange={idTypingHandler}
          value={inputText}
        />
        <input type="password" placeholder="비밀번호" />
        <button type="submit">로그인하기</button>
      </form>
      <div className="social-logins-container">
        <button type="button" className="kakao-btn">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111466.png"
            alt=""
          />
          <p>카카오톡</p>
        </button>
        <button type="button" className="google-btn">
          <img
            src="https://img.icons8.com/color/512/google-logo.png"
            alt=""
          />
          <p>GOOGLE</p>
        </button>
      </div>
      <div className="signup-btn-wrapper">
        <Link to="/signup">
          <button type="button">회원가입</button>
        </Link>
      </div>
    </div>
  );
}
