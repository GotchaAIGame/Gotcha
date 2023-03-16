import React from "react";
import classNames from "classnames";
import "./styles/Button.scss";

interface BtnProps {
  text?: string;
  size?: string;
  color?: string;
  onClick?: any; // 함수 인자 및 return 값 특정 불가
}

function Button({ text, size, color, onClick }: BtnProps) {
  const handleClick = () => onClick();

  return (
    <button
      type="button"
      className={classNames("commonButton", size, color)}
      onClick={onClick && handleClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "",
  size: "large",
  color: "lime",
  onClick: () => {
    return null;
  },
};

export default Button;
