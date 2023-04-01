import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import { creatorAPI } from "@apis/apis";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "@stores/player/themeSlice";
import ProblemTitle from "@components/Game/ProblemTitle";
import Timer from "@components/Game/Timer";
import ProblemCardList from "@components/Game/ProblemCardList";
import CustomModal from "@components/CustomGame/CustomModal";
import "@styles/CustomModalPage.scss";

export default function CustomGamePage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // 최종적으로 수정될 값
  const [gameInfo, setGameInfo] = useState({
    id: -1,
    color: "",
    logoUrl: "",
    title: "",
    eventUrl: "",
    eventDesc: "",
    code: -1,
    startTime: "",
    endTime: "",
    hasReward: false,
    rewards: [
      {
        id: -1,
        name: "",
        grade: -1,
        image: "",
      },
    ],
    problems: [
      {
        id: -1,
        name: "",
        hint: "",
        imageUrl: "",
      },
    ],
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { roomId } = location.state;

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("새로운 시작!");
    if (roomId) {
      const result = creatorAPI.getGameDetail(roomId);
      result.then((res) => {
        console.log(res.data.result);
        const newInfo = res.data.result;
        // 최종적으로 사용할 값 저장
        setGameInfo(newInfo);
        // store에 저장된 값 갱신
        const { roomId, color, logoUrl, title, hasReward } = res.data.result;
        dispatch(
          setTheme({
            room: roomId,
            reward: hasReward,
            themeColor: color,
            themeLogo: logoUrl,
            themeTitle: title,
          })
        );
      });
    } else {
      console.log("비정상적 접근");
    }
  }, []);

  return (
    <Grid container className="custom-page-main-container">
      <Grid item xs={12} md={9}>
        <ProblemTitle />
        <Timer />
        <ProblemCardList />
      </Grid>
      {/* <Modal /> */}
      {!isOpen && (
        <button type="button" className="open-button" onClick={modalHandler}>
          ◀
        </button>
      )}
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        gameInfo={gameInfo}
        setGameInfo={setGameInfo}
      />
    </Grid>
  );
}
