import React, { MouseEventHandler, HTMLAttributes } from "react";
import "./styles/InputValidBox.scss";
import check from "@assets/check.svg";

interface InputValidBoxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onClick"> {
  type?: string;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function InputValidBox({
  type,
  text,
  onClick,
}: InputValidBoxProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) =>
    onClick && onClick(event);

  return (
    <div className="inputvalidBoxContainer">
      <input type={type} placeholder={text} />
      <button type="button" onClick={handleClick}>
        중복확인
      </button>
    </div>
  );
}

InputValidBox.defaultProps = {
  type: "text",
  text: "",
  onClick: () => {
    return null;
  },
};
