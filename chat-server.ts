
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket:any) => {
  console.log(`User Connected : ${socket.id}`);
  socket.on("enterChatroom", (userName:string ,room:string) => {
    socket.join(room);
    io.emit("userName", userName);
    console.log(`${userName}님이 ${room}에 입장하셨습니다.`);
  });

  socket.on("sendMessage", ({data}:any) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  // io.to(socket.id).emit("mysocketid", { socketId: socket.id });
  // socket.on("userName", (name) => {
  //   io.emit("userName", name);
  // });

  // socket.on("enterChatroom", (userName) => {
  //   socket.broadcast.emit("reciveChat", userName);
  // });

  // socket.on("sendChat", (data) => {
  //   console.log(`${socket.id}: ${data}`);
  //   io.emit("message", { id: socket.id, message: data });
  // });

  // socket.on("leaveChatRoom", (data) => {
  //   console.log("leave chatroom", data);
  //   socket.broadcast.emit("receiveChat");
  // });
  // socket.broadcast.emit("message", "A user has join the chat");

  // // disconnects
  // socket.on("disconnect", () => {
  //   io.emit("message", "A user has left the chat");
  // });
  // 메세지를 받으면

  // socket.on("chatMessage", ({ name, message }) => {
  //   console.log(name, message);
  //   io.emit("message", { name, message });
  // });
});

server.listen(4000, function () {
  console.log("prot:4000");
});
