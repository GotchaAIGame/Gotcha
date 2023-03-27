import React, { useState, ReactElement } from "react";
import Button from "@components/common/Button";
import "./styles/Modal.scss";
import exclamation from "@assets/exclamation.svg";
import closeButton from "@assets/closeButton.svg";

interface modalProps {
  open: boolean; // to check if modal should be opened or not
  className?: string; // the modal's name
  children?: any; // sames as props.children
  overlay?: boolean; // if true, make background overlay black
  btnType?: "right-one" | "right-two" | "center" | "submit" | "none";
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

  let buttons: ReactElement | string;

  if (btnType === "right-one") {
    buttons = (
      <Button
        size="xxsmall"
        text="확인"
        onClick={() => {
          modalHandler();
        }}
      />
    );
  } else if (btnType === "right-two" && mainBtnHandler) {
    buttons = (
      <>
        <Button
          size="xxsmall"
          text="예"
          color="gray-blue"
          onClick={() => {
            mainBtnHandler();
          }}
        />
        <Button
          size="xxsmall"
          text="아니오"
          onClick={() => {
            modalHandler();
          }}
        />
      </>
    );
  } else if (btnType === "center" && mainBtnHandler) {
    buttons = (
      <Button
        size="small"
        text="더 알아보기"
        color="gray-blue"
        onClick={() => {
          mainBtnHandler();
        }}
      />
    );
  } else if (btnType === "submit") {
    buttons = (
      <Button
        size="xxsmall"
        text="제출하기"
        color="gray"
        onClick={() => {
          modalHandler();
        }}
      />
    );
  } else {
    buttons = " ";
  }

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
          <div
            className={
              closeType
                ? "small-image close"
                : exclamationType?.concat(" small-image")
            }
          >
            {closeType ? (
              <img
                src={closeButton}
                alt="closeButton"
                onClick={() => {
                  modalHandler();
                }}
                onKeyDown={() => {
                  modalHandler();
                }}
              />
            ) : (
              <img src={exclamation} alt="exclamation" />
            )}
          </div>
          <div className="modal-innerText">{children}</div>
          <div className="modal-buttons">{buttons}</div>
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
  btnType: "none",
  exclamationType: "inside",
  closeType: false,
  mainBtnHandler: () => null,
};
