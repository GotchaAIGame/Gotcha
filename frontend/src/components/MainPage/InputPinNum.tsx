import React, { useState } from "react";
import { Grid } from "@mui/material";

export default function InputPinNum() {
  return (
    <Grid container className="input-pin-num-container">
      <Grid item md={9} sm={9}>
        <form>
          <input type="text" placeholder="PIN번호" />
        </form>
      </Grid>
    </Grid>
  );
}
