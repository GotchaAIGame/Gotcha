import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@stores/player/themeSlice";
import { setGameCustom } from "@stores/game/gameSlice";
import { creatorAPI } from "@apis/apis";
import Button from "@components/common/Button";
import closeImg from "@assets/closeButton.svg";
import LogoInput from "./LogoInput";
import ColorInput from "./ColorInput";
import RewardsList from "./RewardsList";

interface modalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CustomModal(props: any) {
  const { isOpen, setIsOpen, gameInfo, setGameInfo } = props;
  // const [previewImg, setPreviewImg] = useState<string>("");
  // const [themeColor, setThemeColor] = useState<string>("5551FF");

  // store에 저장된 값
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);
  const themeTitle = useSelector((state: any) => state.theme.themeTitle);

  const dispatch = useDispatch();

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  // img Base64 인코딩 후 저장
  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>): void {
        const base64 = e.target?.result as string;
        dispatch(
          setTheme({
            room: gameInfo.id,
            reward: gameInfo.hasReward,
            themeColor,
            themeLogo: base64,
            themeTitle,
          })
        );
      };

      reader.readAsDataURL(file);
    }
  };

  const colorHandler = (color: string) => {
    dispatch(
      setTheme({
        room: gameInfo.id,
        reward: gameInfo.hasReward,
        themeColor: color,
        themeLogo,
        themeTitle,
      })
    );
  };

  const postTheme = () => {
    console.log(gameInfo);
    console.log(themeColor);
    // 변경된 값으로 게임 정보 변경
    const newGameInfo = gameInfo;
    newGameInfo.color = themeColor;
    newGameInfo.logoUrl = themeLogo;
    setGameInfo(newGameInfo);

    // 테마 API

    const result = creatorAPI.putGameRoom({
      roomId: gameInfo.id,
      color: themeColor,
      logoImage: themeLogo,
      title: gameInfo.title,
      eventUrl: "test",
      eventDesc: gameInfo.eventDesc,
      startTime: gameInfo.startTime,
      endTime: gameInfo.endTime,
    });

    result
      .then((res) => {
        console.log("보낸거");
        console.log(gameInfo);
        console.log("수정됨?");
        console.log(res);
      })
      .catch((res) => {
        console.log("수정안됨");
        console.log(res);
      });

    // 리워드 API
  };

  // useEffect(() => {
  //   if (gameInfo) {
  //     const gotThemeColor = gameInfo.brandColor;
  //     const gotThemeImg = gameInfo.LogoUrl;
  //     setThemeColor(gotThemeColor);
  //     setThemeImg(gotThemeImg);
  //   }
  // }, []);

  return (
    <div
      className="custom-modal-container"
      style={isOpen ? { right: "0" } : { left: "120%" }}
    >
      <button type="button" onClick={modalHandler} className="close-button">
        <img src={closeImg} alt="닫기" />
      </button>
      <LogoInput themeLogo={themeLogo} imgHandler={imgHandler} />
      <ColorInput themeColor={themeColor} colorHandler={colorHandler} />
      <button type="button" className="add-reward-button">
        <p className="plus-button">+</p>
        <p>경품 등록하기</p>
      </button>
      <RewardsList />
      <br />
      <Button size="medium" text="확인" onClick={postTheme} />
    </div>
  );
}
