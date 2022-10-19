import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Socket } from "socket.io-client";
import styled from "styled-components";
interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const listData = [1, 2, 3, 4, 5, 6];
const ChattingRoomList: React.FC<Props> = ({ socket }) => {
  const [rooms, setRooms] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket?.on("roomChange", (list) => {
      setRooms(list);
    });
  }, []);

  const handleNewRoom = (event: any) => {
    event.preventDefault();
    const name = event.target.roomname.value;
    event.target.roomname.value = "";
    if (name.length === 0) return;
    socket?.emit("createRoom", name);
  };

  const handleEnterRoom = (room: any) => {
    socket?.emit("joinRoom", room);
  };
  return (
    <ListWrapper>
      <form onSubmit={handleNewRoom}>
        <input />
      </form>
      {listData.map((el) => {
        return (
          <List onClick={handleEnterRoom}>
            <div>
              <p>방제목</p>
              <p>생성자</p>
            </div>
          </List>
        );
      })}
    </ListWrapper>
  );
};

export default ChattingRoomList;

const ListWrapper = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const List = styled.li`
  width: 100%;
  height: 100px;
  border: 1px solid black;
`;
