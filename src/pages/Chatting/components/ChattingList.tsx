import React from "react";
import styled from "styled-components";
import { Chat } from "./ChattingForm";

interface ChatProps {
  chatList: Chat[];
  userName: string;
}
const ChattingList: React.FC<ChatProps> = ({ chatList, userName }) => {
  const renderChat = () => {
    return (
      <Container>
        {userName && <div>{userName}님이 입장하셨습니다.</div>}
        {chatList?.map((el, idx) => {
          return (
            <ChattingListWrapper key={idx}>
              <MessageBox>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: `${el.author === userName ? "flex-end" : "flex-start"}`,
                  }}
                >
                  <p className={`${el.author === userName ? "me" : "other"}`}>{el.author}</p>
                  <p className={el.author === userName ? "message" : "myMessage"}>{el.message}</p>
                  <span className="time">{el.time}</span>
                </div>
              </MessageBox>
            </ChattingListWrapper>
          );
        })}
        <ChattingListWrapper>
          <MessageBox></MessageBox>
        </ChattingListWrapper>
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
  background-color: #9bbbd4;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChattingListWrapper = styled.section`
  padding: 0 10px;
  box-sizing: border-box;
`;

const MessageBox = styled.div`
  min-height: 40px;
  margin: 5px 0;
  .userName {
    padding: 0 0 5px 0;
    margin: 0;
    font-size: 14px;
    position: relative;
    background-color: #9bbbd4;
  }
  .me {
    text-align: end;
    margin: 0;
  }
  .other {
    margin: 0;
  }
  .message {
    margin: 0;
    font-size: 18px;
    color: black;
    display: flex;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
    min-height: 40px;
    border-radius: 10px;
    background-color: #9bbbd4;
  }
  .myMessage {
    text-align: start;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
  }
  .message {
    justify-content: end;
    background-color: #fef01b;
  }

  .time {
    font-size: 10px;
    color: #999999;
  }
`;
