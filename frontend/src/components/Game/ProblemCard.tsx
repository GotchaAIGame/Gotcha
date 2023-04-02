import React, { useRef, useState } from "react";
import { useAppSelector } from "@stores/storeHooks";
import Cropper, { ReactCropperElement } from "react-cropper";

import "@styles/cropper.scss";
import right from "@assets/right.svg"
import Button from "@components/common/Button";
import AIModal from "./AIModal";

interface problemProps {
  problem: {
    problemId: number;
    problemName: string;
    problemDesc: string;
    problemImgURL: string;
  };
  index : string;
  solved : boolean;
}

function ProblemCard(props: problemProps) {
  const { themeColor } = useAppSelector((state) => state.theme);

  const uploadImage = useRef<HTMLInputElement>(null);
  const croppedImageRef = useRef<ReactCropperElement>(null);

  const [editorOpen, setEditorOpen] = useState(false);
  const [AIModalOpen, setAIModalOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string>("");
  const [Image, setImage] = useState<string>("");


  const { problem, index, solved } = props;
  const { problemName, problemImgURL } = problem;

  const cropperHandler = () => {
    // console.log(croppedImageRef.current, "xx")
    if (typeof croppedImageRef.current?.cropper !== "undefined") {
      const tempCroppedImage = croppedImageRef.current?.cropper
        .getCroppedCanvas({maxHeight : 500, maxWidth : 500})
        .toDataURL();

      console.log(croppedImageRef.current?.cropper, "XXXXX")
      setCroppedImage(tempCroppedImage);
      setAIModalOpen(true);
    }
  };

  const uploadHandler = () => {
    const files = uploadImage.current?.files;
    if (files && files.length) {
      const fileURL = URL.createObjectURL(files[0]);
      // console.log(files[0], "xxx")
      setEditorOpen(true);
      setImage(fileURL);
    }
  };

  // console.log(index, "index 받았는데 ㅜㅠ")

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
            <img src={problemImgURL} alt={problemName} />
          </div>

          <div className="input-image-container">
            {solved ? (
              <img
                src={right}
                alt="right"
              />
            ) : (
              <form className="empty-image-container">
                <label htmlFor={`upload ${index}`}>
                  <p className="plus"> + </p>
                  <h5 id="take-pic"> 사진 찍기 </h5>
                  <input
                    id={`upload ${index}`}
                    type="file"
                    accept="image/*"
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
            onClick={() => {
              return setEditorOpen(false);
            }}
            onKeyDown={() => setEditorOpen(false)}
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
                background={false}
                ref={croppedImageRef}
              />
            </div>
            <div className="image-editor-buttons">
              <Button
                text="제출하기"
                color="skyblue"
                onClick={() => {
                  // console.log("안녕하세요");
                  cropperHandler();
                  setEditorOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <AIModal
        index = {index}
        problemImage = {problemImgURL}
        imageURL={croppedImage}
        open={AIModalOpen}
        openHandler={() => setAIModalOpen(false)}
      />
    </>
  );
}

export default ProblemCard;
