/* eslint-disable react/jsx-no-useless-fragment */
import React from "react";
// import gold from "@assets/GoldMedal.svg";
import gold from "@assets/goldmedal.png";
import silver from "@assets/silvermedal.png";
import bronze from "@assets/bronzemedal.png";
import { Grid } from "@mui/material";

interface RankInfoProps {
  rank?: number;
  nickname?: string;
  time?: string;
  cnt?: number;
  number?: string;
  fromMy?: boolean;
}

export default function RankInfo({
  rank,
  nickname,
  time,
  cnt,
  number,
  fromMy,
}: RankInfoProps) {
  let medal = null;
  if (rank === 1) {
    medal = gold;
  } else if (rank === 2) {
    medal = silver;
  } else if (rank === 3) {
    medal = bronze;
  } else {
    medal = null;
  }

  return (
    <>
      {fromMy ? (
        <Grid container className="rank-info-wrapper">
          <Grid item xs={2} md={1}>
            {medal == null ? (
              <>
                <hr />
                <div className="no-medal-wrapper">
                  <h3 className="medal-txt">{rank}</h3>
                </div>
              </>
            ) : (
              <img src={medal} alt="메달" />
            )}
          </Grid>
          <Grid item xs={4} md={4}>
            <h5>{nickname}</h5>
          </Grid>
          <Grid item xs={4} md={3}>
            <p>{time}</p>
          </Grid>
          <Grid item xs={2} md={1}>
            <p>{cnt}</p>
          </Grid>
          <Grid item xs={2} md={3}>
            <p>{number}</p>
          </Grid>
        </Grid>
      ) : (
        <Grid container className="rank-info-wrapper">
          <Grid item xs={2} md={2}>
            {medal == null ? (
              <>
                <hr />
                <div className="no-medal-wrapper">
                  <h3 className="medal-txt">{rank}</h3>
                </div>
              </>
            ) : (
              <img src={medal} alt="메달" />
            )}
          </Grid>
          <Grid item xs={4} md={4}>
            <h5>{nickname}</h5>
          </Grid>
          <Grid item xs={4} md={4}>
            <p>{time}</p>
          </Grid>
          <Grid item xs={2} md={2}>
            <p>{cnt}</p>
          </Grid>
        </Grid>
      )}
    </>
  );
}

RankInfo.defaultProps = {
  rank: 1,
  nickname: "닉네임",
  time: '00"00"00"',
  cnt: 0,
  number: "",
  fromMy: false,
};
