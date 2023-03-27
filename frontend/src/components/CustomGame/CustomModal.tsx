import React, { useState, Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGameCustom } from "@stores/game/gameSlice";
import Button from "@components/common/Button";
import closeImg from "@assets/closeButton.svg";
import LogoInput from "./LogoInput";
import ColorInput from "./ColorInput";
import RewardsList from "./RewardsList";

interface modalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CustomModal({ isOpen, setIsOpen }: modalProps) {
  const [themeImg, setThemeImg] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string>("5551FF");

  const dispatch = useDispatch();

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  // img Base64 인코딩 후 저장
  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>): void {
        const base64 = e.target?.result as string;
        setThemeImg(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const colorHandler = useCallback(
    (color: string) => {
      setThemeColor(color);
      const brandColor = color;
      const logoUrl = themeImg;
      dispatch(setGameCustom({ brandColor, logoUrl }));
    },
    [themeColor]
  );

  return (
    <div
      className="custom-modal-container"
      style={isOpen ? { right: "0" } : { left: "120%" }}
    >
      <button type="button" onClick={modalHandler} className="close-button">
        <img src={closeImg} alt="닫기" />
      </button>
      <LogoInput />
      <ColorInput />
      <button type="button" className="add-reward-button">
        <p className="plus-button">+</p>
        <p>경품 등록하기</p>
      </button>
      <RewardsList />
      <br />
      <Button size="medium" text="확인" />
    </div>
  );
}
