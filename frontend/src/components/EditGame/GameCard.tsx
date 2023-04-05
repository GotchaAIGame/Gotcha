import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProblem } from "@stores/game/gameSlice";
import { creatorAPI } from "@apis/apis";
import closeButton from "@assets/smallDeleteButton.svg";
import Modal from "@components/common/Modal";

export default function GameCard(Props: any) {
  const { idx } = Props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const savedInfo = useSelector((state: any) => state.game.problems[idx]);

  const [inputImage, setInputImage] = useState<string>("");
  const [problemInfo, setProblemInfo] = useState({
    name: "",
    hint: "",
  });

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
    }
  };

  // 문제 삭제
  const deleteHandler = () => {
    dispatch(deleteProblem(idx));

    const result = creatorAPI.deleteProblem(savedInfo.id);
    result
      .then(() => {
        alert("문제가 삭제되었습니다");
      })
      .catch((res) => {
        console.log("문제 삭제 불가", res);
      });
    setModalOpen(false);
  };

  useEffect(() => {
    if (savedInfo) {
      const newProblemInfo = { ...problemInfo };
      newProblemInfo.name = savedInfo.name;
      newProblemInfo.hint = savedInfo.hint;

      setProblemInfo(newProblemInfo);
      setInputImage(savedInfo.imageUrl);
    }
  }, [savedInfo, inputImage]);

  const modalHandelr = () => {
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <Modal
          open={modalOpen}
          modalHandler={() => setModalOpen(false)}
          btnType="right-two"
          mainBtnHandler={deleteHandler}
        >
          <h5>문제를 삭제하시겠습니까?</h5>
          <p>삭제하시면 다시 복구할 수 없습니다.</p>
        </Modal>
      )}
      <div>
        <div className="card-wrapper">
          <header className="typed-header">
            <button type="button" onClick={modalHandelr}>
              <img src={closeButton} alt="문제 삭제" />
            </button>

            <input
              className="edit-game-card-title"
              type="text"
              placeholder="문제이름"
              id="name"
              value={problemInfo.name}
              disabled
            />
          </header>
          <div className="file-input-wrapper">
            {inputImage && (
              <label htmlFor={`upload-${idx}`} className="file-input-label">
                <div className="upload-img-wrapper">
                  <img src={inputImage} alt="" />
                </div>
                <input
                  id={`upload-${idx}`}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={uploadHandler}
                  ref={uploadImage}
                  disabled
                />
              </label>
            )}
          </div>
          <div className="hint-text-box">힌트</div>
          <div className="hint-input-wrapper">
            <input
              type="text"
              id="hint"
              placeholder="힌트를 추가해 주세요"
              value={problemInfo.hint}
              disabled
            />
          </div>
        </div>
      </div>
    </>
  );
}
