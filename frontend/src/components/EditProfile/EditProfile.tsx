/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@components/common/Button";
import InputValidBox from "@components/common/InputValidBox";
import InputBox from "@components/common/InputBox";
import { putUser } from "@stores/users/userSlice";
import { memberAPI } from "@apis/apis";
import tmp from "@assets/favicon.png";

interface IEditUser {
  id: number;
  nickname: string;
  organization: string;
  email: string;
  registrationId: string;
  profileImage: string;
}

export default function EditProfile() {
  const userInfo = useSelector((state: any) => state.users);

  // 중복 확인을 위한 값
  const [nicknameInput, SetNicknameInput] = useState<string>("");
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);
  const [orgInput, setOrgInput] = useState<string>("");
  const [inputImage, setInputImage] = useState<string>("");

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

  // 소속 입력값 갱신
  const organizationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const newNickname = target.value;
      setOrgInput(newNickname);
    }
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

  const uploadImage = useRef<HTMLInputElement>(null);
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = uploadImage.current?.files;

    if (files && files.length > 0) {
      const f: File | undefined = files[files.length - 1];
      console.log(files);

      const reader: FileReader = new FileReader();
      // eslint-disable-next-line no-loop-func
      reader.onload = function (e: ProgressEvent<FileReader>): void {
        setInputImage(e.target?.result as string);
      };
      reader.readAsDataURL(f);
    }
  };

  // 변경 api 요청
  const editHandler = () => {
    // 변경된 값이 있는지 확인
    if (
      nicknameInput !== userInfo.nickname ||
      orgInput !== userInfo.organization ||
      inputImage !== ""
    ) {
      // 업데이트할 사용자 정보 객체 생성
      const updatedUser: IEditUser = {
        ...userInfo,
        nickname: userInfo.nickname,
        organization: userInfo.organization,
        profileImage: inputImage || userInfo.profileImage, // 새로운 프로필 이미지가 있으면 업데이트, 없으면 기존 프로필 이미지 유지
      };

      console.log(updatedUser);

      // 사용자 정보 업데이트 API 호출
      const result = memberAPI.editUser(updatedUser);
      result
        .then(() => {
          dispatch(
            putUser({
              ...userInfo,
              nickname: nicknameInput,
              organization: orgInput,
              profileImage: inputImage || userInfo.profileImage,
            })
          );
          alert("사용자 정보가 업데이트 되었습니다.");
        })
        .catch((error) => {
          alert(`사용자 정보 업데이트 실패: ${error}`);
        });
    } else {
      alert("변경된 정보가 없습니다.");
    }
  };

  return (
    <div>
      <h1 className="edit-h1">회원정보 수정</h1>
      <div className="edit-profile-main-container">
        <div className="profile-container">
          <img src={inputImage || userInfo.profileImage} alt="프로필 이미지" />
          <label htmlFor="file">
            <div className="btn-upload">프로필 업로드</div>
          </label>
          <input
            name="file"
            id="file"
            type="file"
            accept=".jpg, .jpeg .png"
            ref={uploadImage}
            onChange={uploadHandler}
            onClick={() => uploadImage.current?.click()}
          />
        </div>

        <div className="userinfo-container">
          <form action="submit" className="edit-profile-form">
            <label htmlFor="email">
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
                onChange={organizationHandler}
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
