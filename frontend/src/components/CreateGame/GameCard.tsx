import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProblem, deleteProblem } from "@stores/game/gameSlice";
import closeButton from "@assets/smallDeleteButton.svg";

export default function GameCard(Props: any) {
  // const { idx, problemLength, cardNameRef, cardHintRef } = Props;
  const { idx, problemLength, cardNameRef, cardHintRef, deleteHandler } = Props;
  const [isTyping, setIsTyping] = useState<boolean>(true);

  // const [inputImage, setInputImage] = useState<string>(image);
  // const [problemInfo, setProblemInfo] = useState({ name, hint });

  // // useRefs
  // const uploadImage = useRef<HTMLInputElement>(null);
  // // useRefs

  // const dispatch = useDispatch();

  // // 이미지를 업로드 했을 때 실행
  // const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = uploadImage.current?.files;

  //   if (files && files.length > 0) {
  //     // useStateValue Update

  //     const f: File | undefined = files[files.length - 1];
  //     console.log(files);

  //     const reader: FileReader = new FileReader();

  //     // Closure to capture the file information.
  //     // eslint-disable-next-line no-loop-func
  //     reader.onload = function (e: ProgressEvent<FileReader>): void {
  //       setInputImage(e.target?.result as string);
  //     };

  //     reader.readAsDataURL(f);

  //     // setIsTyping(true);
  //   }
  // };

  // // debounce

  // // 변경 내용 저장
  // const changeInfoHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newProblemInfo = { ...problemInfo };
  //   if (e.target.id === "name") {
  //     newProblemInfo.name = e.target.value;
  //   } else if (e.target.id === "hint") {
  //     newProblemInfo.hint = e.target.value;
  //   }
  //   setProblemInfo(newProblemInfo);
  //   // setIsTyping(true);
  // };

  // // 문제 삭제
  // const deleteHandler = () => {
  //   console.log("으아");
  //   dispatch(deleteProblem(idx));

  //   setIsTyping(true);
  // };

  // useEffect(() => {
  //   const saveProblem = () => {
  //     const postImg = inputImage;

  //     if (problemInfo.name && problemInfo.hint && postImg) {
  //       const problemState = {
  //         image: postImg,
  //         name: problemInfo.name,
  //         hint: problemInfo.hint,
  //       };
  //       dispatch(setProblem({ problemState, idx }));
  //       setIsTyping(false);
  //     } else {
  //       alert("내용을 입력해주세요");
  //     }
  //   };
  //   if (problemInfo.name && problemInfo.hint && inputImage) {
  //     saveProblem();
  //   }
  // }, [problemInfo, inputImage]);

  return (
    <div>
      <div
        className="card-wrapper"
        title={isTyping ? "문제 내용을 입력해 주세요" : ""}
      >
        <header className={isTyping ? "typing-header" : "typed-header"}>
          {/* <button type="button"> */}
          {/* <button type="button"> */}
          <button
            type="button"
            onClick={() => {
              deleteHandler(idx);
            }}
          >
            <img src={closeButton} alt="문제 삭제" />
          </button>

          <input
            type="text"
            placeholder="문제 이름을 입력해주세요"
            id={`name-${idx}`}
            // value={problemInfo.name}
            // onChange={changeInfoHanlder}
            ref={cardNameRef}
          />
        </header>
        {/* <div className="file-input-wrapper">
          {inputImage ? (
            <label htmlFor={`upload-${idx}`} className="file-input-label">
              <div className="upload-img-wrapper">
                <img src={inputImage} alt="" />
              </div>
              <input
                id={`upload-${idx}`}
                type="file"
                accept=".jpg, .jpeg .png"
                onChange={uploadHandler}
                ref={uploadImage}
              />
            </label>
          ) : (
            <label htmlFor={`upload-${idx}`} className="file-input-label">
              <p className="file-input-label-plus">+</p>
              <p className="file-input-label-text">
                대표사진
                <br />
                추가하기
              </p>
              <input
                id={`upload-${idx}`}
                type="file"
                accept=".jpg, .jpeg .png"
                onChange={uploadHandler}
                ref={uploadImage}
              />
            </label>
          )}
        </div> */}
        {/* <div className={isTyping ? "typing-hint-text-box" : "hint-text-box"}>
          힌트
        </div> */}
        <div className="hint-input-wrapper">
          <input
            type="text"
            id={`hint-${idx}`}
            placeholder="힌트를 추가해 주세요"
            // value={problemInfo.hint}
            // onChange={changeInfoHanlder}
            ref={cardHintRef}
          />
        </div>
      </div>
    </div>
  );
}
