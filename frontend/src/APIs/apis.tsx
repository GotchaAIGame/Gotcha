import request from "./agents";

// APis about game play
const gamePlayAPI = {
  enter: (roomCode: number): Promise<object> =>
    request.get("/api/game/enter", { params: { roomCode } }),
  register: (
    roomId: number,
    nickname: string,
    password: number
  ): Promise<Object> =>
    request.post("api/game/register", {
      data: { roomId, nickname, password },
    }),
  start: (
    roomId: number,
    nickname: string,
    startDateTime: string
  ): Promise<Object> =>
    request.post("api/game/start", {
      data: { roomId, nickname, startDateTime },
    }),
};

export { gamePlayAPI };