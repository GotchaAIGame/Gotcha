import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Alert } from "@mui/material";
import { setLogin } from "@stores/users/userSlice";
import InputBox from "@components/common/InputBox";
import Button from "@components/common/Button";
import { memberAPI } from "@apis/apis";
import SNSLogin from "./SNSLogin";

export default function LogIn() {
  // 추후 유효성 검사 이후 페이지 이동되게 수정 예정
  const existUser = useSelector((state: any) => state.users);
  // const [inputText, setInputText] = useState("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [cookies, setCookie] = useCookies(["refreshToken"]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 입력값 변경내용 확인
  const idTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const passwordTypingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const loginHandler = (e: any) => {
    e.preventDefault();
    if (!emailInput) {
      alert("ID를 입력해 주세요.");
    } else {
      const result = memberAPI.logIn(emailInput, passwordInput);
      result
        .then((res) => {
          console.log(res);
          console.log(res.data.result);
          const gotUserInfo = res.data.result;
          const { nickname } = res.data.result;
          // Store에 user 정보 저장
          dispatch(setLogin(gotUserInfo));
          // console.log(gotUserInfo.accessToken, "됐다!");
          // userNickname

          // token 저장
          const { accessToken, refreshToken } = gotUserInfo;
          sessionStorage.setItem("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);

          alert(`${nickname}님 환영합니다!`);
          navigate(`/mypage/${nickname}`);
        })
        .catch((res) => {
          alert(res);
          console.log(res);
        });
    }
  };

  // 이미 로그인한 유저면 마이페이지로 렌더링
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken && existUser) {
      navigate(`/mypage/${existUser.nickname}`);
    }
  }, []);

  return (
    <div className="login-inputs-container">
      <form action="submit" onSubmit={loginHandler}>
        <InputBox
          type="text"
          text="아이디"
          onChange={idTypingHandler}
          value={emailInput}
        />
        <InputBox
          type="password"
          text="비밀번호"
          onChange={passwordTypingHandler}
          value={passwordInput}
        />
        <Button text="로그인하기" type="submit" />
        <SNSLogin />
      </form>
    </div>
  );
}
