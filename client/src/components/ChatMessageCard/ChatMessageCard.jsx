import style from "./style.module.css";

/**
 * @param {{
 *  message: import("../../hooks/useChat/useChat").ChatMessage
 * }} props
 * @returns
 */
export function ChatMessageCard({ message }) {
  return (
    <div className={style["ChatMessageCard"]}>
      <div>
        <span>{message.author.alias}</span>
        <span>{format(message.createdAt)}</span>
      </div>
      <p>{message.body}</p>
    </div>
  );
}

// Utility function

/**
 * @typedef {number} utcNumber
 */

/**
 * Formats UTC time number to
 * String
 * @param {utcNumber} utcTime
 * @returns {utcString}
 */
function format(utcTime) {
  return new Date(utcTime).toUTCString();
}
