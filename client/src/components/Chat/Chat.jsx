import style from "./style.module.css";

import { ChatFeed } from "../ChatFeed/ChatFeed";
import { ChatInput } from "../ChatInput/ChatInput";
import { useChat } from "../../hooks/useChat/useChat";

export function Chat({ userAlias }) {
  const { messages, postMessage, connected, error } = useChat({
    room: "commonRoom",
    alias: userAlias,
  });

  return (
    <div className={style["Chat"]}>
      <header>
        <h1>
          <span>{connected ? "👍" : "👎"}</span>
          as {userAlias}
        </h1>
      </header>

      <ChatFeed feed={messages} />
      <ChatInput postMessage={postMessage} />
    </div>
  );
}
