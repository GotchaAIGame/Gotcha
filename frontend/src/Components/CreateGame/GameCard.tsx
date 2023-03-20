import React, { useState, useRef } from "react";

export default function GameCard() {
  const [inputImage, setInputImage] = useState<string>("");
  const uploadImage = useRef<HTMLInputElement>(null);

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = uploadImage.current?.files;
    if (files && files.length > 0) {
      setInputImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="card-wrapper">
      <header>
        <input type="text" placeholder="문제이름" />
      </header>
      {inputImage ? (
        <div className="upload-img-wrapper">
          <img src={inputImage} alt="" />
        </div>
      ) : (
        <div className="file-input-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={uploadHandler}
            ref={uploadImage}
          />
        </div>
      )}
      <div className="hint-text-box">힌트</div>
      <div className="hint-input-wrapper">
        <input type="text" placeholder="힌트를 추가해 주세요" />
      </div>
    </div>
  );
}
