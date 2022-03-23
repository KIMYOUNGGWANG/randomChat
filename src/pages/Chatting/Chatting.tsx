import React from "react";
import styled from "styled-components";
import { ChattingHeader } from "./components";
import {io,  Socket } from "socket.io-client";

import ChattingForm from "./components/ChattingForm";
import { ClientToServerEvents, ServerToClientEvents } from "../../@types/soket";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:4000");

const Chatting: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <ChattingHeader socket={socket}/>
        <ChattingForm socket={socket}/>
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
