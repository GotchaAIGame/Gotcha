import React from "react";
import "./styles/Loading.scss";
// import { useSelector } from 'react-redux'

export default function Loading() {
  return (
    <div className="loading-background">
      <span>게</span>
      <span>임</span>
      <span>생</span>
      <span>성</span>
      <span>중</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
}
