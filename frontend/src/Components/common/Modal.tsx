import React, { useState } from "react";
import "./Modal.scss";
import exclamation from "@assets/exclamation.svg";

interface modalProps {
  open: boolean; // to check if modal should be opened or not
  className?: string; // the modal's name
  children?: any; // sames as props.children
  overlay?: boolean; // if true, make background overlay black
  btnType?: number; // 0 : no buttons, 1 : one small button, 2 : two small buttons, 3 : one big button
  exclamationType?: "inside" | "outside"; // if inside, exclamation mark located inside.
  closeType?: boolean; // if true, explicitly shows close botton on the right top corner
  modalHandler: () => void; // modal handler function
  mainBtnHandler?: () => void; // function for the main button
}

function Modal(props: modalProps) {
  const {
    open,
    className,
    children,
    overlay,
    btnType,
    exclamationType,
    closeType,
  } = props;
  const { modalHandler, mainBtnHandler } = props;
  console.log(exclamationType);

  if (open) {
    return (
      <div className={className?.concat(" modal-wrapper")}>
        <div
          className={overlay ? "overlay black" : "overlay"}
          onClick={() => {
            modalHandler();
          }}
          onKeyDown={() => {
            modalHandler();
          }}
          role="presentation"
        >
          {" "}
        </div>
        <div className="modal-content">
          <div className={exclamationType?.concat(" exclamation")}>
            <img src={exclamation} alt="exclamation" />
          </div>
          {children}
        </div>
      </div>
    );
  }

  return null;
}

export default Modal;

Modal.defaultProps = {
  className: "modal",
  children: null,
  overlay: true,
  btnType: 0,
  exclamationType: "inside",
  closeType: false,
  mainBtnHandler: () => null,
};
