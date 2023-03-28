/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import "@styles/SignUpPage.scss";
import Button from "@components/common/Button";
import InputValidBox from "@components/common/InputValidBox";
import InputBox from "@components/common/InputBox";
import { memberAPI } from "@apis/apis";

type Props = {
  setIsSuccess: (value: boolean) => void;
};

interface IuserInfo {
  nickname: string;
  password: string;
  organization: string;
  email: string;
  registrationId: string;
}

export default function SignUp(props: Props) {
  const [userInfo, setUserInfo] = useState<IuserInfo>({
    nickname: "",
    password: "",
    organization: "",
    email: "",
    registrationId: "",
  });
  const { setIsSuccess } = props;

  const signupHandler = () => {
    setIsSuccess(true);
  };

  // email 갱신 (onChange)
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const newEmail = target.value;
      const newUserInfo = { ...userInfo };
      newUserInfo.email = newEmail;
      setUserInfo(newUserInfo);
      console.log(userInfo);
    }
  };

  // email 중복확인 (onClick)
  const emailChecker = (e: any) => {
    e.preventDefault();
    const result = memberAPI.duplicateEmail(userInfo.email);
    console.log(userInfo.email);
    result
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        alert(res);
      });
  };

  return (
    <div className="singup-page-container">
      <h3>환영합니다!</h3>
      <h5>회원가입을 위해 아래 정보를 입력해주세요.</h5>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-email">
          <h5>이메일</h5>
          <InputValidBox
            type="email"
            text="이메일"
            onClick={emailChecker}
            onChange={emailHandler}
          />
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-password">
          <h5>비밀번호</h5>
          <InputBox type="password" text="비밀번호" />
          <p className="passwod-intro">
            ※ 비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를 혼합하여
            8~20자로 입력해주세요.
          </p>
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-password-check">
          <h5>비밀번호 확인</h5>
          <InputBox type="password" text="비밀번호 확인" />
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-nickname">
          <h5>닉네임</h5>
          <InputValidBox type="text" text="닉네임" />
          <p className="nickname-intro">
            ※ 닉네임은 특수문자와 공백 없이 2~10자로
            <br />
            입력해주세요.
          </p>
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-company">
          <h5>소속</h5>
          <InputBox type="text" text="ex) SSAFY, 삼성전자, 싸피대학교 등" />
        </label>
      </form>
      <Button
        text="다음"
        type="submit"
        color="gray-blue"
        onClick={signupHandler}
      />
    </div>
  );
}
