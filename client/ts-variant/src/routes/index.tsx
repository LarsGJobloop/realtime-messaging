import style from "./style.module.css";

import { useState } from "react";

import { ChatRoom } from "../models/chatService";

import { ToAdmin } from "../components/ToAdmin/ToAdmin";
import { ToAddRoom } from "../components/ToAddRoom/ToAddRoom";
import { Link } from "react-router-dom";

const mockList: ChatRoom[] = [
  { id: "Pirates", name: "pirates cove" },
  { id: "Maestro", name: "Colloseum" },
  { id: "Saints", name: "Dead hill" },
  { id: "Clickbait", name: "Memes" },
];

/**
 * This is the default landing page
 */
export function Lobby() {
  const [rooms] = useState<ChatRoom[]>(mockList);

  return (
    <div className={style["Lobby"]}>
      <header className={style["header"]}>
        <ToAdmin />
        <ToAddRoom />
      </header>

      <main className={style["main"]}>
        <ul className={style["rooms"]}>
          {rooms.map((room) => {
            return (
              <li key={room.id}>
                <RoomCard room={room}/>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

interface RoomCardProps {
  room: ChatRoom
}

function RoomCard({room}: RoomCardProps) {
  return (
    <Link className={style["RoomCard"]} to={`/room/${room.id}`}>
      <h2>{room.name}</h2>
    </Link>
  )
}
