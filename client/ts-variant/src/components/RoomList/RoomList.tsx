import { useState } from "react";

import { mockList } from "../../mocks/MockRoomlist";
import { ChatRoom } from "../../models/chatService";
import { RoomCard } from "../RoomCard/RoomCard";

import style from "./style.module.css";

export function RoomList() {
  const [rooms, setRooms] = useState(mockList);

  // Event Handlers
  function navigateToRoom(room: ChatRoom) {
    console.log(`Navigating to room: ${room.name}`);
  }

  return (
    <ul className={style["room-list"]}>
      {rooms.map((room) => {
        return (
          <li key={room.name}>
            <RoomCard meta={room} onClick={navigateToRoom} />
          </li>
        );
      })}
    </ul>
  );
}
