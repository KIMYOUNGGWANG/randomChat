import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { ClientToServerEvents, ServerToClientEvents } from "../../../@types/soket";
import ChattingList from "./ChattingList";


export interface Chat {
  room : string;
  author :string;
  message:string;
  time: string;
}

interface Props {
  socket :  Socket<ServerToClientEvents, ClientToServerEvents>
}

const ChattingForm: React.FC<Props> = ({socket}) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Chat[]>([]);
  const [yourId, setYourId] = useState<string>("");
  useEffect(() => {
    socket.on("userName",(data:any)=>{
      setYourId(data)
    })
  },[yourId,socket]);

  useEffect(()=>{
    socket.on("receive_message",(data:any)=>{
      setChat(prev=>[...prev, data])
    })
  },[socket])
  const renderTime = () => {
    const time = new Date(Date.now()).getMinutes()<10? `${new Date(Date.now()).getHours()}:0${new Date(Date.now()).getMinutes()} `:`${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`
    return time;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageData = {
      room : "random",
      author : yourId,
      message,
      time: renderTime()
    }

    await socket.emit("sendMessage",messageData);
    setMessage('')
    setChat(prev=>[...prev, messageData])

  };
  console.log(chat)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };
  return (
    <>
      {yourId && <div style={{backgroundColor:"#9bbbd4"}}>{yourId}님이 입장하셨습니다.</div>}
      <ChattingList chat={chat} yourId={yourId}/>
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="write"
            onChange={(e) => handleChangeInput(e)}
            name="message"
            value={message}
          />
          <button>send</button>
        </Form>
      </Container>
    </>
  );
};

export default ChattingForm;

const Container = styled.div`
  width: 100%;
  height: 30px;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  height: 30px;
  align-items: center;
  box-sizing: border-box;
  input {
    flex: 5;
    height: 100%;
    border: 1px solid rgb(150, 150, 150);
    font-size: 18px;
    outline: none;
    transition: border 0.2s;
    border-radius: 5px;
    margin: 0 5px;
    padding: 5px;
    box-sizing: border-box;
  }
  input:first-child {
    flex: 5;
  }
  input:focus {
    border: 1px solid rgb(240, 119, 59);
  }
  button {
    flex: 2;
    margin-left: 10px;
    border: 0px;
    background: rgb(240, 119, 59);
    width: 100px;
    height: 100%;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    color: white;
    font-size: 18px;
    transition: background-color 0.2s;
  }
`;
