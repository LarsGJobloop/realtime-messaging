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
        <ul>
          {rooms.map((room) => {
            return (
              <li key={room.id}>
                <Link to={`/room/${room.id}`}>{room.name}</Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
