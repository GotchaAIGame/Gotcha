import React, { useState } from "react";
import plusBtn from "@assets/smallPlusButton.svg";
import deleteBtn from "@assets/smallDeleteButton.svg";

export default function UrlInput(props: any) {
  const { themeColor, colorHandler } = props;
  const [isUrldOpen, setUrlOpen] = useState<boolean>(false);

  // const colorHandler = (color: string) => {
  //   setThemeColor(color);
  // };

  const urlHandler = () => {
    setUrlOpen(!isUrldOpen);
  };

  return (
    <div
      className="url-input-container"
      style={isUrldOpen ? { minHeight: "110px" } : { minHeight: "85px" }}
    >
      <div className="modal-input-header">
        <p>이벤트 URL</p>
        <button type="button" onClick={urlHandler}>
          {isUrldOpen ? (
            <img src={deleteBtn} alt="" />
          ) : (
            <img src={plusBtn} alt="" />
          )}
        </button>
      </div>
      {isUrldOpen ? (
        <input type="url" placeholder="행사 URL을 입력해주세요" />
      ) : (
        <div className="empty-bottom-box" />
      )}
    </div>
  );
}
