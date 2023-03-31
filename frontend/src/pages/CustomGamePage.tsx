import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";

import ProblemTitle from "@components/Game/ProblemTitle";
import Timer from "@components/Game/Timer";
import ProblemCardList from "@components/Game/ProblemCardList";
import CustomModal from "@components/CustomGame/CustomModal";
import "@styles/CustomModalPage.scss";

export default function CustomGamePage() {
  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const roomId = location.state.gameId;

  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    console.log("새로운 시작!");
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
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Grid>
  );
}
