import React, { useState, useRef, useEffect } from "react";
import gold from "@assets/goldmedal.png";
import silver from "@assets/silvermedal.png";
import bronze from "@assets/bronzemedal.png";

export default function RewardCard(props: any) {
  const { rewardsList, setRewardsList, idx } = props;
  const [rewardInfo, setRewardInfo] = useState(rewardsList[idx]);
  const [rewardImg, setRewardImg] = useState("");

  const uploadImage = useRef<HTMLInputElement>(null);

  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRewardInfo = {
      id: rewardInfo.id,
      name: e.target.value,
      grade: rewardInfo.grade,
      image: rewardInfo.image,
    };
    // setInputImage(e.target?.result as string);
    setRewardInfo(newRewardInfo);
    const newRewardsList = rewardsList;
    newRewardsList[idx] = newRewardInfo;
    setRewardsList(newRewardsList);
  };

  // 이미지를 업로드 했을 때 실행
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = uploadImage.current?.files;

    if (files && files.length > 0) {
      // useStateValue Update

      const f: File | undefined = files[files.length - 1];

      const reader: FileReader = new FileReader();

      // Closure to capture the file information.
      // eslint-disable-next-line no-loop-func
      reader.onload = function (e: ProgressEvent<FileReader>): void {
        const newRewardInfo = {
          name: rewardInfo.name,
          grade: rewardInfo.grade,
          image: e.target?.result as string,
        };
        // setInputImage(e.target?.result as string);
        setRewardInfo(newRewardInfo);
        // const newRewardsList = rewardsList;
        // newRewardsList[idx].image = e.target?.result as string;
        // setRewardsList(newRewardsList);
        const newRewardsList = [...rewardsList];
        newRewardsList[idx] = {
          ...newRewardsList[idx],
          image: e.target?.result as string,
        };
        setRewardsList(newRewardsList);
      };

      reader.readAsDataURL(f);
    }
  };

  useEffect(() => {
    setRewardInfo(rewardsList[idx]);
    const temp = rewardsList[idx];
    // 등수 이미지
    if (temp.grade === 1) {
      setRewardImg(gold);
    } else if (temp.grade === 2) {
      setRewardImg(silver);
    } else if (temp.grade === 3) {
      setRewardImg(bronze);
    }
  }, [rewardsList, setRewardInfo]);

  if (rewardInfo) {
    return (
      <div className="reward-card-container">
        <div className="reward-info-text-img-container">
          <img src={rewardImg} alt="" />
          <p>{rewardInfo.grade}등 상품</p>
        </div>
        <input
          type="text"
          className="reward-name-input"
          placeholder={
            rewardInfo.name ? rewardInfo.name : "상품명을 입력하세요"
          }
          onChange={nameHandler}
        />
        <div className="file-input-wrapper">
          {rewardInfo.image ? (
            <label htmlFor={`upload-${idx}`} className="file-input-label">
              <div className="preview-img-wrapper">
                <img src={rewardInfo.image} className="preview-img" alt="" />
              </div>
              {/* <p className="file-input-label-text">변경하기</p> */}
              <input
                id={`upload-${idx}`}
                type="file"
                accept="image/*"
                onChange={uploadHandler}
                ref={uploadImage}
              />
            </label>
          ) : (
            <label htmlFor={`upload-${idx}`} className="file-input-label">
              <p className="file-input-label-plus">+</p>
              <p className="file-input-label-text">
                상품사진
                <br />
                추가하기
              </p>
              <input
                id={`upload-${idx}`}
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={uploadHandler}
                ref={uploadImage}
              />
            </label>
          )}
        </div>
      </div>
    );
  }
  return null;
}
