import React, { useState, useEffect, useRef, MouseEventHandler } from "react";
import AIModal from "@components/Game/AIModal";
import { MLAPI, memberAPI } from "@apis/apis";
import axios from "axios";

export default function ModalTestPage2() {
  const [modalOpen1, setModalOpen1] = useState(false);
  const [resultStatus, setResultStatus] = useState(0); // 0 : loading, 1 : correct, 2: wrong

  const imgURL =
    "https://user-images.githubusercontent.com/47023884/225485195-f44d038c-a859-436c-ba1a-fb27c7414062.png";
  // "https://user-images.githubusercontent.com/47023884/228404315-2409f506-04b5-46c1-90fd-ea45e5215f6a.jpg";

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
        imageURL=""
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
