import app from "express";
import http from "http";
import * as so from "socket.io";
const server = http.createServer(app);
const port = 4000;
const io = new so.Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
io.on("connection", function (socket: so.Socket) {
  console.log("User Connected", socket.id);
  // room 입장
  socket.on("joinRoom", (data: string) => {
    socket.join(data);
    console.log(`User with Id:${socket.id} joined room :${data}`);
  });

  socket.on("sendMessage", (data: any) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnect", socket.id);
  });
});
// io.on("connection", (socket: any) => {
//   console.log(`User Connected : ${socket.id}`);
//   socket.on("enterChatroom", (data: { userName: string; room: string }) => {
//     socket.join(data?.room);
//     socket.emit("userName", data?.userName);
//     console.log(`${data.userName}님이 ${data.room}에 입장하셨습니다.`);
//   });

//   socket.on("sendMessage", (data: { room: string; author: string; message: string; time: string }) => {
//     console.log(data);
//     socket.to(data?.room).emit("receive_message", data);
//   });
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//   });
// });

server.listen(port, function () {
  console.log("prot:4000");
});
