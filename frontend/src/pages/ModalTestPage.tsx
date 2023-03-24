import React, { useState } from "react";
// import Button from "@components/common/Button";
import Modal from "@components/common/Modal";

export default function ModalTestPage() {
  const [modalOneOpen, setModalOneOpen] = useState(false);
  const [modalTwoOpen, setModalTwoOpen] = useState(false);
  const [modalThreeOpen, setModalThreeOpen] = useState(false);
  const [modalFourOpen, setModalFourOpen] = useState(false);

  const modalHandler = (modalNumber: number) => {
    const modalStates = [
      modalOneOpen,
      modalTwoOpen,
      modalThreeOpen,
      modalFourOpen,
    ];
    const modalStatesHandler = [
      setModalOneOpen,
      setModalTwoOpen,
      setModalThreeOpen,
      setModalFourOpen,
    ];

    modalStatesHandler[modalNumber - 1](!modalStates[modalNumber - 1]);
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
            modalHandler(1);
          }}
        >
          모달 1
        </button>

        <p>modal 2 : {String(modalTwoOpen)}</p>
        <button
          className="modal-one"
          type="button"
          onClick={() => {
            modalHandler(2);
          }}
        >
          모달 2
        </button>

        <p>modal 3 : {String(modalThreeOpen)}</p>
        <button
          className="modal-one"
          type="button"
          onClick={() => {
            modalHandler(3);
          }}
        >
          모달 3
        </button>

        <p>modal 4 : {String(modalFourOpen)}</p>
        <button
          className="modal-one"
          type="button"
          onClick={() => {
            modalHandler(4);
          }}
        >
          모달 4
        </button>
      </div>

      <div className="modal-pages">
        <Modal
          open={modalOneOpen}
          modalHandler={() => {
            modalHandler(1);
          }}
          className="modal-one"
          exclamationType="outside"
          overlay={false}
        >
          <h5 style={{ margin: 0 }}>PIN 번호를 입력해주세요!</h5>
        </Modal>

        <Modal
          open={modalTwoOpen}
          modalHandler={() => {
            modalHandler(2);
          }}
          className="modal-two"
          btnType="right-one"
        >
          <h5 style={{ margin: "2rem" }}>
            게임에 입장하시면 [게임종료] 버튼을 누르기 전까지 시간이 흐릅니다.
            !!!!! 여기 내용 수정 필요 !!!!!
          </h5>
        </Modal>

        <Modal
          open={modalThreeOpen}
          modalHandler={() => {
            modalHandler(3);
          }}
          mainBtnHandler={() => {
            modalHandler(3);
          }}
          className="modal-three"
          btnType="right-two"
        >
          <h3 style={{ margin: "2rem" }}>정말 종료하시겠습니까?</h3>
          <h5>게임이 종료되면 다시 접속할 수 없습니다</h5>
        </Modal>

        <Modal
          open={modalFourOpen}
          modalHandler={() => {
            modalHandler(4);
          }}
          mainBtnHandler={() => {
            modalHandler(4);
          }}
          className="modal-four"
          btnType="center"
          closeType
        >
          <h3 style={{ margin: "2rem" }}>정말 종료하시겠습니까?</h3>
          <h5>게임이 종료되면 다시 접속할 수 없습니다</h5>
        </Modal>
      </div>
    </div>
  );
}
