import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function InputPinNum() {
  return (
    <div className="input-pin-num-container">
      {/* <Grid container className="input-pin-num-container"> */}
      {/* <Grid item md={9} sm={9}> */}
      <input type="text" placeholder="PIN번호를 입력해주세요" />
      <button type="submit">시작하기</button>
      <Link to="/rejoin" className="rejoin-link">
        <h3>게임에 이미 참여하신 적이 있나요?</h3>
      </Link>
      {/* </Grid> */}
      {/* </Grid> */}
    </div>
  );
}
