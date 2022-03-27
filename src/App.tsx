import React from "react";
import styled from "styled-components";
import { Chatting } from "./pages/Chatting";

function App() {
  return (
    <Container>
      <Chatting />
    </Container>
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
