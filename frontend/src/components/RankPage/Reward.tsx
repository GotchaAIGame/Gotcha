import React from "react";
import gold from "@assets/goldmedal.png";
import silver from "@assets/silvermedal.png";
import bronze from "@assets/bronzemedal.png";

interface IRewardProps {
  grade: number;
  imgUrl: string;
  rewardName: string;
}

export default function Reward({ grade, imgUrl, rewardName }: IRewardProps) {
  let medal = null;
  if (grade === 1) {
    medal = gold;
  } else if (grade === 2) {
    medal = silver;
  } else if (grade === 3) {
    medal = bronze;
  } else {
    medal = "";
  }

  return (
    <div>
      <div className="rank-one">
        <img src={medal} alt="메달" />
        <img src={imgUrl} alt="경품사진" />
        <p>{rewardName}</p>
      </div>
      <p>안녕?</p>
      {/* <div className="rank-one">
        <img src={gold} alt="1등" className="medal" />
        <img
          src="https://cdn.icoda.co.kr/asset/img_thumbnail/9/1301179_0.jpg"
          alt=""
        />
        <p>갤럭시북</p>
      </div>
      <div className="rank-two">
        <img src={silver} alt="2등" className="medal" />
        <img
          src="https://m.etlandmall.co.kr/nas/cdn/attach/product/2021/08/12/S3573918/SYS_2021081211390_0_600.png"
          alt=""
        />
        <p>갤럭시버즈</p>
      </div>
      <div className="rank-three">
        <img src={bronze} alt="3등" className="medal" />
        <img
          src="https://cdn.icoda.co.kr/asset/img_thumbnail/9/1301179_0.jpg"
          alt=""
        />
        <p>스타벅스 아메리카노 Tall</p>
      </div> */}
      {/* <div className="reward-explanation">
        <p className="h5-text">꼭 알아두세요!</p>
        <p className="text">
          첫구매 쿠폰은 매일 신규 회원 및 구매 이력이 없는 고객만 사용
          가능합니다. 쿠폰팩은 즉시 발급되며, 쿠폰 사용 기한은 발급 후
          24시간입니다. 쿠폰팩은 하단의 더.세.페 쿠폰 적용 상품에만 적용됩니다.
          장바구니 쿠폰은 결제 당 1장 사용 가능하며, 상품쿠폰과 장바구니 쿠폰은
          동시 적용이 불가합니다.(장바구니 중복쿠폰은 동시 적용 가능) 쿠폰 적용
          상품은 당사 사정에 의하여 상시 변경될 수 있습니다. 해당 쿠폰은 ID당
          1일 1회만 발급 가능합니다. APP 전용 특가 상품은 장바구니 쿠폰 적용
          대상이 아닙니다. 이벤트 기간 주문량 증가로 배송 예정일과 실제 배송일
          차이가 있을 수 있습니다.
        </p>
      </div> */}
    </div>
  );
}
