import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProblem, deleteProblem } from "@stores/game/gameSlice";
import closeButton from "@assets/smallDeleteButton.svg";
import plusButton from "@assets/smallPlusButton.svg";

export default function GameCard(Props: any) {
  const { idx, isAddable, setIsAddable } = Props;

  const savedInfo = useSelector((state: any) => state.game.problems[idx]);

  const [inputImage, setInputImage] = useState<string>("");
  const [problemInfo, setProblemInfo] = useState({
    name: "",
    description: "",
    hint: "",
  });
  const [isTyping, setIsTyping] = useState<boolean>(true);

  const uploadImage = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  // 이미지를 업로드 했을 때 실행
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = uploadImage.current?.files;

    if (files && files.length > 0) {
      // useStateValue Update

      const f: File | undefined = files[files.length - 1];
      console.log(files);

      const reader: FileReader = new FileReader();

      // Closure to capture the file information.
      // eslint-disable-next-line no-loop-func
      reader.onload = function (e: ProgressEvent<FileReader>): void {
        setInputImage(e.target?.result as string);
      };

      reader.readAsDataURL(f);

      setIsTyping(true);
    }
  };

  // 변경 내용 저장
  const changeInfoHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProblemInfo = { ...problemInfo };
    if (e.target.id === "name") {
      newProblemInfo.name = e.target.value;
    }
    if (e.target.id === "description") {
      newProblemInfo.description = e.target.value;
    }
    if (e.target.id === "hint") {
      newProblemInfo.hint = e.target.value;
    }
    setProblemInfo(newProblemInfo);
    setIsTyping(true);
  };

  // 문제 저장
  const saveProblem = () => {
    const postImg = inputImage.replace("data:image/png;base64,", "");
    if ((problemInfo.name, problemInfo.hint)) {
      if (postImg) {
        const problemState = {
          image: postImg,
          name: problemInfo.name,
          description: problemInfo.description,
          hint: problemInfo.hint,
        };
        dispatch(setProblem({ problemState, idx }));
        setIsTyping(false);
        setIsAddable(true);
      } else {
        alert("사진을 등록해주세요");
      }
    } else {
      alert("내용을 입력해주세요");
    }
  };

  // 문제 삭제
  const deleteHandler = () => {
    console.log("으아");
    dispatch(deleteProblem(idx));

    setIsTyping(true);
  };

  useEffect(() => {
    if (!(problemInfo.name, problemInfo.hint)) {
      setIsTyping(true);
    }
    setIsAddable(false);
  }, []);

  return (
    <div>
      <div className="card-wrapper">
        <header className={isTyping ? "typing-header" : "typed-header"}>
          {isTyping ? (
            <button type="button" onClick={saveProblem}>
              <img src={plusButton} alt="문제 등록" />
            </button>
          ) : (
            <button type="button" onClick={deleteHandler}>
              <img src={closeButton} alt="문제 삭제" />
            </button>
          )}
          <input
            type="text"
            placeholder="문제이름"
            id="name"
            value={problemInfo.name}
            onChange={changeInfoHanlder}
          />
        </header>
        {inputImage ? (
          <div className="upload-img-wrapper">
            <img src={inputImage} alt="" />
          </div>
        ) : (
          <div className="file-input-wrapper">
            <label htmlFor="upload" className="file-input-label">
              <p className="file-input-label-plus">+</p>
              <p className="file-input-label-text">
                대표사진
                <br />
                추가하기
              </p>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={uploadHandler}
                ref={uploadImage}
              />
            </label>
          </div>
        )}
        <div className="hint-text-box">힌트</div>
        <div className="hint-input-wrapper">
          <input
            type="text"
            id="hint"
            placeholder="힌트를 추가해 주세요"
            value={problemInfo.hint}
            onChange={changeInfoHanlder}
          />
        </div>
      </div>
    </div>
  );
}
