import React, { useState, useEffect, useRef } from "react";
import closeButton from "@assets/smallDeleteButton.svg";
import "@styles/cropper.scss";
import Cropper, { ReactCropperElement } from "react-cropper";
import Button from "@components/common/Button";

export default function GameCard(Props: any) {
  const { idx, cardNameRef, cardHintRef, cardImageRef, deleteHandler } = Props;
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [inputImage, setInputImage] = useState<string>("");
  const [editorOpen, setEditorOpen] = useState(false);

  const originalImageRef = useRef<HTMLInputElement>(null);

  // image cropper handler
  const cropperHandler = () => {
    if (typeof cardImageRef.current?.cropper !== "undefined") {
      const tempCroppedImage = cardImageRef.current?.cropper
        .getCroppedCanvas({ maxHeight: 360, maxWidth: 360 })
        .toDataURL();

      setInputImage(tempCroppedImage);
    }
  };

  // image cropper modal (editor) handler
  const editorHandler = () => {
    setEditorOpen(false);
    // setInputImage("");
    // if (uploadImage.current) {
    //   uploadImage.current.value = "";
    // }
  };

  // // 이미지를 업로드 했을 때 실행
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = originalImageRef.current?.files;
    if (files && files.length) {
      const fileURL = URL.createObjectURL(files[0]);
      setEditorOpen(true);
      setInputImage(fileURL);
    }
    handleChange();
  };

  // 변경점 찾기
  const handleChange = () => {
    const nameValue = cardNameRef.current?.value as string;
    const hintValue = cardHintRef.current?.value as string;
    const inputValue = originalImageRef.current?.value as string;

    if (nameValue.length && hintValue.length && inputValue.length) {
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  };

  return (
    <>
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
                ref={originalImageRef}
              />
            </label>
          </div>
          <div className="card-hint-wrapper">
            <div
              className={isTyping ? "typing-hint-text-box" : "hint-text-box"}
            >
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
      </div>
      {editorOpen && (
        <div className="image-editior-wrapper">
          <div
            className="image-editor-overlay"
            onClick={editorHandler}
            onKeyDown={editorHandler}
            role="presentation"
          />
          <div className="image-editor-content">
            <div className="image-editor-image">
              <Cropper
                src={inputImage}
                style={{
                  maxHeight: "60vh",
                  maxWidth: "90vw",
                  // overflow: "auto",
                }}
                minCropBoxHeight={100}
                minCropBoxWidth={100}
                viewMode={1}
                aspectRatio={1}
                background={false}
                ref={cardImageRef}
              />
            </div>
            <div className="image-editor-buttons">
              <Button
                text="제출하기"
                color="skyblue"
                onClick={() => {
                  editorHandler();
                  cropperHandler();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
