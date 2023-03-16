import React, { useState } from "react";
import "./styles/InputBox.scss";
import classNames from "classnames";

interface InputBoxProps {
  txt?: string;
  type?: string;
}

export default function InputBox({ txt, type }: InputBoxProps) {
  const [inputText, setInputText] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <input
      className={classNames("inputBoxWrapper")}
      type={type}
      placeholder={txt}
      onChange={onChangeHandler}
      value={inputText}
    />
  );
}

InputBox.defaultProps = {
  txt: "",
  type: "text",
};
