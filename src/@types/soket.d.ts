interface CreateRoomResponse {
  success: boolean;
  payload: string;
}
interface ServerToClientEvents {
  noArg: () => void;
  receive_message: (data: any) => void;
  sendMessage: (messageData: object) => void;
  joinRoom: (roomName: string) => void;
  roomList: (rooms: string[]) => void;
  userName: (a: string) => void;
  // deleteRoom: (roomName: string) => void;
  createRoom: (newRoom: string) => void;
  roomChange: (list: string[]) => void;

  // leaveRoom: () => void;
}

interface ClientToServerEvents {
  joinRoom: (roomName: string) => void;
  roomList: (rooms: string[]) => void;
  userName: (a: string) => void;
  sendMessage: (messageData: object) => void;
  // deleteRoom: (roomName: string) => void;
  createRoom: (newRoom: string) => void;
  roomChange: (list: string[]) => void;
  // leaveRoom: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
