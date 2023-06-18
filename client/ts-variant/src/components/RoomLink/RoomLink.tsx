import { Link } from "react-router-dom"
import { ChatRoom } from "../../models/chatService"

interface RoomLinkProps {
  room: ChatRoom
}

export function RoomLink({
  room
}: RoomLinkProps) {
  return (
    <Link to={`room/${room.id}`}>
      {room.name}
    </Link>
  )
}