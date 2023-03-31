import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import Button from "@components/common/Button";
import profileDefault from "@assets/profileDefault.svg";

export default function Profile() {
  const userNickname = useSelector((state: any) => state.users.nickname);
  const userInfro = useSelector((state: any) => state.users);

  return (
    <Grid container className="profile-infos-container">
      <Grid item xs={6} md={12} className="profile-wrapper">
        {userInfro.profileImage === "url" ? (
          <img src={profileDefault} alt="profile" />
        ) : (
          <img src={userInfro.profileImage} alt="profile" />
        )}
      </Grid>
      <Grid item xs={6} md={12}>
        <Grid container className="profile-texts-container">
          <Grid item xs={12} sm={6} md={12}>
            <p>
              소속
              {userInfro.organization ? (
                <span>{userInfro.organization}</span>
              ) : (
                <span>없음</span>
              )}
            </p>
          </Grid>
          <Grid item xs={12} sm={5} md={12}>
            <Link to="edit">
              <Button size="small" color="skyblue" text="프로필 수정하기" />
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
