import React, { useState, useRef, useEffect } from "react";
import closeButton from "@assets/closeButton.svg";

export default function GameCard(Props: any) {
  const key = Props;
  console.log(key);

  const [inputImage, setInputImage] = useState<string>("");
  const uploadImage = useRef<HTMLInputElement>(null);

  // 이미지를 업로드 했을 때 실행
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = uploadImage.current?.files;

    if (files && files.length > 0) {
      // useStateValue Update
      setInputImage(URL.createObjectURL(files[0]));
    }
  };

  useEffect(() => {
    console.log("렌더링!");
  });

  return (
    <div>
      <div className="card-wrapper">
        <header>
          <img src={closeButton} alt="delete-button" />
          <input type="text" placeholder="문제이름" />
        </header>
        {inputImage ? (
          <div className="upload-img-wrapper">
            <img src={inputImage} alt="" />
          </div>
        ) : (
          <div className="file-input-wrapper">
            <label htmlFor="upload" className="file-input-label">
              <p className="file-input-label-plus">+</p>
              <p className="file-input-label-text">
                대표사진
                <br />
                추가하기
              </p>{" "}
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={uploadHandler}
                ref={uploadImage}
              />
            </label>
          </div>
        )}
        <div className="hint-text-box">힌트</div>
        <div className="hint-input-wrapper">
          <input type="text" placeholder="힌트를 추가해 주세요" />
        </div>
      </div>
    </div>
  );
}
