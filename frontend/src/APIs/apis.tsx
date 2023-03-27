import { AxiosResponse } from "axios";
import request from "./agents";

// APis about game play
const gamePlayAPI = {
  enter: (roomCode: number): Promise<AxiosResponse> =>
    request.get("/api/game/enter", { params: { roomCode } }),
  register: (
    roomId: number,
    nickname: string,
    password: number
  ): Promise<AxiosResponse> =>
    request.post("api/game/register", {
      data: { roomId, nickname, password },
    }),
  start: (
    roomId: number,
    nickname: string,
    startDateTime: string
  ): Promise<AxiosResponse> =>
    request.post("api/game/start", {
      data: { roomId, nickname, startDateTime },
    }),
};

const memberAPI = {
  duplicateEmail : (email:string):
  Promise<AxiosResponse> => request.get("member/duplicateEmail", {
    params : {email},
  })
}

export { gamePlayAPI, memberAPI };
