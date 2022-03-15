import React from "react";
import styled from "styled-components";
import { ChattingHeader } from "./components";
import ChattingForm from "./components/ChattingForm";
import ChattingList from "./components/ChattingList";

const Chatting: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <ChattingHeader />
        <ChattingForm />
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
