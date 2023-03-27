import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import ProblemTitle from "@components/Game/ProblemTitle";
import Timer from "@components/Game/Timer";
import ProblemCardList from "@components/Game/ProblemCardList";
import CustomModal from "@components/CustomGame/CustomModal";
import "@styles/CustomModalPage.scss";

export default function CustomGamePage() {
  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState<boolean>(true);
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
