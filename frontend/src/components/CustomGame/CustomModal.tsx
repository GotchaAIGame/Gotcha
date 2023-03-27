import React, { Dispatch, SetStateAction } from "react";
import closeImg from "@assets/closeButton.svg";

interface modalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CustomModal({ isOpen, setIsOpen }: modalProps) {
  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="custom-modal-container"
      style={isOpen ? { right: "0" } : { left: "120%" }}
    >
      <button type="button" onClick={modalHandler}>
        <img src={closeImg} alt="닫기" />
      </button>
      <div className="modal-input-container">
        <p>로고 이미지</p>
        <input type="file" />
        <p>로고 이미지 최대 320*100</p>
      </div>
      <div className="modal-input-container">
        <p>테마 색깔</p>
      </div>
      <input type="text" />
    </div>
  );
}
