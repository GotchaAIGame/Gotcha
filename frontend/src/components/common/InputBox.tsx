import React, { ChangeEventHandler, forwardRef } from "react";
import checkImg from "@assets/check.svg";
import "./styles/InputBox.scss";

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  text?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
}

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  ({ text, type, onChange, checked, ...rest }, ref) => {
    return (
      <div className="common-input-box-container">
        <input
          type={type}
          placeholder={text}
          onChange={onChange}
          ref={ref}
          {...rest}
        />
        {checked && <img src={checkImg} alt="" />}
      </div>
    );
  }
);

InputBox.defaultProps = {
  text: "",
  type: "text",
  onChange: () => {
    return null;
  },
  checked: false,
};

export default InputBox;
