import style from "./style.module.css";

import { ChatFeed } from "../ChatFeed/ChatFeed";
import { ChatInput } from "../ChatInput/ChatInput";
import { useChat } from "../../hooks/useChat/useChat";

export function Chat({ userAlias }) {
  const { messages, postMessage, isConnected } = useChat({
    room: "commonRoom",
    alias: userAlias,
  });

  return (
    <div className={style["Chat"]}>
      <header>
        <h1>
          <span>{isConnected ? "👍" : "👎"}</span>
          as {userAlias}
        </h1>
      </header>

      <ChatFeed feed={messages} />
      <ChatInput postMessage={postMessage} />
    </div>
  );
}
