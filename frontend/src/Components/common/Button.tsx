/* eslint-disable react/button-has-type */
import React from "react";
import classNames from "classnames";
import "./styles/Button.scss";

interface BtnProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  size?: string;
  color?: string;
}

function Button({ text, type, size, color, ...rest }: BtnProps) {
  return (
    // eslint-disable-next-line react/button-has-type 
    // type땜에 넣었음
    <button
      type={type}
      className={classNames("commonButton", size, color)}
      {...rest}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "",
  type: "button",
  size: "large",
  color: "lime",
};

export default Button;
