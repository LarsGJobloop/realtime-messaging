import { ChatRoom } from "../../models/chatService";
import style from "./style.module.css";

interface RoomCardProps {
  meta: ChatRoom;
  onClick: (room: ChatRoom) => void;
}

export function RoomCard({ meta, onClick }: RoomCardProps) {

  // Event handlers
  function enterRoom() {
    if (!meta.isConnected) {
      console.log("No connections to room")
      return
    }
    onClick(meta);
  }

  return (
    <div className={style["card"]} onClick={enterRoom}>
      <h2>{`Room name: ${meta.name}`}</h2>
    </div>
  );
}
