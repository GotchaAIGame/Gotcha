import { MLAPI } from "@apis/apis";
import React, { useEffect, useState, useRef } from "react";
// import "@styles/GamePage.scss";

interface progressBarProps {
  resultHandler: (status: number) => void;
  imageUrl : string;
  problemImage : string;
  index : string;
}

// function ProgressBar() {
function ProgressBar(props: progressBarProps) {
  const { resultHandler, imageUrl, problemImage, index } = props;
  // imageUrl : 제출하고자 하는 cropped image
  // problemImage : 원본 image
  const [progressDone, setProgressDone] = useState(false);
  const progressBarRef = useRef(null);

  useEffect(() => {
    // send request to predict
    const predict = async() => {
      const formData : FormData  = new FormData();

      formData.append("inputImage", imageUrl);
      formData.append("originalUrl", problemImage)

      const result = await MLAPI.predict(formData);
      console.log(result)
    }
    predict()

    // predict()
  }, []);

  // ProgresBar가 끝까지 갔을 때
  useEffect(() => {
    return () => {
      if (progressBarRef.current) {
        // 로딩이 끝까지 갔을 때
        resultHandler(2);
      } else {
        // if null (모달 창이 꺼졌을 때)
        resultHandler(0);
      }
    };
  }, [progressBarRef.current]);

  return (
    <div>
      {/* {String(progressDone)} */}
      <div
        className={`progress-bar ${progressDone ? "done" : "loading"}`}
        ref={progressBarRef}
      />
    </div>
  );
}

export default ProgressBar;
