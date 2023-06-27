import style from "./style.module.css";

import { useParams } from "react-router-dom";

import { ChatInput } from "../../../components/ChatInput/ChatInput";
import { ChatFeed } from "../../../components/ChatFeed/ChatFeed";
import { useChatRoom } from "../../../hooks/useChatRoom/useChatRoom";

export function Room() {
  const { roomID } = useParams();
  const { messages, sendMessage } = useChatRoom({ roomID });

  return (
    <div className={style["room"]}>
      <header className={style["room-header"]}>
        <h1>{roomID}</h1>
      </header>

      <main className={style["feed-container"]}>
        <ChatFeed messages={messages} />
      </main>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
