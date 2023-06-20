import style from "./style.module.css";
import { useLocation } from "react-router";

export function ToAdmin() {
  const location = useLocation();

  // Event Handlers
  function navigateToAdminPage() {
    console.log("Navigating to Admin Page from: ");
    console.log(location);
  }

  return (
    <button onClick={navigateToAdminPage} className={style["container"]}>
      Admin
    </button>
  );
}
