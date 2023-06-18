import style from "./style.module.css";

import { ToAdmin } from "../components/ToAdmin/ToAdmin";
import { ToAddRoom } from "../components/ToAddRoom/ToAddRoom";
import { RoomList } from "../components/RoomList/RoomList";

/**
 * This is the default landing page
 */
export function Lobby() {
  return (
    <div className={style["Lobby"]}>
      <header className={style["header"]}>
        <ToAdmin />
        <ToAddRoom />
      </header>

      <main className={style["main"]}>
        <RoomList />
      </main>
    </div>
  );
}
