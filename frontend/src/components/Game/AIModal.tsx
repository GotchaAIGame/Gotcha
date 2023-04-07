import React, { useState } from "react";
import ProgressBar from "@components/Game/ProgressBar";
import right from "@assets/right.svg";
import wrong from "@assets/wrong.svg";
import { useSelector } from "react-redux";

interface AIModalProps {
  problemImage: string;
  imageURL: string;
  open: boolean;
  openHandler: () => void;
  index: string;
}

function AIModal(props: AIModalProps) {
  const { open, openHandler, imageURL, problemImage, index } = props;
  const [resultStatus, setResultStatus] = useState(0);
  const [similarity, setSimilarity] = useState(0);

  const themeBg = useSelector((state: any) => state.theme.themeColor);

  if (open) {
    return (
      <div className="AIModal-wrapper">
        <div
          className="AIModal-overlay"
          onClick={() => {
            setResultStatus(0);
            setSimilarity(0);
            openHandler();
          }}
          onKeyDown={() => {
            setResultStatus(0);
            setSimilarity(0);
            openHandler();
          }}
          role="presentation"
        >
          <div
            className="AIModal-content"
            style={{ backgroundColor: `${themeBg}` }}
          >
            {/* <h2> 채점 화면 </h2> */}
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
                  setResultStatus(status);
                }}
                similarityHandler={(similarity: number) => {
                  setSimilarity(similarity);
                }}
                imageUrl={imageURL}
                problemImage={problemImage}
                index={index}
              />
            </div>
            <div className="AIModal-description">
              {resultStatus === 0 && (
                <h1 className="blue"> AI 판독중 . . . </h1>
              )}
              {resultStatus === 1 && (
                <>
                  <h1 className="green"> Gotcha! </h1>
                  {/* <p className="green modelresult">
                    유사도 : {(similarity * 100).toFixed(2)}%
                  </p> */}
                  <p className="green modelresult">정답입니다!</p>
                </>
              )}
              {resultStatus === 2 && (
                <>
                  <h1 className="orange"> 틀렸습니다! </h1>
                  <p className="orange modelresult">
                    유사도 : {(similarity * 100).toFixed(2)}%
                  </p>
                </>
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
