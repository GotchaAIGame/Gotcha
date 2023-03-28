import React, { useState } from "react";

export default function LogoInput() {
  const [themeImg, setThemeImg] = useState<string>("");

  return (
    <div className="logo-input-container">
      <div className="modal-input-header">
        <p>로고 이미지</p>
      </div>
      {themeImg && <p>임시 미리보기</p>}
      <img src={themeImg} alt="logo" />
      <div className="file-input-wrapper">
        <label htmlFor="upload" className="file-input-label">
          <p className="file-input-label-plus">+</p>
          <p className="file-input-label-text">추가하기</p>
          <input
            id="upload"
            type="file"
            accept="image/*"
            // onChange={uploadHandler}
            // ref={uploadImage}
          />
        </label>
      </div>
      <p>로고 이미지 최대 320*100</p>
    </div>
  );
}
