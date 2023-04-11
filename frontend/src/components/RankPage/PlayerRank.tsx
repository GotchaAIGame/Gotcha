/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { gamePlayAPI, creatorAPI } from "@apis/apis";
import { useLocation } from "react-router";
import { Grid } from "@mui/material";
import RankInfo from "./RankInfo";
import "@styles/RankPage.scss";
// import ShareButton from "./ShareButton";

interface IUser {
  grade: number;
  nickname: string;
  duration: string;
  isUser: boolean;
  solvedCnt: number;
  phoneNumber: string;
}

export default function PlayerRank() {
  const [userArray, setUserArray] = useState<IUser[]>([]);
  const location = useLocation();
  const creatorRoom = location.state.roomId;

  // useSelctor로 뽑아쓰기
  const playerRoom = useSelector((state: any) => state.theme.room);
  const nickname = useSelector((state: any) => state.gamePlay.nickname);

  const fromMy = location.state.fromMypage;
  useEffect(() => {
    const delay = setTimeout(() => {
      // 마이페이지에서 넘어올 때
      if (fromMy === true) {
        const api = creatorAPI.rankAll(creatorRoom);
        api.then((res) => {
          const users = res.data.result;
          setUserArray(users);
        });
      }

      if (fromMy === false && playerRoom !== 0 && nickname) {
        console.log(playerRoom, nickname);
        const api = gamePlayAPI.rank(playerRoom, nickname);
        api.then((res) => {
          const users = res.data.result;
          setUserArray(users);
        });
      }
    }, 1000); // 1초(1000ms) 지연시간 설정

    return () => clearTimeout(delay);
  }, [location.pathname, playerRoom, nickname, fromMy]);
  return (
    <section className="player-rank-wrapper">
      <header className="ranking-title-flag">
        <h1>Ranking</h1>
      </header>
      <div className="rank-content">
        {fromMy ? (
          <Grid container className="rank-header">
            <Grid item xs={1} md={1}>
              <h5 className="rank-box1">등수</h5>
            </Grid>
            <Grid item xs={2} md={4}>
              <h5 className="rank-box2">닉네임</h5>
            </Grid>
            <Grid item xs={1} md={3}>
              <h5 className="rank-box3">시간</h5>
            </Grid>
            <Grid item xs={1} md={1}>
              <h5 className="rank-box4">정답</h5>
            </Grid>
            <Grid item xs={2} md={3}>
              <h5 className="rank-box5">전화번호</h5>
            </Grid>
          </Grid>
        ) : (
          <Grid container className="rank-header">
            <Grid item xs={2} md={2}>
              <h5 className="rank-box1">등수</h5>
            </Grid>
            <Grid item xs={4} md={4}>
              <h5 className="rank-box2">닉네임</h5>
            </Grid>
            <Grid item xs={4} md={4}>
              <h5 className="rank-box3">시간</h5>
            </Grid>
            <Grid item xs={2} md={2}>
              <h5 className="rank-box4">정답</h5>
            </Grid>
          </Grid>
        )}
        {userArray.map((user: IUser, index: number) => (
          <div
            style={{
              backgroundColor: user.isUser ? "#E8E8E8" : "transparent",
              animationDelay: `${index * 0.3}s`,
            }}
            className="rankInfo-wrapper"
            key={index}
          >
            {fromMy ? (
              <RankInfo
                rank={user.grade}
                nickname={user.nickname}
                time={user.duration}
                cnt={user.solvedCnt}
                number={user.phoneNumber}
                fromMy
              />
            ) : (
              <RankInfo
                rank={user.grade}
                nickname={user.nickname}
                time={user.duration}
                cnt={user.solvedCnt}
              />
            )}
          </div>
        ))}
      </div>
      {/* <ShareButton /> */}
    </section>
  );
}
