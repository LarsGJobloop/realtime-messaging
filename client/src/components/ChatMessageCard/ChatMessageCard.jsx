import style from "./style.module.css";

/**
 *
 * @param {import("../../hooks/useChat/useChat").ChatMessage} props
 * @returns
 */
export function ChatMessageCard({ author, body, createdAt }) {
  return (
    <div className={style["ChatMessageCard"]}>
      <div>
        <span>{chatMessage.author.alias}</span>
        <span>{chatMessage.createdAt}</span>
      </div>
      <p>{chatMessage.body}</p>
    </div>
  );
}
