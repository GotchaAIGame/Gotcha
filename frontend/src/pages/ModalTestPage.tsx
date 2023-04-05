import React, { useState } from "react";
// import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import InputBox from "@components/common/InputBox";

export default function ModalTestPage() {
  const [modalOneOpen, setModalOneOpen] = useState(false);
  const [modalTwoOpen, setModalTwoOpen] = useState(false);
  const [modalThreeOpen, setModalThreeOpen] = useState(false);
  const [modalFourOpen, setModalFourOpen] = useState(false);
  const [modalFiveOpen, setModalFiveOpen] = useState(false);
  const [modalSixOpen, setModalSixOpen] = useState(false);

  const modalHandler = (modalNumber: number) => {
    const modalStates = [
      modalOneOpen,
      modalTwoOpen,
      modalThreeOpen,
      modalFourOpen,
      modalFiveOpen,
      modalSixOpen,
    ];
    const modalStatesHandler = [
      setModalOneOpen,
      setModalTwoOpen,
      setModalThreeOpen,
      setModalFourOpen,
      setModalFiveOpen,
      setModalSixOpen,
    ];

    modalStatesHandler[modalNumber - 1](!modalStates[modalNumber - 1]);
  };

  return (
    <div>
      <h1> 모달 테스트 페이지입니다. </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
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
        <p>modal 5: {String(modalFiveOpen)}</p>
        <button
          className="modal-five"
          type="button"
          onClick={() => {
            modalHandler(5);
          }}
        >
          모달 5
        </button>

        <p>modal 6: {String(modalSixOpen)}</p>
        <button
          className="modal-reward"
          type="button"
          onClick={() => {
            modalHandler(6);
          }}
        >
          모달 6
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
          <h5 >게임이 종료되면 다시 접속할 수 없습니다</h5>
        </Modal>
        <Modal
          open={modalFiveOpen}
          modalHandler={() => {
            modalHandler(5);
          }}
          mainBtnHandler={() => {
            modalHandler(5);
          }}
          className="modal-five"
          closeType
        >
          <h5>전화번호</h5>
          <InputBox text="010-XXXX-XXXX" />
          <p>
            ※ 본인 명의의 휴대폰 정보를 정확히 입력해 주시기 바랍니다. ※ 타인의
            명의를 도용하는 부정인증을 시도한 경우, 관련 법령에 따라 처벌(3년
            이하의 징역 또는 1천만원 이하의 벌금)을 받을 수 있습니다.
          </p>
        </Modal>
        <Modal
          open={modalSixOpen}
          modalHandler={() => {
            modalHandler(6);
          }}
          className="modal-six"
          closeType
        >
          <p>
            꼭 알아두세요!첫구매 쿠폰은 매일 신규 회원 및 구매 이력이 없는
            고객만 사용 가능합니다. 쿠폰팩은 즉시 발급되며, 쿠폰 사용 기한은
            발급 후 24시간입니다. 쿠폰팩은 하단의 더.세.페 쿠폰 적용 상품에만
            적용됩니다. 장바구니 쿠폰은 결제 당 1장 사용 가능하며, 상품쿠폰과
            장바구니 쿠폰은 동시 적용이 불가합니다.(장바구니 중복쿠폰은 동시
            적용 가능) 쿠폰 적용 상품은 당사 사정에 의하여 상시 변경될 수
            있습니다. 해당 쿠폰은 ID당 1일 1회만 발급 가능합니다. APP 전용 특가
            상품은 장바구니 쿠폰 적용 대상이 아닙니다. 이벤트 기간 주문량 증가로
            배송 예정일과 실제 배송일 차이가 있을 수 있습니다.
          </p>
        </Modal>
      </div>
    </div>
  );
}
