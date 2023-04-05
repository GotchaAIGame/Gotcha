import React, { useState, useEffect } from "react";
import closeButton from "@assets/smallDeleteButton.svg";

export default function GameCard(Props: any) {
  const { idx, cardNameRef, cardHintRef, cardImageRef, deleteHandler } = Props;
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [inputImage, setInputImage] = useState<string>("");

  // // 이미지를 업로드 했을 때 실행
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = cardImageRef.current?.files;

    if (files && files.length > 0) {
      const f: File = files[files.length - 1];

      const reader: FileReader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>): void {
        setInputImage(e.target?.result as string);
      };

      reader.readAsDataURL(f);
    }
    handleChange();
  };

  // 변경점 찾기
  const handleChange = () => {
    const nameValue = cardNameRef.current?.value as string;
    const hintValue = cardHintRef.current?.value as string;
    const inputValue = cardImageRef.current?.value as string;

    const temp = cardImageRef.current?.files;

    if (nameValue.length && hintValue.length && inputValue.length) {
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  };

  return (
    <div>
      <div
        className="card-wrapper"
        title={isTyping ? "문제 내용을 입력해주세요" : ""}
      >
        <header className={isTyping ? "typing-header" : "typed-header"}>
          <button
            type="button"
            onClick={() => {
              deleteHandler(idx);
            }}
          >
            <img src={closeButton} alt="문제 삭제" />
          </button>

          <input
            type="text"
            placeholder="문제 이름을 입력해주세요"
            id={`name-${idx}`}
            ref={cardNameRef}
            maxLength={14}
            onChange={handleChange}
          />
        </header>
        <div className="file-input-wrapper">
          <label htmlFor={`upload-${idx}`} className="file-input-label">
            {!inputImage ? (
              <>
                <p className="file-input-label-plus">+</p>
                <p className="file-input-label-text">
                  대표사진
                  <br />
                  추가하기
                </p>
              </>
            ) : (
              <div className="upload-img-wrapper">
                <img src={inputImage} alt="" />
              </div>
            )}
            <input
              id={`upload-${idx}`}
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={uploadHandler}
              ref={cardImageRef}
            />
          </label>
        </div>
        <div className={isTyping ? "typing-hint-text-box" : "hint-text-box"}>
          힌트
        </div>
        <div className="hint-input-wrapper">
          <input
            type="text"
            id={`hint-${idx}`}
            placeholder="힌트를 추가해 주세요"
            onChange={handleChange}
            ref={cardHintRef}
          />
        </div>
      </div>
    </div>
  );
}
