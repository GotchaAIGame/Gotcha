import React from "react";
import ProgressBar from "@components/Game/ProgressBar";
import right from "@assets/right.svg";
import wrong from "@assets/wrong.svg";

interface AIModalProps {
  imageURL: string;
  open: boolean;
  openHandler: () => void;
  resultStatus: number;
  resultHandler: (status: number) => void;
}

function AIModal(props: AIModalProps) {
  const { open, openHandler, resultStatus, resultHandler, imageURL } = props;

  if (open) {
    return (
      <div className="AIModal-wrapper">
        <div
          className="AIModal-overlay"
          onClick={() => {
            resultHandler(0);
            openHandler();
            console.log(resultStatus, "X");
          }}
          onKeyDown={() => {
            resultHandler(0);
            openHandler();
          }}
          role="presentation"
        >
          <div className="AIModal-content">
            <h2>Modal</h2>
            <div className="AIModal-evaluation">
              <div className="circular-img">
                <img src={imageURL} alt="원형 이미지" />
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

export default AIModal;
