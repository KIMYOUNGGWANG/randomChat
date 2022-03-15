import React from "react";
import styled from "styled-components";
import { Chat } from "./ChattingForm";

interface ChatProps {
  chat: Chat[];
  yourId?: string;
}
const ChattingList = ({ chat, yourId }: ChatProps) => {
  const renderChat = () => {
    return (
      <Container>
        {chat?.map((el, idx) => {
          return (
            <ChattingListWrapper key={idx}>
              <MessageBox>
                <div className="myMessage">
                  <p className="userName">{yourId}</p>
                  <p className="message">{el.message}</p>
                </div>
              </MessageBox>
            </ChattingListWrapper>
          );
        })}
      </Container>
    );
  };
  return <>{renderChat()}</>;
};

export default ChattingList;

const Container = styled.div`
  width: 100%;
  height: 90%;
  overflow: scroll;
`;

const ChattingListWrapper = styled.section`
  padding: 0 10px;
  box-sizing: border-box;
`;

const MessageBox = styled.div`
  min-height: 40px;
  margin: 5px 0;
  .userName {
    margin: 0 0 5px 0;
    font-size: 14px;
  }
  .message {
    margin: 0;
    font-size: 18px;
    color: white;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    background-color: rgb(240, 119, 59);
    min-height: 40px;
    border-radius: 10px;
  }
  .myMessage {
    text-align: end;
    .message {
      justify-content: end;
    }
  }
`;
