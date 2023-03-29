import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "@styles/cropper.scss";
import Button from "@components/common/Button";

interface problemProps {
  problem: {
    problemId: number;
    problemName: string;
    problemDesc: string;
    problemImgURL: string;
  };
}

function ProblemCard(props: problemProps) {
  const uploadImage = useRef<HTMLInputElement>(null);
  const { problem } = props;
  const { problemId, problemName, problemDesc, problemImgURL } = problem;
  const [open, setOpen] = useState(false);
  const [Image, setImage] = useState<string>("");

  const hasImage = false;

  const uploadHandler = () => {
    const files = uploadImage.current?.files;
    if (files && files.length) {
      const fileURL = URL.createObjectURL(files[0]);
      setOpen(true);
      setImage(fileURL);
    }
  };

  return (
    <div className="outer-card-wrapper">
      <div className="problem-title-container">
        <h5>{problemName}</h5>
      </div>
      <div className="inner-card-container">
        <div className="original-image-container">
          <img src={problemImgURL} alt={problemName} />
        </div>
        <div className="input-image-container">
          {hasImage ? (
            <img
              src="https://user-images.githubusercontent.com/47023884/225485195-f44d038c-a859-436c-ba1a-fb27c7414062.png"
              alt="yuegui"
            />
          ) : (
            <form className="empty-image-container">
              <label htmlFor="upload">
                <p className="plus"> + </p>
                <h5 id="take-pic"> 사진 찍기 </h5>
                <input
                  id="upload"
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
      {open && (
        <div className="image-editior-wrapper">
          <div
            className="image-editor-overlay"
            onClick={() => {
              console.log("하하");
              return setOpen(false);
            }}
            role="presentation"
          >
            <div className="image-editor-content">
              <div className="image-editor-image">
                <Cropper
                  src={Image}
                  style={{
                    maxHeight: "70vh",
                    maxWidth: "80vw",
                    overflow: "auto",
                  }}
                  background
                  minCropBoxHeight={100}
                  minCropBoxWidth={100}
                  viewMode={1}
                />
              </div>
              <div className="image-editor-buttons">
                <Button text="제출하기" color="skyblue" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemCard;
