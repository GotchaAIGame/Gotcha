/* eslint-disable react/no-unknown-property */
/* eslint-disable react/button-has-type */
import React from "react";
import classNames from "classnames";
import { lighten, darken } from "polished";
import "./styles/Button.scss";
import googleImg from "@assets/google.svg";
import kakaoImg from "@assets/kakao.svg";

interface BtnProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  size?: string;
  color?: string;
  themeColor?: string;
  style?: React.CSSProperties;
  onClick?: any; // 함수 인자 및 return 값 특정 불가
}

function Button({
  text,
  type,
  size,
  color,
  onClick,
  themeColor,
  style,
}: BtnProps) {
  const handleClick = (e: any) => onClick(e);

  let imgSrc = null;
  if (color === "google") {
    imgSrc = googleImg;
  } else if (color === "kakao") {
    imgSrc = kakaoImg;
  }

  const buttonStyles = (themeColor: string) => ({
    background: themeColor,
    "&:hover, &:active": {
      background: `lighten(${themeColor}, 0.1)`,
      border: `1px solid ${themeColor}`,
      boxShadow: `1.5px 2px 1px darken(${themeColor}, 0.1) !important`,
    },
  });

  return (
    <button
      type={type}
      className={classNames("commonButton", size, color)}
      onClick={onClick && handleClick}
      // style={buttonStyles(themeColor || "")}
      style={{ ...buttonStyles, ...style }}
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
  themeColor: "",
  style: "",
  onClick: () => {
    return null;
  },
};

export default Button;
