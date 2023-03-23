import React, { useState } from "react";

interface AIModalProps {
  originalImage: string; // 출제자가 설정한 이미지
  userImage: string; // 유저가 제출한 이미지
  open: boolean; // 모달을 켜기 위한 변수
  modalHandler: () => void; // 모달을 끄기 위한 함수
}

function AIModal(props: AIModalProps) {
  const { originalImage, userImage, open, modalHandler } = props;
  const [closable, setClosable] = useState(true);

  const modalCloseHandler = () => {
    if (closable) {
      console.log("모달 끈다.");
      modalHandler();
    } else {
      console.log("모달 못 끈다. ㅋㅋ");
    }
  };

  if (open) {
    return (
      <div className="AIModal-wrapper">
        <div
          className="AIModal-overlay"
          onClick={() => {
            modalCloseHandler();
          }}
          onKeyDown={() => {
            modalCloseHandler();
          }}
          role="presentation"
        >
          <div className="AIModal-content-container">
            <div className="AIModal-content-result">
              <p>사진이 들어간다</p>
            </div>
            <div className="AIModal-content-description">
              <h1 className="blue"> AI 판독중... </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default AIModal;
