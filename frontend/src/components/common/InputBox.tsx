import React, { ChangeEventHandler } from "react";
import "./styles/InputBox.scss";
import classNames from "classnames";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function InputBox({
  text,
  type,
  onChange,
  ...rest
}: InputBoxProps) {
  return (
    <input
      className={classNames("inputBoxWrapper")}
      type={type}
      placeholder={text}
      onChange={onChange}
      {...rest}
    />
  );
}

InputBox.defaultProps = {
  text: "",
  type: "text",
  onChange: () => {
    return null;
  },
};
