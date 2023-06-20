import style from "./style.module.css";

import { Link, Outlet } from "react-router-dom";

export function RoomLayout() {
  return (
    <div className={style["room-layout"]}>
      <header className={style["navigation"]}>
        <nav>
          <Link to="/">Lobby</Link>
        </nav>
      </header>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
