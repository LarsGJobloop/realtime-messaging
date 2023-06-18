import { ChatRoom } from "../../models/chatService"
import style from "./style.module.css"

interface RoomCardProps {
  meta: ChatRoom,
  onClick: (room: ChatRoom) => void
}

export function RoomCard({
  meta,
  onClick
}: RoomCardProps) {
  function enterRoom() {
    onClick(meta)
  }

  return (
    <div className={style["card"]} onClick={enterRoom}>
      <h2>{`Room name: ${meta.name}`}</h2>
    </div>
  )
}