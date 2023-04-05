import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "@stores/users/userSlice";
import { useCookies } from "react-cookie";
import { memberAPI } from "@apis/apis";
import Button from "@components/common/Button";
import Modal from "@components/common/Modal";

export default function LogOut() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cookies, setCookie] = useCookies(["refreshToken"]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const logoutHandler = () => {
    // setModalOpen(!modalOpen);

    // api 요청
    const accessToken = sessionStorage.getItem("accessToken");
    const { refreshToken } = cookies;

    if (accessToken && refreshToken) {
      // API 임시 제거
      const result = memberAPI.logOut(accessToken, refreshToken);
      result
        .then((res) => {
          // API요청에 성공하면
          // store비우기
          dispatch(setLogout());
          // local에 저장된 토큰 정보 제거
          sessionStorage.setItem("accessToken", "");
          setCookie("refreshToken", "");
          // 창 닫고 이동
          setModalOpen(false);
          navigate("/");
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };
  return (
    <div>
      <Button
        size="small"
        color="gray-blue"
        text="로그아웃"
        onClick={modalHandler}
      />
      <Modal
        open={modalOpen}
        mainBtnHandler={logoutHandler}
        modalHandler={modalHandler}
        className="modal-two"
        btnType="right-two"
      >
        <h3 style={{ margin: "2rem" }}>로그아웃 하시겠습니까?</h3>
      </Modal>
    </div>
  );
}
