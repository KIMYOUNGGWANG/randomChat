import React, { useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";

const socket = io("http://localhost:4000");

const ChattingHeader: React.FC = () => {
  const [userName, setUserName] = useState("");
  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };
  const EnterChatting = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit("enterChatroom", userName);
    setUserName("");
  };
  return (
    <Container>
      <FormWrapper onSubmit={EnterChatting}>
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
