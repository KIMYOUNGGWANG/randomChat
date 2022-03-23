import React, { useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { ClientToServerEvents, ServerToClientEvents } from "../../../@types/soket";

interface Props {
  socket :  Socket<ServerToClientEvents, ClientToServerEvents>
}
const ChattingHeader: React.FC<Props> = ({socket}) => {
  const [userName, setUserName] = useState("");
  const room = "random"
  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };
  const EnterRoom = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("enterChatroom", {userName, room});
    setUserName("");
  };
  return (
    <Container>
      <FormWrapper onSubmit={EnterRoom}>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          onChange={(e) => handleUserName(e)}
          value={userName}
        />
        <button>Join</button>
      </FormWrapper>
      <HeaderWrapper>
        <HeaderContent>Chatting App</HeaderContent>
      </HeaderWrapper>
    </Container>
  );
};

export default ChattingHeader;

const Container = styled.div`
  width: 100%;
`;

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  background-color: black;
  height: 50px;
  color: wheat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.form`
  width: 100%;
  height: 20px;
  padding: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    height: 100%;
  }
  button {
    height: 20px;
    margin-left: 10px;
  }
`;
