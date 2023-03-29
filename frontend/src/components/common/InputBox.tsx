import React, { ChangeEventHandler, useRef } from "react";
import checkImg from "@assets/check.svg";
import "./styles/InputBox.scss";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
}

export default function InputBox({
  text,
  type,
  onChange,
  checked,
  ...rest
}: InputBoxProps) {
  return (
    <div className="common-input-box-container">
      <input
        type={type}
        placeholder={text}
        onChange={onChange}
        {...rest}
      />
      {checked && <img src={checkImg} alt="" />}
    </div>
  );
}

InputBox.defaultProps = {
  text: "",
  type: "text",
  onChange: () => {
    return null;
  },
  checked: false,
};
