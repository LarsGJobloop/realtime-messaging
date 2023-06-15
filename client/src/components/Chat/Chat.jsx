import style from "./style.module.css";

import { ChatFeed } from "../ChatFeed/ChatFeed";
import { ChatInput } from "../ChatInput/ChatInput";
import { useChat } from "../../hooks/useChat/useChat";

export function Chat() {
  const { messages, postMessage, connected, error } = useChat("commonRoom");

  return (
    <div className={style["Chat"]}>
      <header>
        <h1>
          {
            connected
            ? "👍"
            : "👎"
          }
        </h1>
      </header>

      <ChatFeed feed={messages} />
      <ChatInput postMessage={postMessage} />
    </div>
  );
}
