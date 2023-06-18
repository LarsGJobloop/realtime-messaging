import { useState } from "react";
import style from "./style.module.css";

/**
 *
 * @param {{
 *  postMessage: ((message: string) => void) | null
 * }} props
 * @returns
 */
export function ChatInput({ postMessage }) {
  const [message, setMessage] = useState("");

  // Event Handlers
  function submitMessage(event) {
    event.preventDefault();

    if (message === "") {
      return;
    }

    postMessage(message);
    setMessage("");
  }

  function updateForm(event) {
    setMessage(event.target.value);
  }

  return (
    <section className={style["ChatInput"]}>
      <form onSubmit={submitMessage}>
        <input
          type="text"
          name=""
          id=""
          onChange={updateForm}
          value={message}
        />
        <button>Post</button>
      </form>
    </section>
  );
}
