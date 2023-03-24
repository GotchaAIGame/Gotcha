import React, { useState, useEffect } from "react";
import ProgressBar from "@components/Game/ProgressBar";

interface AIModalProps {
  open: boolean;
  openHandler: () => void;
}

function AIModal(props: AIModalProps) {
  const { open, openHandler } = props;
  const [onLoading, setOnLoading] = useState(true);
  const [isCorrect, setisCorrect] = useState(false);

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
              <div className="circular-img"> 이미지 큭큭 </div>
              <ProgressBar />
            </div>
            <div className="AIModal-description">
              {onLoading && <h1 className="blue"> AI 판독중 ... </h1>}
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

  const modalHandler = () => {
    setModalOpen1(!modalOpen1);
  };

  return (
    <>
      <div>
        <ProgressBar />
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
      />
    </>
  );
}
