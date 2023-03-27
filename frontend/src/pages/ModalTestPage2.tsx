import React, { useState, useEffect } from "react";
import ProgressBar from "@components/Game/ProgressBar";
import right from "@assets/right.svg";
import wrong from "@assets/wrong.svg";

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

  const modalHandler = () => {
    setModalOpen1(!modalOpen1);
    setResultStatus(0);
  };

  const resultHandler = (status: number) => {
    setResultStatus(status);
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
    </>
  );
}
