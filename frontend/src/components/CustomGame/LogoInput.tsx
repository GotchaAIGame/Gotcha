import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function LogoInput(props: any) {
  // const [themeImg, setThemeImg] = useState<string>("");
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);

  const { imgHandler } = props;
  // const { imgHandler, themeLogo } = props;

  return (
    <div className="logo-input-container">
      <div className="modal-input-header">
        <p>로고 이미지</p>
      </div>
      <div className="file-input-wrapper">
        {themeLogo ? (
          <div>
            <label htmlFor="upload-brand-logo" className="file-input-label">
              <p>임시 미리보기</p>
              <img src={themeLogo} id="temp" alt="logo" />
              <input
                id="upload-brand-logo"
                type="file"
                accept="image/*"
                onChange={imgHandler}
                // ref={themeLogo}
              />
            </label>
          </div>
        ) : (
          <label htmlFor="upload-brand-logo" className="file-input-label">
            <p className="file-input-label-plus">+</p>
            <p className="file-input-label-text">추가하기</p>
            <input
              id="upload-brand-logo"
              type="file"
              accept="image/*"
              onChange={imgHandler}
              // ref={themeLogo}
            />
          </label>
        )}
      </div>
      <p>로고 이미지 최대 320*100</p>
    </div>
  );
}
