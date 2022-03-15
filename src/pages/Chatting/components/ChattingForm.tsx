import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import ChattingList from "./ChattingList";

const socket = io("http://localhost:4000");

export interface Chat {
  id: string;
  message: string;
  name?: string;
}

const ChattingForm: React.FC = () => {
  const [state, setState] = useState<Chat>({ id: "", message: "" });
  const [chat, setChat] = useState<Chat[]>([]);
  const [yourId, setYourId] = useState<string>("");
  useEffect(() => {
    socket.on("message", (state) => {
      const copy = { ...state };
      setChat([...chat, copy]);
    });
  });

  useEffect(() => {
    socket.on("reciveChat", (name) => {
      console.log(name);
      setYourId(name);
    });
    socket.on("mysocketid", (data) => {
      console.log(data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { message, id } = state;

    socket.emit("sendChat", message, id);
    setState({ ...state, message: "" });
    // localStorage.setItem("id", state.name);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, message: e.currentTarget.value });
  };
  console.log(chat);
  return (
    <>
      {yourId && <div>{yourId}님이 입장하셨습니다.</div>}

      <ChattingList chat={chat} yourId={yourId} />
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="write"
            onChange={(e) => handleChangeInput(e)}
            name="message"
            value={state.message}
          />
          <button>send</button>
        </Form>
      </Container>
    </>
  );
};

export default ChattingForm;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 30px;
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
