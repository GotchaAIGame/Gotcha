import React from "react";
import { Grid } from "@mui/material";
import RankInfo from "./RankInfo";
import "@styles/RankPage.scss";
// import title from "@assets/RankingFlag.svg";

export default function PlayerRank() {
  return (
    <section className="player-rank-wrapper">
      <header className="ranking-title-flag">
        <h1>Ranking</h1>
      </header>
      <div className="rank-content">
        <Grid container className="rank-header">
          <Grid item xs={3} md={3}>
            <h5 className="rank-box1">등수</h5>
          </Grid>
          <Grid item xs={4} md={4}>
            <h5 className="rank-box2">닉네임</h5>
          </Grid>
          <Grid item xs={3} md={3}>
            <h5 className="rank-box3">시간</h5>
          </Grid>
        </Grid>
        <RankInfo rank={1} nickname="솜따" />
        <RankInfo rank={2} nickname="규투리" />
        <RankInfo rank={3} nickname="냄궁민수" />
        <RankInfo rank={602} nickname="예지는꼴지" time="" />
      </div>
    </section>
  );
}
