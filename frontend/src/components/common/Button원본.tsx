/* eslint-disable react/button-has-type */
import React from "react";
import classNames from "classnames";
import "./styles/Button.scss";
import google from "@assets/google.svg"
import kakao from "@assets/kakao.svg";

interface BtnProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  size?: string;
  color?: string;
  onClick?: any; // 함수 인자 및 return 값 특정 불가
}

function Button({ text, type, size, color, onClick, ...rest }: BtnProps) {
  const handleClick = () => onClick();

  return (
    <div>
      {color === "google" || color === "kakao" ? (
        <button
          type="button"
          className={classNames("commonButton", size, color)}
          onClick={onClick && handleClick}
          {...rest}
          >
          <img src={google} alt="로고"/>
          {text}
        </button>
      ) : (
        <button
          type={type}
          className={classNames("commonButton", size, color)}
          onClick={onClick && handleClick}
          {...rest}
          >
          {text}
        </button>
      )}
    </div>
  );
}

Button.defaultProps = {
  text: "",
  type: "button",
  size: "large",
  color: "lime",
  onClick: () => {
    return null;
  },
};

export default Button;
