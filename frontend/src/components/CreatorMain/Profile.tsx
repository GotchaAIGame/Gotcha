import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Button from "@components/common/Button";


export default function Profile() {
  const userId = useSelector((state: any) => state.users.userId);

  return (
    <Grid container className="profile-infos-container">
      <Grid item xs={6} md={12} className="profile-wrapper">
        <img
          src="https://mblogthumb-phinf.pstatic.net/MjAyMjAxMjVfMjAy/MDAxNjQzMTAyOTk2NjE0.gw_H_jjBM64svaftcnheR6-mHHlmGOyrr6htAuxPETsg.8JJSQNEA5HX2WmrshjZ-VjmJWqhmgE40Qm5csIud9VUg.JPEG.minziminzi128/IMG_7374.JPG?type=w800"
          alt="profile"
        />
      </Grid>
      <Grid item xs={6} md={12}>
        <Grid container className="profile-texts-container">
          <Grid item xs={12} sm={6} md={12}>
            {userId ? <h3>{userId}</h3> : <h3>비로그인</h3>}
          </Grid>
          <Grid item xs={12} sm={6} md={12}>
            <Button size="small" color="skyblue" text="프로필 수정하기" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
