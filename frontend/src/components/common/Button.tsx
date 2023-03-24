/* eslint-disable react/button-has-type */
import React from "react";
import classNames from "classnames";
import "./styles/Button.scss";
import googleImg from "@assets/google.svg";
import kakaoImg from "@assets/kakao.svg";

interface BtnProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  size?: string;
  color?: string;
  onClick?: any; // 함수 인자 및 return 값 특정 불가
}

function Button({ text, type, size, color, onClick, ...rest }: BtnProps) {
  const handleClick = () => onClick();

  let imgSrc = null;
  if (color === "google") {
    imgSrc = googleImg;
  } else if (color === "kakao") {
    imgSrc = kakaoImg;
  }

  return (
    <button
      type={type}
      className={classNames("commonButton", size, color)}
      onClick={onClick && handleClick}
      {...rest}
    >
      {imgSrc && <img src={imgSrc} alt="로고" />}
      {text}
    </button>
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
