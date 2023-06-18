import style from "./style.module.css";

import { useParams } from "react-router-dom";

import { ChatInput } from "../../../components/ChatInput/ChatInput";
import { ChatFeed } from "../../../components/ChatFeed/ChatFeed";
import { useChatRoom } from "../../../hooks/useChatRoom/useChatRoom";

export function Room() {
  const { roomID } = useParams();
  const { messages, sendMessage } = useChatRoom({ roomID });

  return (
    <div className={style["Room"]}>
      <header>
        <h1>{roomID}</h1>
      </header>

      <main>
        <ChatFeed messages={messages} />
      </main>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
