import React from "react";
import { Container } from "@mui/material";

export default function InputPinNum() {
  return (
    <Container className="input-pin-num-container">
      <input type="text" placeholder="PIN번호" />
    </Container>
  );
}
