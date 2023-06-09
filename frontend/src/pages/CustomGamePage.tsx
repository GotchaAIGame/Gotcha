import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import { creatorAPI } from "@apis/apis";
import { setTheme } from "@stores/player/themeSlice";
import ProblemTitle from "@components/Game/ProblemTitle";
import Timer from "@components/Game/Timer";
import ProblemCardList from "@components/Game/ProblemCardList";
import CustomModal from "@components/CustomGame/CustomModal";
import "@styles/CustomModalPage.scss";
import { useAppDispatch } from "@stores/storeHooks";
import { setProblems } from "@stores/game/gamePlaySlice";
import CustomNavbar from "@components/common/CustomNavbar";
import GlobalNavbar from "@components/common/GlobalNavbar";
import Progressbar from "@components/CreateGame/Progressbar";
import Hambugerbar from "@components/common/Hambugerbar";

export default function CustomGamePage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [initialHasReward, setInitialHasReward] = useState<boolean>(false);

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

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { roomId, prevLoc } = location.state;

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (roomId) {
      const result = creatorAPI.getGameDetail(roomId);
      result.then((res) => {
        const newInfo = res.data.result;
        // 최종적으로 사용할 값 저장
        setGameInfo(newInfo);
        // store에 저장된 값 갱신
        const { roomId, color, logoUrl, title, hasReward } = res.data.result;
        console.log(res, "res");
        if (hasReward) {
          console.log("트루");
          setInitialHasReward(true);
        }
        dispatch(
          setTheme({
            room: roomId,
            reward: hasReward,
            themeColor: color,
            themeLogo: logoUrl,
            themeTitle: title,
          })
        );
        dispatch(setProblems(newInfo.problems));
      });
    } else {
      alert("비정상적 접근입니다");
    }
  }, []);

  return (
    <>
      <Hambugerbar />
      <GlobalNavbar />
      <Grid container className="custom-page-main-container">
        <Grid item xs={12} md={8}>
          <Progressbar progress={2} />
        </Grid>
        {/* <p>미리 보기</p> */}
        <Grid item xs={12} md={12}>
          <p className="preview-text">페이지 미리보기</p>
          <div className="custom-preview-main-box-container">
            <CustomNavbar />
            <Grid container className="custom-preview-wrapper">
              <Grid item xs={11} md={9}>
                <Timer />
                <ProblemCardList />
              </Grid>
            </Grid>
          </div>
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
          prevLoc={prevLoc}
          initialhasReward={initialHasReward}
        />
      </Grid>
    </>
  );
}
