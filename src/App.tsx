import React, { useState } from "react";
import styled from "styled-components";
import { Chatting } from "./pages/Chatting";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ChattingRoomList from "./pages/Chatting/components/ChattingRoomList";
import { io, Socket } from "socket.io-client";
import Login from "./pages/Chatting/components/Login";
import ChattingForm from "./pages/Chatting/components/ChattingForm";

function App() {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000");
  const [userInfo, setUserInfo] = useState({ userName: "", roomName: "" });
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <Router>
      <Container>
        <Routes>
          <Route element={<Login socket={socket} userInfo={userInfo} inputHandler={inputHandler} />} path="/" />
          <Route element={<ChattingForm userName={userInfo.userName} roomName={userInfo.roomName} socket={socket} />} path={`/chattingform`} />

          <Route element={<ChattingRoomList socket={socket} />} path="/chhttingList" />
          {/* <Route element={<Chatting userName={userInfo.userName} roomName={userInfo.roomName} socket={socket} />} path={`/chattingRoom/:roomId`} /> */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;
