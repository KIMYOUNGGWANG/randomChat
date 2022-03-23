export interface ServerToClientEvents {
  noArg: () => void;
  userName:(a:string, callback:()=>void)=>void;
  receive_message:(data:any)=>void;

  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  enterChatroom: (data:{}) => void;
  sendMessage:(messageData:object)=>void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
