import style from "./style.module.css";

import { ChatFeed } from "../ChatFeed/ChatFeed";
import { ChatInput } from "../ChatInput/ChatInput";
import { useChat } from "../../hooks/useChat/useChat";

export function Chat() {
  const { messages, postMessage } = useChat("commonRoom");

  return (
    <div className={style["Chat"]}>
      <ChatFeed feed={messages} />
      <ChatInput onPostMessage={postMessage} />
    </div>
  );
}
