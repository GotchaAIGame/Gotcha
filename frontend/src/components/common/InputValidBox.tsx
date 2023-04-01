import React, {
  MouseEventHandler,
  HTMLAttributes,
  ChangeEventHandler,
} from "react";
import checkImg from "@assets/check.svg";
import "./styles/InputValidBox.scss";

interface InputValidBoxProps
  extends Omit<HTMLAttributes<HTMLInputElement>, "onClick"> {
  type?: string;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function InputValidBox({
  type,
  text,
  onClick,
  onChange,
  checked,
  inputRef,
}: InputValidBoxProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) =>
    onClick && onClick(event);

  console.log(inputRef);

  return (
    <div className="common-input-box-container">
      <input
        type={type}
        placeholder={text}
        onChange={onChange}
        ref={inputRef}
      />
      {!checked ? (
        <button type="button" onClick={handleClick}>
          중복확인
        </button>
      ) : (
        <img src={checkImg} alt="" />
      )}
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
  checked: false,
  inputRef: undefined,
};
