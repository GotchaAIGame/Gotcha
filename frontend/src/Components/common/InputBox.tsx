import React from "react";
import "./styles/InputBox.scss";
import classNames from "classnames";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  txt?: string;
  type?: string;
}

export default function InputBox({ txt, type, ...rest }: InputBoxProps) {
  return (
    <input
      className={classNames("inputBoxWrapper")}
      type={type}
      placeholder={txt}
      {...rest}
    />
  );
}

InputBox.defaultProps = {
  txt: "",
  type: "text",
};
