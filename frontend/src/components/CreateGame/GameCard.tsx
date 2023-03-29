import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProblem } from "@stores/game/gameSlice";
import closeButton from "@assets/closeButton.svg";

export default function GameCard(Props: any) {
  const prop = Props;
  console.log(prop.index);
  const idx = prop.index;
  const savedInfo = useSelector(
    (state: any) => state.game.problems[prop.index]
  );
  const dispatch = useDispatch();

  const [inputImage, setInputImage] = useState<string>("");
  const [problemInfo, setProblemInfo] = useState({
    name: "",
    description: "",
    hint: "",
  });
  const uploadImage = useRef<HTMLInputElement>(null);

  // 이미지를 업로드 했을 때 실행
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = uploadImage.current?.files;

    if (files && files.length > 0) {
      // useStateValue Update

      for (let i = 0; i < files?.length; i += 1) {
        const f: File | undefined = files[i];

        const reader: FileReader = new FileReader();

        // Closure to capture the file information.
        // eslint-disable-next-line no-loop-func
        reader.onload = function (e: ProgressEvent<FileReader>): void {
          setInputImage(e.target?.result as string);
        };

        reader.readAsDataURL(f);
      }
      // setInputImage(URL.createObjectURL(files[0]));
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
  };

  // 문제 저장
  const saveProblem = () => {
    const postImg = inputImage.replace("data:image/png;base64,", "");
    const problemState = {
      image: postImg,
      name: problemInfo.name,
      description: problemInfo.description,
      hint: problemInfo.hint,
    };
    dispatch(setProblem({ problemState, idx }));
  };

  useEffect(() => {
    // console.log("렌더링!");
  }, []);

  return (
    <div>
      <div className="card-wrapper">
        <header>
          <img src={closeButton} alt="delete-button" />
          <button type="button" onClick={saveProblem}>
            등록
          </button>
          <input
            type="text"
            placeholder="문제이름"
            id="name"
            value={problemInfo.name}
            onChange={changeInfoHanlder}
          />
        </header>
        {savedInfo.image ? (
          <div className="upload-img-wrapper">
            <img src={savedInfo.image} alt="" />
          </div>
        ) : (
          <div className="file-input-wrapper">
            <label htmlFor="upload" className="file-input-label">
              <p className="file-input-label-plus">+</p>
              <p className="file-input-label-text">
                대표사진
                <br />
                추가하기
              </p>{" "}
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
        <div className="hint-text-box">설명</div>
        <div className="hint-input-wrapper">
          <input
            type="text"
            id="description"
            placeholder="문제에 대한 설명을 추가해 주세요"
            value={problemInfo.description}
            onChange={changeInfoHanlder}
          />
        </div>
      </div>
    </div>
  );
}
