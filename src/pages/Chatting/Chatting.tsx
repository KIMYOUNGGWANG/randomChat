import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { ChattingHeader } from "./components";

import ChattingForm from "./components/ChattingForm";
import ChattingRoomList from "./components/ChattingRoomList";
interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  userName: string;
  roomName: string;
}

const Chatting: React.FC<Props> = ({ socket, userName, roomName }) => {
  const [removeHeader, setRemoveHeader] = useState(false);
  useEffect(() => {
    socket.on("userName", (data) => {
      if (data) setRemoveHeader(true);
    });
  }, []);
  return (
    <Container>
      <Wrapper>
        {!removeHeader && <ChattingHeader socket={socket} />}
        <ChattingRoomList socket={socket} />
      </Wrapper>
    </Container>
  );
};

export default Chatting;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 500px;

  background-color: #ffffff;
`;
