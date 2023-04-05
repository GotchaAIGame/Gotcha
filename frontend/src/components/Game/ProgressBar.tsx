import { MLAPI } from "@apis/apis";
import React, { useEffect, useState, useRef } from "react";
import { setSolved } from "@stores/game/gamePlaySlice";
import { useAppDispatch } from "@stores/storeHooks";
// import "@styles/GamePage.scss";

interface progressBarProps {
  resultHandler: (status: number) => void;
  imageUrl : string;
  problemImage : string;
  index : string;
}

// function ProgressBar() {
function ProgressBar(props: progressBarProps) {
  const dispatch = useAppDispatch();
  const [resultStatus, setResultStatus] = useState(0)
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

      const result = await MLAPI.predict(formData); // 예측 결과
      let curResultStatus = -1
      if (result.data.result === true){ // 일치할 경우
        curResultStatus = 1
        dispatch(setSolved({idx : index}))
      } else { // 일치하지 않을 경우
        curResultStatus = 2
      }
      setResultStatus(curResultStatus)
      setProgressDone(true)
    }
    // console.log("useEffect", index)
    predict()
  }, []);

  // ProgresBar가 끝까지 갔을 때
  useEffect(() => {
      if (progressBarRef.current) {
        // 로딩이 끝까지 갔을 때
        resultHandler(resultStatus)
      } else {
        // if null (모달 창이 꺼졌을 때)
        resultHandler(0);
      }
  }, [progressDone]);

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
