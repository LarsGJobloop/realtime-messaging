import style from "./style.module.css";

import { ChatMessage } from "../../models/generic";

interface ChatFeedProps {
  messages: ChatMessage[];
}

export function ChatFeed({ messages }: ChatFeedProps) {
  return (
    <ul className={style["feed"]}>
      {messages.map((message) => {
        return (
          <li key={message.id}>
            <MessageFeedCard message={message} />
          </li>
        );
      })}
    </ul>
  );
}

interface MessageFeedCardProps {
  message: ChatMessage;
}

function MessageFeedCard({ message }: MessageFeedCardProps) {
  return <div className={style["message"]}>{message.body}</div>;
}
