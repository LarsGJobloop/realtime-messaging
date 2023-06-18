import style from "./style.module.css";

import { Link, Outlet } from "react-router-dom";

export function RoomLayout() {
  return (
    <div className={style["RoomLayout"]}>
      <header>
        <Link to="/">Lobby</Link>
      </header>

      <div>
        <Outlet />
      </div>
    </div>
  );
}