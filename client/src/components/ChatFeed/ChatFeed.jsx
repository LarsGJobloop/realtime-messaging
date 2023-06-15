import { ChatMessageCard } from "../ChatMessageCard/ChatMessageCard";
import style from "./style.module.css";


/**
 * 
 * @param {{
 *  feed: import("../../hooks/useChat/useChat").ChatMessage[]
 * }} props 
 * @returns 
 */
export function ChatFeed({
  feed
}) {  
  return (
    <section className={style["ChatFeed"]}>
      <h2>Message Feed</h2>
      <ul>
        {
          feed.map(
            (chatMessage) => {
              return (
                <li key={chatMessage.id}>
                  <ChatMessageCard message={chatMessage} />
                </li>
              )
            }
          )
        }
      </ul>
    </section>
  );
}
