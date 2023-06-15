import style from "./style.module.css";

import { ChatFeed } from "../ChatFeed/ChatFeed";
import { ChatInput } from "../ChatInput/ChatInput";

export function Chat() {
  return (
    <div className={style["Chat"]}>
      <ChatFeed />
      <ChatInput />
    </div>
  );
}
