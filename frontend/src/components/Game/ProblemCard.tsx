import React, { useRef, useState } from "react";
import { useAppSelector } from "@stores/storeHooks";
import Cropper, { ReactCropperElement } from "react-cropper";
import { gamePlayAPI } from "@apis/apis";

import "@styles/cropper.scss";
import right from "@assets/right.svg";
import Button from "@components/common/Button";
import AIModal from "./AIModal";

interface problemProps {
  problem: {
    problemId: number;
    problemName: string;
    problemDesc: string;
    problemImgURL: string;
  };
  index: string;
  solved: boolean;
}

function ProblemCard(props: problemProps) {
  const { themeColor } = useAppSelector((state) => state.theme);

  const uploadImage = useRef<HTMLInputElement>(null);
  const croppedImageRef = useRef<ReactCropperElement>(null);

  const [hintOpen, setHintOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [AIModalOpen, setAIModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [Image, setImage] = useState<string>("");

  const { problem, index, solved } = props;
  const { problemName, problemImgURL, problemId } = problem;
  const [problemHint, setProblemHint] = useState("");

  const cropperHandler = () => {
    if (typeof croppedImageRef.current?.cropper !== "undefined") {
      const tempCroppedImage = croppedImageRef.current?.cropper
        .getCroppedCanvas({ maxHeight: 360, maxWidth: 360 })
        .toDataURL();

      setCroppedImage(tempCroppedImage);
      setAIModalOpen(true);
    }
  };

  const uploadHandler = () => {
    const files = uploadImage.current?.files;
    if (files && files.length) {
      const fileURL = URL.createObjectURL(files[0]);
      setEditorOpen(true);
      setImage(fileURL);
    }
  };

  const hintHandler = () => {
    setHintOpen(!hintOpen);
    if (!problemHint) {
      gamePlayAPI.getHint(problemId).then((res) => {
        const hint = res.data.result;
        setProblemHint(hint);
      });
    }
  };

  const editorHandler = () => {
    setEditorOpen(false);
    setImage("");
    if (uploadImage.current) {
      uploadImage.current.value = "";
    }
  };

  return (
    <>
      <div className="outer-card-wrapper">
        <div
          className="problem-title-container"
          style={{ backgroundColor: `${themeColor}` }}
        >
          <h5>{problemName}</h5>
        </div>
        <div className="inner-card-container">
          <div className="original-image-container">
            <div className="problem-hint-button">
              <Button
                text="hint"
                size="xxsmall"
                onClick={() => {
                  hintHandler();
                }}
              />
            </div>
            {hintOpen && (
              <div className="problem-hint-description">
                <p className="hint-text"> {problemHint} </p>
              </div>
            )}
            <img
              src={problemImgURL}
              alt={problemName}
              // 이미지 우클릭 방지
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              onDragStart={(e) => {
                e.preventDefault();
              }}
            />
          </div>

          <div className="input-image-container">
            {solved ? (
              <div className="problem-right-box-container">
                <img src={right} alt="right" />
                <p>맞춘 문제입니다!</p>
              </div>
            ) : (
              <form className="empty-image-container">
                <label htmlFor={`upload ${index}`}>
                  <p className="plus"> + </p>
                  <h5 id="take-pic"> 사진 찍기 </h5>
                  <input
                    id={`upload ${index}`}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    ref={uploadImage}
                    onChange={uploadHandler}
                    className="invisible"
                  />
                </label>
              </form>
            )}
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
                src={Image}
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
                ref={croppedImageRef}
              />
            </div>
            <div className="image-editor-buttons">
              <Button
                text="제출하기"
                color="skyblue"
                onClick={() => {
                  cropperHandler();
                  editorHandler();
                }}
              />
            </div>
          </div>
        </div>
      )}
      <AIModal
        index={index}
        problemImage={problemImgURL}
        imageURL={croppedImage}
        open={AIModalOpen}
        openHandler={() => setAIModalOpen(false)}
      />
    </>
  );
}

export default ProblemCard;
