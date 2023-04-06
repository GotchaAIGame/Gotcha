/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from "react";
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
}

export default function SignUp(props: Props) {
  // 회원가잆을 위한 값 (중복확인 완료된 내용으로만 저장)
  const [userInfo, setUserInfo] = useState<IuserInfo>({
    nickname: "",
    password: "",
    organization: "",
    email: "",
  });
  // 중복 확인을 위한 값
  const [nicknameInput, SetNicknameInput] = useState<string>("");
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);
  const [emailInput, SetEmailInput] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  // 비밀번호 유효성 검사를 위한 값
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(false);
  // 비밀번호 확인 값
  const [isDoubleChecked, setIsDoubleChecked] = useState<boolean>(false);

  // 가입 성공 여부
  const { setIsSuccess } = props;

  // email 갱신 (onChange)
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const newEmail = target.value;
      SetEmailInput(newEmail);
    }
    setEmailValid(false);
  };
  // email 중복확인 (onClick)
  const emailChecker = (e: any) => {
    e.preventDefault();
    // email 형식 여부 확인
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    // email 형식 통과
    if (regex.test(emailInput)) {
      const result = memberAPI.duplicateEmail(emailInput);
      result
        .then((res) => {
          // 중복이 아닐 때
          if (res.data.result === false) {
            const newEmail = emailInput;
            const newUserInfo = { ...userInfo };
            newUserInfo.email = newEmail;
            setUserInfo(newUserInfo);
            setEmailValid(true);
            alert("사용가능한 이메일입니다.");
          } else {
            alert("중복된 이메일입니다.");
          }
        })
        .catch((res) => {
          alert(res);
        });
    } else {
      alert("이메일 형식을 사용해주세요.");
    }
  };

  // password 유효성 검사
  const passwordChecker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const newPassword = target.value;
      setPasswordInput(newPassword);
      // 유효성 검사
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      setPasswordValid(regex.test(newPassword));
    }
  };

  // password double Check
  const passwordDoubleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const newPassword = target.value;
      if (newPassword === passwordInput) {
        setIsDoubleChecked(true);
        // doble Check 되면 회원가입에 보낼 값 갱신
        const newUserInfo = { ...userInfo };
        newUserInfo.password = passwordInput;
        setUserInfo(newUserInfo);
      } else {
        setIsDoubleChecked(false);
      }
    }
  };

  // nickname 입력값 갱신
  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const newNickname = target.value;
      SetNicknameInput(newNickname);
    }
    setNicknameValid(false);
  };

  // nickname 중복검사
  const nicknameChecker = (e: any) => {
    e.preventDefault();
    // email 형식 여부 확인
    const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    // console.log(regex.test(nicknameInput));
    // email 형식 통과
    if (regex.test(nicknameInput)) {
      const result = memberAPI.duplicateNickName(nicknameInput);
      result
        .then((res) => {
          // 중복이 아닐 때
          if (res.data.result === false) {
            const newNickname = nicknameInput;
            const newUserInfo = { ...userInfo };
            newUserInfo.nickname = newNickname;
            setUserInfo(newUserInfo);
            setNicknameValid(true);
            alert("사용 가능한 닉네임입니다!");
          } else {
            alert("중복된 닉네임입니다.");
          }
        })
        .catch((res) => {
          alert(res);
        });
    } else {
      alert("특수문자와 공백 없이 2~10자로 입력해주세요.");
    }
  };

  // 소속 입력값 갱신
  const organizationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const newOrg = target.value;
      const newUserInfo = { ...userInfo };
      newUserInfo.organization = newOrg;
      setUserInfo(newUserInfo);
    }
  };

  // 회원가입 처리
  const signupHandler = () => {
    const validValue = (userInfo.email, userInfo.nickname, userInfo.password);
    if (validValue) {
      const result = memberAPI.signUp(userInfo);
      result
        .then((res) => {
          // console.log(res);
          alert(`${userInfo.nickname} 님 가입이 완료되었습니다!`);
          setIsSuccess(true);
        })
        .catch((res) => {
          alert(res);
        });

      // setIsSuccess(true);
    }
  };

  // keydown handler
  useEffect(() => {
    const formTags = document.querySelectorAll("form");
    formTags.forEach((tag, key) => {
      console.log(tag, key);
      tag.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
    });
  }, []);

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
            checked={emailValid}
          />
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-password">
          <h5>비밀번호</h5>
          <InputBox
            type="password"
            text="비밀번호"
            onChange={passwordChecker}
            checked={passwordValid}
          />
          {!passwordValid && (
            <p className="passwod-intro">
              ※ 비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를 혼합하여
              8~20자로 입력해주세요.
            </p>
          )}
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-password-check">
          <h5>비밀번호 확인</h5>
          <InputBox
            type="password"
            text="비밀번호 확인"
            onChange={passwordDoubleCheck}
            checked={isDoubleChecked}
          />
          {!isDoubleChecked && (
            <p className="passwod-intro">한 번 더 입력해 주세요.</p>
          )}
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-nickname">
          <h5>닉네임</h5>
          <InputValidBox
            type="text"
            text="닉네임"
            onClick={nicknameChecker}
            onChange={nicknameHandler}
            checked={nicknameValid}
          />
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
          <InputBox
            type="text"
            text="ex) SSAFY, 삼성전자, 싸피대학교 등"
            onChange={organizationHandler}
          />
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
