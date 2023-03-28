import React, {
  MouseEventHandler,
  HTMLAttributes,
  ChangeEventHandler,
} from "react";
import "./styles/InputValidBox.scss";

interface InputValidBoxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onClick"> {
  type?: string;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function InputValidBox({
  type,
  text,
  onClick,
  onChange,
}: InputValidBoxProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) =>
    onClick && onClick(event);

  return (
    <div className="inputvalidBoxContainer">
      <input type={type} placeholder={text} onChange={onChange} />
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
  onChange: () => {
    return null;
  },
};
