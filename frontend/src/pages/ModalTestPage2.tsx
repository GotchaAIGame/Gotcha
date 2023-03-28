import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import ProgressBar from "@components/Game/ProgressBar";
import right from "@assets/right.svg";
import wrong from "@assets/wrong.svg";
import { MLAPI, memberAPI } from "@apis/apis";
import axios from "axios";

interface AIModalProps {
  open: boolean;
  openHandler: () => void;
  resultStatus: number;
  resultHandler: (status: number) => void;
}

function AIModal(props: AIModalProps) {
  const { open, openHandler, resultStatus, resultHandler } = props;

  if (open) {
    return (
      <div className="AIModal-wrapper">
        <div
          className="AIModal-overlay"
          onClick={openHandler}
          onKeyDown={openHandler}
          role="presentation"
        >
          <div className="AIModal-content">
            <h2>Modal</h2>
            <div className="AIModal-evaluation">
              <div className="circular-img">
                {resultStatus === 1 && (
                  <img src={right} alt={right} className="right" />
                )}
                {resultStatus === 2 && (
                  <img src={wrong} alt={wrong} className="wrong" />
                )}
              </div>
              <ProgressBar
                resultHandler={(status: number) => {
                  resultHandler(status);
                }}
              />
            </div>
            <div className="AIModal-description">
              {resultStatus === 0 && <h1 className="blue"> AI 판독중 ... </h1>}
              {resultStatus === 1 && <h1 className="green"> 맞았습니다! </h1>}
              {resultStatus === 2 && (
                <h1 className="orange"> 틀렸습니다! ㅋㅋ </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function ModalTestPage2() {
  const [modalOpen1, setModalOpen1] = useState(false);
  const [resultStatus, setResultStatus] = useState(0); // 0 : loading, 1 : correct, 2: wrong

  const imgURL =
    "https://user-images.githubusercontent.com/47023884/225485195-f44d038c-a859-436c-ba1a-fb27c7414062.png";

  const inputRef = useRef<HTMLInputElement>(null);

  const modalHandler = () => {
    setModalOpen1(!modalOpen1);
    setResultStatus(0);
  };

  const resultHandler = (status: number) => {
    setResultStatus(status);
  };

  const predictHandler: MouseEventHandler = async (e) => {
    e.preventDefault();

    const files = inputRef.current?.files;
    const formData: FormData = new FormData();

    if (files && files.length) {
      formData.append("inputImage", files[0]);
      formData.append("originalUrl", imgURL);

      const result = await MLAPI.predict(formData);
      console.log(result);
    }
  };

  return (
    <>
      <div>
        <h2> 모달 테스트2 </h2>
        <button type="button" onClick={modalHandler}>
          테스트 버튼
        </button>
      </div>
      <AIModal
        open={modalOpen1}
        openHandler={() => {
          modalHandler();
        }}
        resultStatus={resultStatus}
        resultHandler={resultHandler}
      />
      <div className="ml-test-div">
        <p> 원본 데이터 </p>
        <img src={imgURL} alt="원본" height="300px" />
        <form>
          <label htmlFor="upload">
            <input id="upload" type="file" accept="image/*" ref={inputRef} />
            <button type="submit" onClick={predictHandler}>
              제출하기
            </button>
          </label>
        </form>
      </div>
    </>
  );
}
