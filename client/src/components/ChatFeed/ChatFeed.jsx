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
                  <div>
                    <div>
                      <span>{chatMessage.author.alias}</span>
                      <span>{chatMessage.createdAt}</span>
                    </div>
                    <p>
                      {chatMessage.body}
                    </p>
                  </div>
                </li>
              )
            }
          )
        }
      </ul>
    </section>
  );
}
