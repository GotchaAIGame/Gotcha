import React from "react";
import "./styles/InputBox.scss";
import classNames from "classnames";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  type?: string;
}

export default function InputBox({ text, type, ...rest }: InputBoxProps) {
  return (
    <input
      className={classNames("inputBoxWrapper")}
      type={type}
      placeholder={text}
      {...rest}
    />
  );
}

InputBox.defaultProps = {
  text: "",
  type: "text",
};
