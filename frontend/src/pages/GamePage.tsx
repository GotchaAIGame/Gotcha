import React, { useState, useEffect } from "react";
import "@styles/GamePage.scss";
import { Grid } from "@mui/material";
import ProblemTitle from "@components/Game/ProblemTitle";
import Timer from "@components/Game/Timer";
import ProblemCardList from "@components/Game/ProblemCardList";

export default function GamePage() {
  const roomTitle = "같은 것을 찾아라 같챠!";

  return (
    <Grid container className="gamepage-container">
      <Grid item xs={11} md={9} className="gamepage-item">
        <ProblemTitle />
        <Timer />
        <ProblemCardList />
      </Grid>
    </Grid>
  );
}
