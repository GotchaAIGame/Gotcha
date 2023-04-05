import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@stores/storeHooks";
import "./styles/CustomNavbar.scss";
import { Link } from "react-router-dom";
import helpBtn from "@assets/helpButton.svg";
import { gamePlayAPI } from "@apis/apis";
import { setEventInfo } from "@stores/player/themeSlice";
import Modal from "./Modal";

export default function CustomNavbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { themeColor, themeLogo, themeTitle, eventDesc, eventUrl } =
    useAppSelector((state) => state.theme);
  const { roomId } = useAppSelector((state) => state.gamePlay);
  const bgColor = {
    backgroundColor: themeColor,
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (roomId) {
      gamePlayAPI.detail(roomId).then((res) => {
        const { eventDesc, eventUrl } = res.data.result;
        dispatch(setEventInfo({ eventDesc, eventUrl }));
      });
    }
  }, []);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const mainBtnHandler = () => {
    let link = eventUrl || "";
    if (!link.startsWith("http")) {
      link = "https://".concat("", link);
    }
    window.open(link);
    setModalOpen(!modalOpen);
  };

  return (
    <header className="custom-nav-container" style={bgColor}>
      <Link to="/">
        <img src={themeLogo} alt="로고" />
      </Link>
      <div className="title-button-container">
        <h3 className="custom-title-wrapper">{themeTitle}</h3>
        <button
          type="button"
          className="game-detail-button"
          onClick={modalHandler}
        >
          <img src={helpBtn} className="game-detail-button-img" alt="zz" />
        </button>
      </div>
      <Modal
        open={modalOpen}
        modalHandler={modalHandler}
        btnType="center"
        mainBtnHandler={mainBtnHandler}
      >
        <h5> 게임 설명 </h5>
        <p> {eventDesc}</p>
      </Modal>
    </header>
  );
}
