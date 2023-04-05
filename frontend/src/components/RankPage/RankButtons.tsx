/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { gamePlayAPI } from "@apis/apis";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";
import InputBox from "@components/common/InputBox";
import Reward from "@components/RankPage/Reward";

interface IReward {
  grade: number;
  image: string;
  rewardName: string;
}

export default function RankButtons() {
  const [modalFiveOpen, setModalFiveOpen] = useState(false);
  const [modalSixOpen, setModalSixOpen] = useState(false);
  const [phonenum, setPhonenum] = useState("");
  const [rewardArray, setRewardArray] = useState<IReward[]>([]);
  const roomId = useSelector((state: any) => state.theme.room);
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const nickname = useSelector((state: any) => state.gamePlay.nickname);
  const isLogin = useSelector((state: any) => state.users.isLogin);
  useEffect(() => {
    const handleModalRequest = async () => {
      try {
        const res = await gamePlayAPI.reward(roomId);
        const rewards = res.data.result;
        setRewardArray(rewards);
      } catch (err) {
        console.error(err);
      }
    };
    if (modalFiveOpen || modalSixOpen) {
      handleModalRequest();
    }
  }, [modalFiveOpen, modalSixOpen, roomId]);

  const modalHandler = (modalNumber: number) => {
    const modalStates = [modalFiveOpen, modalSixOpen];
    const modalStatesHandler = [setModalFiveOpen, setModalSixOpen];
    modalStatesHandler[modalNumber - 1](!modalStates[modalNumber - 1]);
  };

  const phonenumHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let input = target.value.replace(/-/g, ""); // 기존에 입력된 - 제거
    input = input.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 번호 포맷팅

    if (
      input.length > 13 ||
      (input.length === 13 && !input.startsWith("010"))
    ) {
      // 숫자 11자 이상이거나 010으로 시작하지 않을 때
      alert("올바른 휴대폰 번호를 입력해주세요.");
      setPhonenum("");
      target.value = "";
    } else {
      target.value = input; // 포맷팅된 번호로 input 값 변경
      setPhonenum(input);
    }
  };

  const submitHandler = () => {
    // 유효성 검사
    if (
      phonenum.length !== 13 ||
      !phonenum.startsWith("010") ||
      isNaN(parseInt(phonenum.replace(/-/g, "").slice(3))) // '-' 제외 숫자가 아닌 문자가 포함된 경우
    ) {
      alert("전화번호를 다시 입력해주세요.");
      return;
    }

    const request = gamePlayAPI.phone(roomId, nickname, phonenum);
    request.then((res) => {
      console.log(res.data);
    });

    setPhonenum("");
    modalHandler(1);
    alert("참여해주셔서 감사합니다!");
  };

  return (
    <>
      <div className="buttons-container">
        <Button
          // color="darkblue"
          text="경품보기"
          onClick={() => modalHandler(2)}
          style={{ background: themeColor }}
        />
        {isLogin ? (
          ""
        ) : (
          <Button text="이벤트 참여하기" onClick={() => modalHandler(1)} />
        )}
      </div>
      <div className="rank-modals-container">
        <Modal
          open={modalFiveOpen}
          modalHandler={() => {
            modalHandler(1);
          }}
          className="modal-five"
          closeType
        >
          <h5>전화번호</h5>
          <InputBox text="010-XXXX-XXXX" onChange={phonenumHandler} />
          <p>
            ※ 본인 명의의 휴대폰 정보를 정확히 입력해 주시기 바랍니다. ※ 타인의
            명의를 도용하는 부정인증을 시도한 경우, 관련 법령에 따라 처벌(3년
            이하의 징역 또는 1천만원 이하의 벌금)을 받을 수 있습니다.
          </p>
          <Button
            size="xxsmall"
            text="제출하기"
            color="lime"
            onClick={submitHandler}
          />
        </Modal>
        <Modal
          open={modalSixOpen}
          modalHandler={() => {
            modalHandler(2);
          }}
          className="modal-six"
          closeType
        >
          {rewardArray.map((rewards: IReward, idx: number) => (
            <Reward
              key={idx}
              grade={rewards.grade}
              imgUrl={rewards.image}
              rewardName={rewards.rewardName}
            />
          ))}

          <div className="reward-explanation">
            <p className="h5-text">꼭 알아두세요!</p>
            <p className="text">
              첫구매 쿠폰은 매일 신규 회원 및 구매 이력이 없는 고객만 사용
              가능합니다. 쿠폰팩은 즉시 발급되며, 쿠폰 사용 기한은 발급 후
              24시간입니다. 쿠폰팩은 하단의 더.세.페 쿠폰 적용 상품에만
              적용됩니다. 장바구니 쿠폰은 결제 당 1장 사용 가능하며, 상품쿠폰과
              장바구니 쿠폰은 동시 적용이 불가합니다.(장바구니 중복쿠폰은 동시
              적용 가능) 쿠폰 적용 상품은 당사 사정에 의하여 상시 변경될 수
              있습니다. 해당 쿠폰은 ID당 1일 1회만 발급 가능합니다. APP 전용
              특가 상품은 장바구니 쿠폰 적용 대상이 아닙니다. 이벤트 기간 주문량
              증가로 배송 예정일과 실제 배송일 차이가 있을 수 있습니다.
            </p>
          </div>
        </Modal>
      </div>
    </>
  );
}
