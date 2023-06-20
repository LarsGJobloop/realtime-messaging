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
          <li className={style["feed-item"]} key={message.id}>
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
  const formatedDate = new Date(message.createdAt).toUTCString()

  return (
    <article className={style["message"]}>
      <header className={style["message-header"]}>
        <div>
          <h2>
            {message.author.alias}
          </h2>
        </div>

        <div>
          {formatedDate}
        </div>
      </header>
      <hr />
      <div className={style["message-content"]}>
        <p>
          {message.body}
        </p>
      </div>
    </article>
  );
}
