import style from "./style.module.css";

/**
 * @param {import("../../hooks/useChat/useChat").ChatMessage} props
 * @returns
 */
export function ChatMessageCard({ author, body, createdAt }) {
  return (
    <div className={style["ChatMessageCard"]}>
      <div>
        <span>{author.alias}</span>
        <span>{createdAt}</span>
      </div>
      <p>{body}</p>
    </div>
  );
}
