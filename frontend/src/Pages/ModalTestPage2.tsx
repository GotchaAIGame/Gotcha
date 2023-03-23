import React, { useState } from "react";
import AIModal from "@components/Game/AIModal";

export default function ModalTestPage2() {
  const [modalOneOpen, setModalOneOpen] = useState(false);

  const originalImageURL =
    "https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjAy/MDAxNjQzMTAyOTk2NjE0.gw_H_jjBM64svaftcnheR6-mHHlmGOyrr6htAuxPETsg.8JJSQNEA5HX2WmrshjZ-VjmJWqhmgE40Qm5csIud9VUg.JPEG.minziminzi128/IMG_7374.JPG?type=w800";
  const userImageURL =
    "https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjAy/MDAxNjQzMTAyOTk2NjE0.gw_H_jjBM64svaftcnheR6-mHHlmGOyrr6htAuxPETsg.8JJSQNEA5HX2WmrshjZ-VjmJWqhmgE40Qm5csIud9VUg.JPEG.minziminzi128/IMG_7374.JPG?type=w800";

  const modalHandler = () => {
    setModalOneOpen(!modalOneOpen);
  };

  return (
    <div>
      <h1> 모달 테스트 페이지입니다. </h1>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="model btns"
      >
        <p>modal 1: {String(modalOneOpen)}</p>
        <button
          className="modal-one"
          type="button"
          onClick={() => {
            modalHandler();
          }}
        >
          제출하기
        </button>
      </div>

      <div className="modal-pages">
        <AIModal
          originalImage={originalImageURL}
          userImage={userImageURL}
          open={modalOneOpen}
          modalHandler={modalHandler}
        />
      </div>
    </div>
  );
}
