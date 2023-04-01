/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@components/common/Button";
import InputValidBox from "@components/common/InputValidBox";
import InputBox from "@components/common/InputBox";
import { putUser } from "@stores/users/userSlice";
import { memberAPI } from "@apis/apis";
import tmp from "@assets/favicon.png";

export default function EditProfile() {
  const userInfo = useSelector((state: any) => state.users);

  // 중복 확인을 위한 값
  const [nicknameInput, SetNicknameInput] = useState<string>("");
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);

  const dispatch = useDispatch();

  // nickname 입력값 갱신
  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const newNickname = target.value;
      SetNicknameInput(newNickname);
    }
    setNicknameValid(false);
  };

  // nickname 중복검사
  const nicknameChecker = (e: any) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    // 형식 통과
    if (regex.test(nicknameInput)) {
      const result = memberAPI.duplicateNickName(nicknameInput);
      result
        .then((res) => {
          // 중복이 아닐 때
          if (res.data.result === false) {
            const newNickname = nicknameInput;
            const newUserInfo = { ...userInfo };
            newUserInfo.nickname = newNickname;
            // setUserInfo(newUserInfo);
            setNicknameValid(true);
            alert("사용 가능한 닉네임입니다!");
          } else {
            alert("중복된 닉네임입니다.");
          }
        })
        .catch((res) => {
          alert(res);
        });
    } else {
      alert("특수문자와 공백 없이 2~10자로 입력해주세요.");
    }
  };

  const editHandler = () => {
    console.log("변경!");
    // api 연결 필요
  };

  return (
    <div>
      <h3>회원정보 수정</h3>
      <div className="edit-profile-main-container">
        <div className="profile-container">
          {/* <img src={userInfo.profileImage} alt="프로필 이미지" /> */}
          <img src={tmp} alt="프로필 이미지" />
          <Button
            type="submit"
            text="사진업로드"
            size="small"
            color="skyblue"
          />
        </div>

        <div className="userinfo-container">
          <form action="submit" className="edit-profile-form">
            <label htmlFor="">
              <h5>이메일</h5>
              <InputBox
                type="text"
                text={userInfo.email}
                className="email-input"
                disabled
              />
            </label>
          </form>

          <form action="submit" className="edit-profile-form">
            <label htmlFor="sign-up-nickname">
              <h5>닉네임</h5>
              <InputValidBox
                type="text"
                text={userInfo.nickname}
                onClick={nicknameChecker}
                onChange={nicknameHandler}
                checked={nicknameValid}
              />
              <p className="nickname-intro">
                ※ 닉네임은 특수문자와 공백 없이 2~10자로
                <br />
                입력해주세요.
              </p>
            </label>
          </form>
          <form action="submit" className="edit-profile-form">
            <label htmlFor="sign-up-company">
              <h5>소속</h5>
              <InputBox
                type="text"
                text={userInfo.organization}
                // onChange={organizationHandler}
              />
            </label>
          </form>
        </div>
      </div>
      <Button
        text="변경 완료"
        type="submit"
        color="gray-blue"
        onClick={editHandler}
      />
    </div>
  );
}
