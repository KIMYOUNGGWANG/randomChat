import React, { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  userInfo: { userName: string; roomName: string };
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Login: React.FC<Props> = ({ socket, userInfo, inputHandler }) => {
  const navigate = useNavigate();
  const joinRoom = () => {
    if (userInfo.userName !== "" && userInfo.roomName !== "") {
      // room에 join
      socket.emit("joinRoom", userInfo.roomName);
      navigate("/chattingform");
    }
  };

  return (
    <div>
      <h3>Join A Chat</h3>
      <form>
        <div>
          <label>
            아이디
            <input type="text" name="userName" onChange={inputHandler} />
          </label>
        </div>
        <div>
          <label>
            채팅방 이름
            <input type="text" name="roomName" onChange={inputHandler} />
          </label>
        </div>

        <button onClick={joinRoom}>join</button>
      </form>
    </div>
  );
};

export default Login;
