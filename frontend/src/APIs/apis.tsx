import { AxiosHeaders, AxiosResponse } from "axios";
import request from "./agents";

// APis about game play
const gamePlayAPI = {
  enter: (roomCode: number): Promise<AxiosResponse> =>
    request.get("/game/enter", { params: { roomCode } }),
  // 게임 신규참여
  start: (
    roomId: number,
    nickname: string,
    startTime: string
  ): Promise<AxiosResponse> =>
    request.post("/game/start", { params: { roomId, nickname, startTime } }),
  // 게임 재참여
  rejoin: (roomId: number, nickname: string): Promise<AxiosResponse> =>
    request.post("/game/rejoin", { params: { roomId, nickname } }),
  // 게임 로그인
  login: (
    roomId: number,
    nickname: string,
    password: number
  ): Promise<AxiosResponse> =>
    request.post("/game/login", { params: { roomId, nickname, password } }),
};

const memberAPI = {
  duplicateEmail: (email: string): Promise<AxiosResponse> =>
    request.get("member/duplicateEmail", {
      params: { email },
    }),
  duplicateNickName: (nickname: string): Promise<AxiosResponse> =>
    request.get("member/duplicateNickname", {
      params: { nickname },
    }),
  signUp: (
    nickname: string,
    password: string,
    organization: string,
    email: string
    // registrationId?: string
  ): Promise<AxiosResponse> =>
    request.post("member/signup", { nickname, password, organization, email }),
};

const MLAPI = {
  predict: (formData: FormData): Promise<AxiosResponse> =>
    request.postPython("game/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    }),
};

export { gamePlayAPI, memberAPI, MLAPI };
