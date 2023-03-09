import React from "react";
import { Link } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import "../Styles/MainPage.scss";

export default function MainPage() {
  return (
    // 그리드 테스트 용입니다.
    <Container>
      <p>Main</p>
      <Grid container spacing={2} className="checks-container">
        <Grid xs={10} sm={6} className="check-item">
          그리드 확인용 1
        </Grid>
        <Grid xs={6} sm={4} className="check-item">
          그리드 확인용 2
        </Grid>
        <Grid xs={6} sm={8} className="check-item">
          그리드 확인용 3
        </Grid>
      </Grid>
      <input placeholder="PIN번호" />
      <p>출제자 페이지 가는 곳</p>
      <Link to="/create/game">
        <button type="button">문제 출제하기</button>
      </Link>
      {/* <div className="ocean">
        <div className="wave" />
        <div className="wave" />
      </div> */}
    </Container>
  );
}
