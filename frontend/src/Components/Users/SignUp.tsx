import React from "react";
import "../../Styles/SignUpPage.scss";

type Props = {
  setIsSuccess: (value: boolean) => void;
};

export default function SignUp(props: Props) {
  const { setIsSuccess } = props;

  const signupHandler = () => {
    setIsSuccess(true);
  };
  return (
    <div className="singup-page-container">
      <h3>환영합니다!</h3>
      <h5>회원가입을 위해 아래 정보를 입력해주세요.</h5>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-email">
          <h5>이메일</h5>
          <input type="email" placeholder="이메일" id="sign-up-email" />
          <span className="check-text">중복 확인</span>
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-password">
          <h5>비밀번호</h5>
          <input type="password" placeholder="비밀번호" id="sign-up-password" />
          {/* <span className="check-text">중복 확인</span> */}
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-password-check">
          <h5>비밀번호 확인</h5>
          <input
            type="password"
            placeholder="비밀번호 확인"
            id="sign-up-password-check"
          />
          {/* <span className="check-text">중복 확인</span> */}
        </label>
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-nickname">
          <h5>닉네임</h5>
          <input
            type="email"
            placeholder="사용하고 싶은 닉네임을 정해주세요"
            id="sign-up-nickname"
          />
          <span className="check-text">중복 확인</span>
        </label>
        {/* <p>닉네임은 특수문자와 공백 없이 2~10자로 입력해주세요.</p> */}
      </form>
      <form action="submit" className="signup-page-form">
        <label htmlFor="sign-up-company">
          <h5>소속</h5>
          <input
            type="email"
            placeholder="ex) SSAFY, 삼성전자, 싸피대학교 등"
            id="sign-up-company"
          />
        </label>
      </form>
      <button type="submit" onClick={signupHandler}>
        다음
      </button>
    </div>
  );
}
