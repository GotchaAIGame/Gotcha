import request from "./agents";

// APis about game play
const gamePlayAPI = {
  enter: (roomCode: number): Promise<object> =>
    request.get("/api/game/enter", { params: { roomCode } }),
};

export { gamePlayAPI };
