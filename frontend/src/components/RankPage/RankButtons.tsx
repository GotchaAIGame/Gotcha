import React, { useState } from "react";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import InputBox from "@components/common/InputBox";

export default function RankButtons() {
  const [modalFiveOpen, setModalFiveOpen] = useState(false);
  const [modalSixOpen, setModalSixOpen] = useState(false);

  const modalHandler = (modalNumber: number) => {
    const modalStates = [modalFiveOpen, modalSixOpen];
    const modalStatesHandler = [setModalFiveOpen, setModalSixOpen];

    modalStatesHandler[modalNumber - 1](!modalStates[modalNumber - 1]);
  };
  return (
    <>
      <div className="buttons-container">
        <Button
          color="darkblue"
          text="경품보기"
          onClick={() => modalHandler(2)}
        />
        <Button text="이벤트 참여하기" onClick={() => modalHandler(1)} />
      </div>
      <div>
        <Modal
          open={modalFiveOpen}
          modalHandler={() => {
            modalHandler(1);
          }}
          className="modal-five"
          btnType="submit"
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
          open={modalFiveOpen}
          modalHandler={() => {
            modalHandler(1);
          }}
          className="modal-five"
          btnType="submit"
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
            modalHandler(2);
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
    </>
  );
}
