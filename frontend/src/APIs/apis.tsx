import apiClient from "./interface";

interface roomCode {
  code: number;
}

async function EnterRoomAPI(roomcode: roomCode): Promise<roomCode> {
  const response = await apiClient.get<roomCode>("/api/game/enter");
  return response.data;
}

export { EnterRoomAPI };
