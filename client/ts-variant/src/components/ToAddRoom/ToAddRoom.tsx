import style from "./style.module.css";
import { useLocation } from "react-router";

export function ToAddRoom() {
  const location = useLocation();

  // Event Handlers
  function navigateToAddRoom() {
    console.log("Navigating to Add Room from: ");
    console.log(location);
  }

  return (
    <button onClick={navigateToAddRoom} className={style["container"]}>
      Add Room
    </button>
  );
}
